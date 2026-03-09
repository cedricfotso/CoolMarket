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

  // Remplacez par votre vrai numéro pour la présentation
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

  // Shared Header (Style Back Market)
  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate('home')}
          role="button"
          tabIndex={0}
        >
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-2xl">
            BM
          </div>
          <span className="text-3xl font-black tracking-tighter text-black hidden sm:block">Back Market</span>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          {!serenityMode ? (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher une marque, un modèle..." 
                className="w-full h-14 pl-14 pr-4 rounded-full border-2 border-slate-200 bg-slate-50 text-xl focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
            </div>
          ) : (
            <nav className="flex items-center justify-center gap-8">
              <button onClick={() => navigate('product')} className="font-bold text-xl text-slate-700 hover:text-black transition-colors">Trouver un téléphone</button>
              <button onClick={() => navigate('home')} className="font-bold text-xl text-slate-700 hover:text-black transition-colors">Accueil</button>
              <button onClick={() => navigate('assistance')} className="font-bold text-xl text-slate-700 hover:text-black transition-colors">Besoin d'aide</button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('assistance')}
            className="flex flex-col items-center text-slate-700 hover:text-black transition-colors"
          >
            <HelpCircle className="w-8 h-8 mb-1" />
            <span className="text-lg font-medium">Aide</span>
          </button>
          <button className="flex flex-col items-center text-slate-700 hover:text-black transition-colors relative">
            <ShoppingCart className="w-8 h-8 mb-1" />
            <span className="text-lg font-medium">Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4 bg-white">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-lg focus:border-black outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
        </div>
      </div>
    </header>
  );

  // Le Chatbot Complet d'origine avec couleurs Back Market
  const Chatbot = () => {
    if (!showChatbot) {
      return (
        <button 
          onClick={() => setShowChatbot(true)}
          className={`fixed bottom-6 right-6 z-50 ${serenityMode ? 'px-6 py-4 rounded-full' : 'w-16 h-16 rounded-full'} bg-black hover:bg-slate-800 text-white shadow-2xl flex items-center justify-center gap-3 transition-transform hover:scale-105 border-4 border-white`}
          aria-label="Ouvrir l'assistant"
        >
          <MessageCircle className="w-8 h-8" />
          {serenityMode && <span className="font-bold text-xl">Besoin d'aide ?</span>}
        </button>
      );
    }
    return (
      <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col">
        <div className="bg-black text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Headset className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Assistant Back Market</span>
          </div>
          <button onClick={() => setShowChatbot(false)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 bg-slate-50">
          <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm mb-6">
            <p className="text-lg text-slate-800 font-medium">
              {serenityMode 
                ? "Bonjour ! Je peux vous aider à choisir un téléphone simple." 
                : "Bonjour ! Puis-je vous aider à choisir un appareil ?"}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {serenityMode ? (
              <>
                <button onClick={() => navigate('product')} className="w-full text-left p-4 bg-white border-2 border-slate-200 hover:border-black hover:bg-slate-50 rounded-xl text-lg font-medium text-slate-800 transition-all">
                  Choisir un téléphone simple
                </button>
                <button className="w-full text-left p-4 bg-white border-2 border-slate-200 hover:border-black hover:bg-slate-50 rounded-xl text-lg font-medium text-slate-800 transition-all">
                  Comprendre les garanties
                </button>
                <button onClick={() => navigate('assistance')} className="w-full text-left p-4 bg-white border-2 border-slate-200 hover:border-black hover:bg-slate-50 rounded-xl text-lg font-medium text-slate-800 transition-all">
                  Parler à un conseiller
                </button>
                <div className="mt-2 pt-4 border-t border-slate-200 flex flex-col gap-3">
                  <a href={`tel:${demoPhoneNumber}`} className="w-full flex items-center justify-center gap-2 p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl text-lg font-bold transition-all">
                    <Phone className="w-6 h-6" /> Appel téléphonique
                  </a>
                  <button onClick={() => navigate('assistance')} className="w-full flex items-center justify-center gap-2 p-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-xl text-lg font-bold transition-all">
                    <Video className="w-6 h-6" /> Visio avec conseiller
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => navigate('product')} className="w-full text-left p-4 bg-white border-2 border-slate-200 hover:border-black hover:bg-slate-50 rounded-xl text-lg font-medium text-slate-800 transition-all">
                  Trouver un smartphone
                </button>
                <button className="w-full text-left p-4 bg-white border-2 border-slate-200 hover:border-black hover:bg-slate-50 rounded-xl text-lg font-medium text-slate-800 transition-all">
                  Comprendre les garanties
                </button>
                <button onClick={() => navigate('assistance')} className="w-full text-left p-4 bg-white border-2 border-slate-200 hover:border-black hover:bg-slate-50 rounded-xl text-lg font-medium text-slate-800 transition-all">
                  Parler à un conseiller
                </button>
                <div className="mt-2 pt-4 border-t border-slate-200">
                  <button onClick={() => navigate('assistance')} className="w-full flex items-center justify-center gap-2 p-4 bg-slate-200 hover:bg-slate-300 text-black rounded-xl text-lg font-bold transition-all">
                    <Video className="w-6 h-6" />
                    Appelez un conseiller en visio
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Screen 1: Home
  const HomeScreen = () => (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section - Image de personnes âgées satisfaites */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573656113824-3f19114b03cc?auto=format&fit=crop&q=80&w=2000" 
            alt="Seniors utilisant un smartphone" 
            className="w-full h-full object-cover opacity-40" 
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            La technologie reconditionnée,<br/>simple et accessible à tous.
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium">
            Des appareils testés, garantis, et une assistance dédiée pour vous accompagner.
          </p>
          <button 
            onClick={() => navigate('product')}
            className="inline-flex items-center justify-center gap-3 bg-white text-black text-2xl font-bold py-5 px-10 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Smartphone className="w-8 h-8" />
            Voir nos téléphones
          </button>
        </div>
      </section>

      {/* Categories - Style Back Market */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Que recherchez-vous ?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <button className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl shadow-sm hover:shadow-md border-2 border-transparent hover:border-black transition-all group">
            <Tag className="w-12 h-12 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-slate-800">Bons plans</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl shadow-sm hover:shadow-md border-2 border-transparent hover:border-black transition-all group">
            <Gift className="w-12 h-12 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-slate-800">Idées cadeaux</span>
          </button>

          <button 
            onClick={() => navigate('product')}
            className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl shadow-sm hover:shadow-md border-2 border-transparent hover:border-black transition-all group"
          >
            <Smartphone className="w-12 h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-slate-800">Smartphones</span>
          </button>

          <button className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl shadow-sm hover:shadow-md border-2 border-transparent hover:border-black transition-all group">
            <Tablet className="w-12 h-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-slate-800">Tablettes</span>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
          {serenityMode ? "Téléphones recommandés pour vous" : "Les meilleures ventes"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Product 1 */}
          <div 
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-black transition-all overflow-hidden flex flex-col cursor-pointer relative group" 
            onClick={() => navigate('product')}
            role="button"
            tabIndex={0}
          >
            {serenityMode && (
              <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                <Star className="w-4 h-4 fill-green-800" /> Senior-friendly
              </div>
            )}
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
              <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&q=80" alt="iPhone 13" className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">iPhone 13</h3>
              <p className="text-lg text-slate-500 mb-2">Reconditionné - Parfait état</p>
              {serenityMode && (
                <div className="flex items-center gap-1 text-green-600 mb-4 font-bold">
                  <Star className="w-5 h-5 fill-current" /> 4.8/5
                </div>
              )}
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 line-through">Neuf : 749 €</p>
                  <span className="text-3xl font-extrabold text-slate-900">429 €</span>
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors">
                  Voir
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div 
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-black transition-all overflow-hidden flex flex-col cursor-pointer relative group" 
            onClick={() => navigate('product')}
            role="button"
            tabIndex={0}
          >
            {serenityMode && (
              <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                <Star className="w-4 h-4 fill-green-800" /> Senior-friendly
              </div>
            )}
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
              <img src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80" alt="Samsung Galaxy" className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Samsung Galaxy S22</h3>
              <p className="text-lg text-slate-500 mb-2">Reconditionné - Très bon état</p>
              {serenityMode && (
                <div className="flex items-center gap-1 text-green-600 mb-4 font-bold">
                  <Star className="w-5 h-5 fill-current" /> 4.9/5
                </div>
              )}
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 line-through">Neuf : 859 €</p>
                  <span className="text-3xl font-extrabold text-slate-900">359 €</span>
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors">
                  Voir
                </button>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div 
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-black transition-all overflow-hidden flex flex-col cursor-pointer relative group" 
            onClick={() => navigate('product')}
            role="button"
            tabIndex={0}
          >
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100">
              <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&q=80" alt="iPad Air" className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">iPad Air (2022)</h3>
              <p className="text-lg text-slate-500 mb-2">Reconditionné - État correct</p>
              {serenityMode && (
                <div className="flex items-center gap-1 text-green-600 mb-4 font-bold">
                  <Star className="w-5 h-5 fill-current" /> 4.6/5
                </div>
              )}
              <div className="mt-auto flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500 line-through">Neuf : 699 €</p>
                  <span className="text-3xl font-extrabold text-slate-900">410 €</span>
                </div>
                <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors">
                  Voir
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Reassurance Section */}
      <section className="bg-slate-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Pourquoi nous faire confiance ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Vérifié par des experts</h3>
              <p className="text-lg text-slate-600">Appareils testés sur 40 points de contrôle dans nos usines partenaires.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Garantie 12 mois minimum</h3>
              <p className="text-lg text-slate-600">Un pépin ? On répare ou on remplace sans poser de questions complexes.</p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <ThumbsUp className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">30 jours d'essai</h3>
              <p className="text-lg text-slate-600">Essayez-le tranquillement chez vous. Retour gratuit si ça ne convient pas.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Screen 2: Product Page
  const ProductScreen = () => (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-xl font-medium text-slate-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image */}
          <div className="bg-slate-50 rounded-3xl p-12 flex items-center justify-center border border-slate-100">
             <img src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80" alt="iPhone 13" className="max-w-full h-auto mix-blend-multiply" />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              iPhone 13 - 128 Go - Noir
            </h1>
            <p className="text-2xl text-slate-500 mb-6">Débloqué tout opérateur</p>
            
            <div className="flex items-center gap-3 mb-8 cursor-pointer hover:underline">
              <div className="flex text-black">
                <Star className="w-8 h-8 fill-current" />
                <Star className="w-8 h-8 fill-current" />
                <Star className="w-8 h-8 fill-current" />
                <Star className="w-8 h-8 fill-current" />
                <Star className="w-8 h-8 fill-current opacity-30" />
              </div>
              <span className="text-2xl font-bold text-slate-800">4.4/5</span>
              <span className="text-xl text-slate-500">(1 432 avis)</span>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-4">État du téléphone</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="border-2 border-slate-200 rounded-2xl p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <span className="block text-lg font-bold">Correct</span>
                  <span className="text-slate-500">Dès 389€</span>
                </div>
                <div className="border-2 border-slate-200 rounded-2xl p-4 text-center cursor-pointer hover:border-black transition-colors">
                  <span className="block text-lg font-bold">Très bon</span>
                  <span className="text-slate-500">Dès 409€</span>
                </div>
                <div className="border-4 border-black rounded-2xl p-4 text-center cursor-pointer bg-slate-50">
                  <span className="block text-lg font-bold">Parfait</span>
                  <span className="text-slate-500">429€</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl mb-10 border border-slate-100">
              <div className="flex justify-between items-end mb-6">
                <span className="text-5xl font-extrabold text-black">429 €</span>
                <span className="text-xl text-slate-500 line-through">Neuf: 749 €</span>
              </div>
              <p className="text-green-700 text-xl font-bold flex items-center gap-3 mb-8">
                <CheckCircle2 className="w-6 h-6" /> En stock - Livraison gratuite
              </p>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-black hover:bg-slate-800 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-8 h-8" />
                  Ajouter au panier
                </button>
                <button 
                  onClick={() => navigate('assistance')}
                  className="w-full bg-white border-4 border-slate-200 hover:border-black text-slate-700 hover:text-black text-2xl font-bold py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-3"
                >
                  <HelpCircle className="w-8 h-8" />
                  Besoin d'aide pour choisir ?
                </button>
              </div>
            </div>
            
            {/* L'encart Bleu "Avis client sénior" original */}
            {serenityMode && (
              <div className="bg-blue-50 border-l-8 border-blue-500 p-6 rounded-r-2xl mb-10">
                <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Avis clients seniors
                </h3>
                <p className="text-2xl text-blue-800 italic font-medium leading-relaxed">
                  "Très facile à utiliser, parfait pour téléphoner, l'écran est grand et lisible."
                </p>
                <p className="text-lg text-blue-600 mt-2">— Jean, 72 ans</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Avis Réels */}
        <div className="border-t-2 border-slate-100 pt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <MessageCircle className="w-8 h-8" /> Avis réels de nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex text-black">
                  <Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" />
                </div>
                <span className="text-slate-500 text-lg">Il y a 2 jours</span>
              </div>
              <h4 className="font-bold text-2xl mb-4">Parfait pour ma mère</h4>
              <p className="text-xl text-slate-700 leading-relaxed">"J'ai acheté cet iPhone en 'Parfait état' pour ma maman de 75 ans. L'appareil est comme neuf. Le service client m'a même aidé au téléphone pour transférer ses anciens contacts. Je recommande !"</p>
              <p className="text-lg font-medium mt-6 text-slate-500">— Martine D.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex text-black">
                  <Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" /><Star className="w-6 h-6 fill-current" />
                </div>
                <span className="text-slate-500 text-lg">Il y a 1 semaine</span>
              </div>
              <h4 className="font-bold text-2xl mb-4">Simple et efficace</h4>
              <p className="text-xl text-slate-700 leading-relaxed">"Livraison très rapide. Le téléphone fonctionne très bien. J'ai eu un peu de mal avec les nouveaux menus au début mais la vidéo tutoriel m'a beaucoup aidé."</p>
              <p className="text-lg font-medium mt-6 text-slate-500">— Bernard L.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Screen 3: Assistance Page (Complète)
  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-xl font-medium text-slate-600 hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Retour
        </button>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Besoin d'aide pour choisir ou configurer ?
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nos conseillers Back Market vous accompagnent à chaque étape.
          </p>
        </div>

        {/* Les 3 blocs originaux de contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Block 1: Phone */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Phone className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Téléphone</h2>
            <p className="text-xl text-slate-600 mb-8 flex-1">Appelez un conseiller gratuitement</p>
            <a 
              href={`tel:${demoPhoneNumber}`}
              className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-colors"
            >
              Appeler maintenant
            </a>
          </div>

          {/* Block 2: Chat */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Chat en direct</h2>
            <p className="text-xl text-slate-600 mb-8 flex-1">Discutez avec un conseiller en ligne</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-colors">
              Démarrer le chat
            </button>
          </div>

          {/* Block 3: Video */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Video className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Assistance vidéo</h2>
            <p className="text-xl text-slate-600 mb-8 flex-1">Montrez-nous votre écran en direct</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-colors">
              Démarrer une visio
            </button>
          </div>
        </div>

        {/* Tutorial Section (Les 3 vidéos originales) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
            Comment utiliser votre smartphone ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-900 rounded-2xl mb-6 relative overflow-hidden border-4 border-transparent group-hover:border-black transition-colors">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" alt="Passer un appel" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-black transition-colors">Passer un appel</h3>
            </div>
            
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-900 rounded-2xl mb-6 relative overflow-hidden border-4 border-transparent group-hover:border-black transition-colors">
                <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80" alt="Envoyer un message" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-black transition-colors">Envoyer un SMS</h3>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-900 rounded-2xl mb-6 relative overflow-hidden border-4 border-transparent group-hover:border-black transition-colors">
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" alt="Prendre une photo" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-black transition-colors">Prendre une photo</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans text-slate-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
      </main>
      
      {/* Footer Back Market */}
      <footer className="bg-black text-white py-16 px-4 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-lg">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold text-2xl">
                BM
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">Back Market</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">Le supermarché du reconditionné. Des produits testés, garantis, et bons pour la planète. Accompagnement spécialisé pour les seniors.</p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6">Liens utiles</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => navigate('home')} className="hover:text-white transition-colors">Accueil</button></li>
              <li><button onClick={() => navigate('product')} className="hover:text-white transition-colors">Nos smartphones</button></li>
              <li><button onClick={() => navigate('assistance')} className="hover:text-white transition-colors">Assistance Senior</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-6">Contact</h4>
            <ul className="space-y-4 text-slate-400">
              <li>
                <a href={`tel:${demoPhoneNumber}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone className="w-6 h-6" /> Appel gratuit
                </a>
              </li>
              <li className="flex items-center gap-3"><MessageSquare className="w-6 h-6" /> Chat en ligne 7j/7</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
          <p>© 2026 Back Market. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Le chatbot flottant à droite */}
      <Chatbot />
      
      {/* Floating Serenity Toggle (L'icône flottante à gauche, totalement restaurée) */}
      <button
        onClick={handleActivateSerenity}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border-4 transition-all hover:scale-105 ${
          serenityMode 
            ? 'bg-black text-green-400 border-green-500' 
            : 'bg-green-100 text-green-900 border-white hover:bg-green-200'
        }`}
      >
        {serenityMode ? <X className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
        <span className="font-bold text-xl hidden sm:block">
          {serenityMode ? 'Désactiver Sérénité' : 'Activer Mode Sérénité'}
        </span>
      </button>

      {/* Serenity Mode Toast (Restauré) */}
      {showSerenityToast && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[100] bg-white border-4 border-green-500 text-green-800 px-10 py-6 rounded-full shadow-2xl flex items-center gap-6 animate-in fade-in slide-in-from-top-10 duration-500">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
          <span className="text-3xl font-extrabold tracking-tight">Mode Sérénité activé</span>
        </div>
      )}

      {/* Cart Toast (Restauré) */}
      {showCartToast && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[100] bg-black border-4 border-green-500 text-white px-10 py-6 rounded-full shadow-2xl flex items-center gap-6 animate-in fade-in slide-in-from-top-10 duration-500">
          <ShoppingCart className="w-12 h-12 text-green-400" />
          <span className="text-2xl font-bold tracking-tight">Produit ajouté au panier !</span>
        </div>
      )}
    </div>
  );
}
