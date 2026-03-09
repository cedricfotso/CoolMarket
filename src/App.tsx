import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  ShoppingCart, 
  Smartphone, 
  Tablet, 
  Headset, 
  CheckCircle2, 
  Star, 
  MessageCircle,
  ArrowLeft,
  Phone,
  MessageSquare,
  Video,
  PlayCircle,
  ShieldCheck,
  ThumbsUp,
  X,
  Gift,
  Tag
} from 'lucide-react';

type Screen = 'home' | 'product' | 'assistance';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [serenityMode, setSerenityMode] = useState(() => {
    const saved = localStorage.getItem('serenityMode') === 'true';
    if (saved) document.body.classList.add('serenity-mode');
    return saved;
  });
  const [showChatbot, setShowChatbot] = useState(true);
  const [showSerenityToast, setShowSerenityToast] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [showCartToast, setShowCartToast] = useState(false);

  // Remplacez ce numéro par le vôtre pour la démo
  const demoPhoneNumber = "+237600000000"; 

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setShowCartToast(true);
    setTimeout(() => setShowCartToast(false), 3000);
  };

  const handleActivateSerenity = () => {
    const newValue = !serenityMode;
    setSerenityMode(newValue);
    localStorage.setItem('serenityMode', String(newValue));
    
    if (newValue) {
      document.body.classList.add('serenity-mode');
      setShowSerenityToast(true);
      setTimeout(() => setShowSerenityToast(false), 4000);
      setShowChatbot(true);
    } else {
      document.body.classList.remove('serenity-mode');
    }
  };

  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate('home')}
          role="button"
          tabIndex={0}
        >
          {/* Logo Back Market Style */}
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
            BM
          </div>
          <span className="text-2xl font-black tracking-tighter text-black hidden sm:block">Back Market</span>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          {!serenityMode ? (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher un produit, une marque..." 
                className="w-full h-12 pl-12 pr-4 rounded-full border border-slate-300 bg-slate-100 text-lg focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            </div>
          ) : (
            <nav className="flex items-center justify-center gap-8">
              <button onClick={() => navigate('product')} className="font-bold text-xl text-slate-700 hover:text-black transition-colors">Trouver un téléphone</button>
              <button onClick={() => navigate('assistance')} className="font-bold text-xl text-slate-700 hover:text-black transition-colors">Besoin d'aide</button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('assistance')}
            className="flex flex-col items-center text-slate-700 hover:text-black transition-colors"
          >
            <HelpCircle className="w-7 h-7 mb-1" />
            <span className="text-sm font-medium">Aide</span>
          </button>
          <button className="flex flex-col items-center text-slate-700 hover:text-black transition-colors relative">
            <ShoppingCart className="w-7 h-7 mb-1" />
            <span className="text-sm font-medium">Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );

  const HomeScreen = () => (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section - Image de personnes âgées satisfaites */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573656113824-3f19114b03cc?auto=format&fit=crop&q=80&w=2000" 
            alt="Seniors utilisant un smartphone" 
            className="w-full h-full object-cover opacity-50" 
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            La technologie reconditionnée, <br/>simple et accessible à tous.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium">
            Découvrez nos appareils testés, garantis 1 an et accompagnés d'une assistance dédiée pour vous guider pas à pas.
          </p>
          <button 
            onClick={() => navigate('product')}
            className="inline-flex items-center justify-center gap-3 bg-white text-black text-2xl font-bold py-4 px-10 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Smartphone className="w-8 h-8" />
            Voir les smartphones
          </button>
        </div>
      </section>

      {/* Categories - Style Back Market */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <button className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 hover:border-black transition-all group">
            <Tag className="w-10 h-10 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-slate-800">Bons plans</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 hover:border-black transition-all group">
            <Gift className="w-10 h-10 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-slate-800">Idées cadeaux</span>
          </button>

          <button 
            onClick={() => navigate('product')}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 hover:border-black transition-all group"
          >
            <Smartphone className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-slate-800">Smartphones</span>
          </button>

          <button className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 hover:border-black transition-all group">
            <Tablet className="w-10 h-10 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-bold text-slate-800">Tablettes</span>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">
          {serenityMode ? "Notre sélection : Faciles à utiliser" : "Les meilleures ventes"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          {/* Product 1 */}
          <div 
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col relative" 
            onClick={() => navigate('product')}
          >
            {serenityMode && (
              <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                <Star className="w-4 h-4 fill-green-800" /> Recommandé Senior
              </div>
            )}
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
              <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&q=80" alt="iPhone" className="h-full object-contain mix-blend-multiply" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-1">iPhone 13</h3>
              <p className="text-md text-slate-500 mb-4">Reconditionné - Parfait état</p>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 line-through">Neuf : 749 €</p>
                  <span className="text-2xl font-extrabold text-slate-900">429 €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col relative" onClick={() => navigate('product')}>
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
              <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80" alt="Samsung" className="h-full object-contain mix-blend-multiply" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Samsung Galaxy S22</h3>
              <p className="text-md text-slate-500 mb-4">Reconditionné - Très bon état</p>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 line-through">Neuf : 859 €</p>
                  <span className="text-2xl font-extrabold text-slate-900">359 €</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200 transition-all cursor-pointer flex flex-col relative" onClick={() => navigate('product')}>
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
              <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80" alt="iPad" className="h-full object-contain mix-blend-multiply" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-1">iPad Air (2022)</h3>
              <p className="text-md text-slate-500 mb-4">Reconditionné - État correct</p>
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 line-through">Neuf : 699 €</p>
                  <span className="text-2xl font-extrabold text-slate-900">410 €</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-slate-100 py-16 px-4 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <CheckCircle2 className="w-10 h-10 text-black mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Vérifié par des experts</h3>
            <p className="text-slate-600">Appareils testés sur 40 points de contrôle dans nos usines partenaires.</p>
          </div>
          <div className="text-center">
            <ShieldCheck className="w-10 h-10 text-black mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Garantie 12 mois minimum</h3>
            <p className="text-slate-600">Un pépin ? On répare ou on remplace sans poser de questions complexes.</p>
          </div>
          <div className="text-center">
            <ThumbsUp className="w-10 h-10 text-black mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">30 jours pour changer d'avis</h3>
            <p className="text-slate-600">Essayez-le tranquillement chez vous. Retour gratuit si ça ne convient pas.</p>
          </div>
        </div>
      </section>
    </div>
  );

  const ProductScreen = () => (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-black mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Produit */}
          <div className="bg-slate-50 rounded-3xl p-12 flex items-center justify-center">
             <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80" alt="iPhone 13" className="max-w-full h-auto mix-blend-multiply" />
          </div>

          {/* Infos Produit */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
              iPhone 13 - 128 Go - Noir
            </h1>
            <p className="text-xl text-slate-500 mb-6">Débloqué tout opérateur</p>
            
            <div className="flex items-center gap-2 mb-8 cursor-pointer hover:underline">
              <div className="flex text-black">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current opacity-30" />
              </div>
              <span className="font-bold">4.4/5</span>
              <span className="text-slate-500">(1 432 avis)</span>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 mb-3">État du téléphone</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="border-2 border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:border-black">
                  <span className="block font-bold">Correct</span>
                  <span className="text-sm text-slate-500">Dès 389€</span>
                </div>
                <div className="border-2 border-slate-200 rounded-xl p-3 text-center cursor-pointer hover:border-black">
                  <span className="block font-bold">Très bon</span>
                  <span className="text-sm text-slate-500">Dès 409€</span>
                </div>
                <div className="border-2 border-black rounded-xl p-3 text-center cursor-pointer bg-slate-50">
                  <span className="block font-bold">Parfait</span>
                  <span className="text-sm text-slate-500">429€</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
              <div className="flex justify-between items-end mb-4">
                <span className="text-4xl font-extrabold text-black">429,00 €</span>
                <span className="text-slate-500 line-through">Neuf: 749,00 €</span>
              </div>
              <p className="text-green-700 font-bold flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-5 h-5" /> En stock - Livraison gratuite demain
              </p>
              
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white text-xl font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-3"
              >
                <ShoppingCart className="w-6 h-6" />
                Ajouter au panier
              </button>
            </div>
            
            {serenityMode && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <p className="text-blue-800 font-medium flex items-start gap-2">
                  <HelpCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  Ce modèle est idéal car son écran est grand, le texte y est très lisible, et nos conseillers peuvent vous aider à le paramétrer dès sa réception.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Section Avis Réels */}
        <div className="border-t border-slate-200 pt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" /> Avis réels de nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-black">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-slate-500 text-sm">Il y a 2 jours</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Parfait pour ma mère</h4>
              <p className="text-slate-700">"J'ai acheté cet iPhone en 'Parfait état' pour ma maman de 75 ans. L'appareil est comme neuf. Le service client m'a même aidé au téléphone pour transférer ses anciens contacts. Je recommande !"</p>
              <p className="text-sm font-medium mt-4 text-slate-500">— Martine D.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-black">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-slate-500 text-sm">Il y a 1 semaine</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Simple et efficace</h4>
              <p className="text-slate-700">"Livraison très rapide. Le téléphone fonctionne très bien. J'ai eu un peu de mal avec les nouveaux menus au début mais la vidéo tutoriel m'a beaucoup aidé."</p>
              <p className="text-sm font-medium mt-4 text-slate-500">— Bernard L.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            L'assistance Back Market, toujours là pour vous.
          </h1>
          <p className="text-xl text-slate-600">
            Besoin d'aide pour choisir, configurer ou utiliser votre appareil ?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Appel Téléphonique Réel */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Parler de vive voix</h2>
            <p className="text-slate-600 mb-8">Un conseiller vous répond directement pour vous guider pas à pas.</p>
            <a 
              href={`tel:${demoPhoneNumber}`}
              className="inline-block w-full bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Appeler le conseiller
            </a>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Video className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Assistance Vidéo</h2>
            <p className="text-slate-600 mb-8">Montrez-nous votre écran, nous vous montrons sur quoi appuyer.</p>
            <button className="w-full bg-slate-100 text-black font-bold py-4 px-6 rounded-xl hover:bg-slate-200 transition-colors">
              Démarrer la visio
            </button>
          </div>
        </div>

        {/* Section Vidéos */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Nos tutoriels vidéo en mode Sérénité
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Vidéo 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-900 rounded-2xl mb-4 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" alt="Tutoriel" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold">Comment configurer la taille du texte ?</h3>
            </div>

            {/* Vidéo 2 */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-900 rounded-2xl mb-4 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80" alt="Tutoriel" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-bold">Comment ajouter un contact favori ?</h3>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

  const Chatbot = () => {
    if (!showChatbot) return null;
    return (
      <div className="fixed bottom-24 right-6 z-40 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span className="font-bold flex items-center gap-2"><Headset className="w-5 h-5"/> Conseiller</span>
          <button onClick={() => setShowChatbot(false)}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 bg-slate-50">
          <p className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 text-sm mb-4">
            Bonjour ! Vous avez besoin d'aide pour choisir ou vous préférez qu'on s'appelle ?
          </p>
          <a 
            href={`tel:${demoPhoneNumber}`}
            className="w-full flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-xl font-bold text-sm transition-colors"
          >
            <Phone className="w-4 h-4" /> M'appeler maintenant
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans text-slate-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
      </main>
      
      {/* Footer style Back Market */}
      <footer className="bg-black text-white py-12 px-4 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl font-black tracking-tighter mb-4 block">Back Market</span>
            <p className="text-slate-400 max-w-sm">Le supermarché du reconditionné. Des produits testés, garantis, et bons pour la planète.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Besoin d'aide ?</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => navigate('assistance')}>Assistance senior</button></li>
              <li><button>Suivre ma commande</button></li>
              <li><button>Garantie et retours</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Nous contacter</h4>
            <a href={`tel:${demoPhoneNumber}`} className="flex items-center gap-2 text-slate-400 hover:text-white mb-2">
              <Phone className="w-4 h-4" /> Appel gratuit
            </a>
          </div>
        </div>
      </footer>

      <Chatbot />
      
      {/* Floating Serenity Toggle */}
      <button
        onClick={handleActivateSerenity}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border-4 transition-all hover:scale-105 ${
          serenityMode 
            ? 'bg-black text-white border-black' 
            : 'bg-white text-black border-slate-200 hover:border-black'
        }`}
      >
        {serenityMode ? <X className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
        <span className="font-bold text-lg hidden sm:block">
          {serenityMode ? 'Désactiver Sérénité' : 'Activer Mode Sérénité'}
        </span>
      </button>
    </div>
  );
}
