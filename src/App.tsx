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
  X
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

  // Shared Header
  const Header = () => (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-slate-200 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('home')}
          role="button"
          tabIndex={0}
        >
          <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            CM
          </div>
          <span className="text-3xl font-bold text-slate-900 hidden sm:block">CoolMarket</span>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          {!serenityMode ? (
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher un produit..." 
                className="w-full h-14 pl-14 pr-4 rounded-full border-2 border-slate-300 text-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
            </div>
          ) : (
            <nav className="flex items-center justify-center gap-8">
              <button onClick={() => navigate('product')} className="font-bold text-xl text-slate-700 hover:text-emerald-700 transition-colors">Trouver un téléphone</button>
              <button onClick={() => navigate('home')} className="font-bold text-xl text-slate-700 hover:text-emerald-700 transition-colors">Téléphones recommandés</button>
              <button onClick={() => navigate('assistance')} className="font-bold text-xl text-slate-700 hover:text-emerald-700 transition-colors">Besoin d'aide</button>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('assistance')}
            className="flex flex-col items-center text-slate-700 hover:text-emerald-700 transition-colors"
          >
            <HelpCircle className="w-8 h-8 mb-1" />
            <span className="text-lg font-medium">Aide</span>
          </button>
          <button className="flex flex-col items-center text-slate-700 hover:text-emerald-700 transition-colors relative">
            <ShoppingCart className="w-8 h-8 mb-1" />
            <span className="text-lg font-medium">Panier</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center animate-in zoom-in">
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
            className="w-full h-14 pl-12 pr-4 rounded-xl border-2 border-slate-300 text-lg focus:border-emerald-600 outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
        </div>
      </div>
    </header>
  );

  // Chatbot Widget
  const Chatbot = () => {
    if (!showChatbot) {
      return (
        <button 
          onClick={() => setShowChatbot(true)}
          className={`fixed bottom-6 right-6 z-50 ${serenityMode ? 'px-6 py-4 rounded-full' : 'w-16 h-16 rounded-full'} bg-emerald-700 hover:bg-emerald-600 text-white shadow-2xl flex items-center justify-center gap-3 transition-transform hover:scale-105 border-4 border-white`}
          aria-label="Ouvrir l'assistant"
        >
          <MessageCircle className="w-8 h-8" />
          {serenityMode && <span className="font-bold text-xl">Besoin d'aide ?</span>}
        </button>
      );
    }
    return (
      <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 overflow-hidden flex flex-col">
        <div className="bg-emerald-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Headset className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Assistant</span>
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
                : "Bonjour ! Puis-je vous aider à choisir un téléphone ?"}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {serenityMode ? (
              <>
                <button onClick={() => navigate('product')} className="w-full text-left p-4 bg-white border-2 border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50 rounded-xl text-lg font-medium text-emerald-800 transition-all">
                  Choisir un téléphone simple
                </button>
                <button className="w-full text-left p-4 bg-white border-2 border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50 rounded-xl text-lg font-medium text-emerald-800 transition-all">
                  Comprendre les garanties
                </button>
                <button onClick={() => navigate('assistance')} className="w-full text-left p-4 bg-white border-2 border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50 rounded-xl text-lg font-medium text-emerald-800 transition-all">
                  Parler à un conseiller
                </button>
                <div className="mt-2 pt-4 border-t border-slate-200 flex flex-col gap-3">
                  <button onClick={() => navigate('assistance')} className="w-full flex items-center justify-center gap-2 p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-xl text-lg font-bold transition-all">
                    <Phone className="w-6 h-6" /> Appel téléphonique
                  </button>
                  <button onClick={() => navigate('assistance')} className="w-full flex items-center justify-center gap-2 p-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-lg font-bold transition-all">
                    <Video className="w-6 h-6" /> Visio avec conseiller
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => navigate('product')} className="w-full text-left p-4 bg-white border-2 border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50 rounded-xl text-lg font-medium text-emerald-800 transition-all">
                  Trouver un téléphone simple
                </button>
                <button className="w-full text-left p-4 bg-white border-2 border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50 rounded-xl text-lg font-medium text-emerald-800 transition-all">
                  Comprendre les garanties
                </button>
                <button onClick={() => navigate('assistance')} className="w-full text-left p-4 bg-white border-2 border-emerald-200 hover:border-emerald-600 hover:bg-emerald-50 rounded-xl text-lg font-medium text-emerald-800 transition-all">
                  Parler à un conseiller
                </button>
                <div className="mt-2 pt-4 border-t border-slate-200">
                  <button onClick={() => navigate('assistance')} className="w-full flex items-center justify-center gap-2 p-4 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-xl text-lg font-bold transition-all">
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
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Achetez votre smartphone reconditionné en toute confiance
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Produits testés par des experts et garantis 24 mois.
          </p>
          
          <button 
            onClick={() => navigate('product')}
            className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 text-2xl font-bold py-5 px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <Smartphone className="w-8 h-8" />
            Voir nos téléphones
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Que recherchez-vous ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <button 
            onClick={() => navigate('product')}
            className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-emerald-500 transition-all group"
          >
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-12 h-12 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Smartphones</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-emerald-500 transition-all group">
            <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Tablet className="w-12 h-12 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Tablettes</span>
          </button>

          <button 
            onClick={() => navigate('assistance')}
            className="flex flex-col items-center justify-center p-10 bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-transparent hover:border-emerald-500 transition-all group"
          >
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Headset className="w-12 h-12 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-slate-800">Assistance</span>
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-5xl mx-auto px-4 py-16 border-t border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
          {serenityMode ? "Téléphones recommandés pour vous" : "Nos téléphones les plus simples d'utilisation"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div 
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-emerald-500 transition-all overflow-hidden flex flex-col cursor-pointer group relative" 
            onClick={() => navigate('product')}
            role="button"
            tabIndex={0}
          >
            {serenityMode && (
              <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                <Star className="w-4 h-4 fill-emerald-800" /> Senior-friendly
              </div>
            )}
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100 group-hover:bg-emerald-50/50 transition-colors">
              <Smartphone className="w-32 h-32 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">iPhone 12</h3>
              <p className="text-lg text-slate-500 mb-2">Reconditionné - Très bon état</p>
              {serenityMode && (
                <div className="flex items-center gap-1 text-emerald-600 mb-4 font-bold">
                  <Star className="w-5 h-5 fill-current" /> 4.8/5
                </div>
              )}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-3xl font-extrabold text-slate-900">349 €</span>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors">
                  Voir
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div 
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-emerald-500 transition-all overflow-hidden flex flex-col cursor-pointer group relative" 
            onClick={() => navigate('product')}
            role="button"
            tabIndex={0}
          >
            {serenityMode && (
              <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                <Star className="w-4 h-4 fill-emerald-800" /> Senior-friendly
              </div>
            )}
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100 group-hover:bg-emerald-50/50 transition-colors">
              <Smartphone className="w-32 h-32 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Samsung Galaxy S21</h3>
              <p className="text-lg text-slate-500 mb-2">Reconditionné - Parfait état</p>
              {serenityMode && (
                <div className="flex items-center gap-1 text-emerald-600 mb-4 font-bold">
                  <Star className="w-5 h-5 fill-current" /> 4.9/5
                </div>
              )}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-3xl font-extrabold text-slate-900">299 €</span>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors">
                  Voir
                </button>
              </div>
            </div>
          </div>

          {/* Product 3 */}
          <div 
            className="bg-white rounded-3xl shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-emerald-500 transition-all overflow-hidden flex flex-col cursor-pointer group relative" 
            onClick={() => navigate('product')}
            role="button"
            tabIndex={0}
          >
            {serenityMode && (
              <div className="absolute top-4 left-4 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10">
                <Star className="w-4 h-4 fill-emerald-800" /> Senior-friendly
              </div>
            )}
            <div className="h-64 bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100 group-hover:bg-emerald-50/50 transition-colors">
              <Smartphone className="w-32 h-32 text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">iPhone SE (2022)</h3>
              <p className="text-lg text-slate-500 mb-2">Reconditionné - Bon état</p>
              {serenityMode && (
                <div className="flex items-center gap-1 text-emerald-600 mb-4 font-bold">
                  <Star className="w-5 h-5 fill-current" /> 4.6/5
                </div>
              )}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-3xl font-extrabold text-slate-900">229 €</span>
                <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors">
                  Voir
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Section */}
      <section className="bg-emerald-50 py-16 px-4 border-t border-b border-emerald-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Pourquoi nous faire confiance ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Produits testés</h3>
              <p className="text-lg text-slate-600">Vérifiés sur 40 points de contrôle par nos experts.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Garantie 24 mois</h3>
              <p className="text-lg text-slate-600">En cas de panne, nous réparons ou remplaçons.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-emerald-700 fill-emerald-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">4,7/5 – Avis clients</h3>
              <p className="text-lg text-slate-600">Plus de 10 000 clients satisfaits de leur achat.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Screen 2: Product Page
  const ProductScreen = () => (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-xl font-medium text-slate-600 hover:text-emerald-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Retour à l'accueil
        </button>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Image */}
            <div className="p-12 flex items-center justify-center bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="relative w-full max-w-md aspect-[3/4] bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-8">
                {/* Placeholder for iPhone 12 Image */}
                <div className="w-full h-full border-4 border-slate-800 rounded-[3rem] p-2 relative">
                  <div className="w-full h-full bg-slate-100 rounded-[2.5rem] overflow-hidden flex flex-col">
                    <div className="h-6 bg-black w-1/2 mx-auto rounded-b-xl"></div>
                    <div className="flex-1 flex items-center justify-center">
                      <Smartphone className="w-32 h-32 text-slate-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="p-8 sm:p-12 flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                iPhone 12 – Reconditionné
              </h1>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="flex text-emerald-500">
                  <Star className="w-8 h-8 fill-current" />
                  <Star className="w-8 h-8 fill-current" />
                  <Star className="w-8 h-8 fill-current" />
                  <Star className="w-8 h-8 fill-current" />
                  <Star className="w-8 h-8 fill-current opacity-50" />
                </div>
                <span className="text-2xl font-bold text-slate-800">4,7 / 5</span>
                <span className="text-xl text-slate-500 underline ml-2">10 245 avis clients</span>
              </div>

              <div className="space-y-6 mb-10">
                <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-xl">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <span className="text-2xl font-medium text-slate-800">Testé par des experts</span>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                  <span className="text-2xl font-medium text-slate-800">Garantie 24 mois</span>
                </div>
                <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-xl">
                  <ThumbsUp className="w-8 h-8 text-emerald-600 shrink-0" />
                  <span className="text-2xl font-medium text-slate-800">Retour gratuit 30 jours</span>
                </div>
              </div>

              <div className="bg-blue-50 border-l-8 border-blue-500 p-6 rounded-r-2xl mb-10">
                <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6" />
                  Avis clients seniors
                </h3>
                <p className="text-2xl text-blue-800 italic font-medium leading-relaxed">
                  "Très facile à utiliser, parfait pour téléphoner et faire des photos."
                </p>
                <p className="text-lg text-blue-600 mt-2">— Jean, 72 ans</p>
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <ShoppingCart className="w-8 h-8" />
                  Acheter en toute confiance
                </button>
                <button 
                  onClick={() => navigate('assistance')}
                  className="w-full bg-white border-4 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-2xl font-bold py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-3"
                >
                  <HelpCircle className="w-8 h-8" />
                  Besoin d'aide pour choisir ?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Screen 3: Assistance Page
  const AssistanceScreen = () => (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-2 text-xl font-medium text-slate-600 hover:text-emerald-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Retour
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6">
            Besoin d'aide pour choisir votre téléphone ?
          </h1>
          <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nos conseillers vous accompagnent pour choisir le smartphone le plus simple pour vous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Block 1: Phone */}
          <div className="bg-white p-8 rounded-3xl shadow-md border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Phone className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Téléphone</h2>
            <p className="text-xl text-slate-600 mb-8 flex-1">Appelez un conseiller gratuitement</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-colors">
              Appeler maintenant
            </button>
          </div>

          {/* Block 2: Chat */}
          <div className="bg-white p-8 rounded-3xl shadow-md border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Chat en direct</h2>
            <p className="text-xl text-slate-600 mb-8 flex-1">Discutez avec un conseiller</p>
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-colors">
              Démarrer le chat
            </button>
          </div>

          {/* Block 3: Video */}
          <div className="bg-white p-8 rounded-3xl shadow-md border-2 border-slate-100 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Video className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Assistance vidéo</h2>
            <p className="text-xl text-slate-600 mb-8 flex-1">Un expert peut vous guider en visio</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 px-6 rounded-xl transition-colors">
              Démarrer une visio
            </button>
          </div>
        </div>

        {/* Tutorial Section */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-200 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Comment utiliser votre smartphone ?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-100 rounded-2xl mb-4 relative overflow-hidden border-2 border-transparent group-hover:border-emerald-500 transition-colors">
                <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80" alt="Passer un appel" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-emerald-700 transition-colors">Passer un appel</h3>
            </div>
            
            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-100 rounded-2xl mb-4 relative overflow-hidden border-2 border-transparent group-hover:border-emerald-500 transition-colors">
                <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=500&q=80" alt="Envoyer un message" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-emerald-700 transition-colors">Envoyer un message</h3>
            </div>

            <div className="group cursor-pointer">
              <div className="aspect-video bg-slate-100 rounded-2xl mb-4 relative overflow-hidden border-2 border-transparent group-hover:border-emerald-500 transition-colors">
                <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" alt="Prendre une photo" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <PlayCircle className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-800 text-center group-hover:text-emerald-700 transition-colors">Prendre une photo</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 mt-auto">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-xl">
              CM
            </div>
            <span className="text-2xl font-bold text-white">CoolMarket</span>
          </div>
          <p>Votre partenaire de confiance pour des smartphones reconditionnés simples et garantis.</p>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-4">Liens utiles</h4>
          <ul className="space-y-3">
            <li><button onClick={() => navigate('home')} className="hover:text-emerald-400 transition-colors">Accueil</button></li>
            <li><button onClick={() => navigate('product')} className="hover:text-emerald-400 transition-colors">Nos téléphones</button></li>
            <li><button onClick={() => navigate('assistance')} className="hover:text-emerald-400 transition-colors">Assistance senior</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold text-xl mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2"><Phone className="w-5 h-5 text-emerald-500" /> Numéro gratuit : 0800 123 456</li>
            <li className="flex items-center gap-2"><MessageSquare className="w-5 h-5 text-emerald-500" /> Chat en ligne 7j/7</li>
          </ul>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
        <p>© 2026 CoolMarket. Tous droits réservés.</p>
      </div>
    </footer>
  );

  return (
    <div className="font-sans text-slate-900 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'product' && <ProductScreen />}
        {currentScreen === 'assistance' && <AssistanceScreen />}
      </main>
      <Footer />
      <Chatbot />
      
      {/* Floating Serenity Toggle */}
      <button
        onClick={handleActivateSerenity}
        className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl border-4 transition-all hover:scale-105 ${
          serenityMode 
            ? 'bg-slate-800 text-emerald-300 border-emerald-500' 
            : 'bg-emerald-100 text-emerald-800 border-white hover:bg-emerald-200'
        }`}
      >
        {serenityMode ? <X className="w-8 h-8" /> : <ShieldCheck className="w-8 h-8" />}
        <span className="font-bold text-xl hidden sm:block">
          {serenityMode ? 'Désactiver Sérénité' : 'Activer Sérénité'}
        </span>
      </button>

      {/* Serenity Mode Toast */}
      {showSerenityToast && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[100] bg-white border-4 border-emerald-500 text-emerald-800 px-10 py-6 rounded-full shadow-2xl flex items-center gap-6 animate-in fade-in slide-in-from-top-10 duration-500">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          <span className="text-3xl font-extrabold tracking-tight">Mode Sérénité activé</span>
        </div>
      )}

      {/* Cart Toast */}
      {showCartToast && (
        <div className="fixed top-32 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 border-4 border-emerald-500 text-white px-10 py-6 rounded-full shadow-2xl flex items-center gap-6 animate-in fade-in slide-in-from-top-10 duration-500">
          <ShoppingCart className="w-12 h-12 text-emerald-400" />
          <span className="text-2xl font-bold tracking-tight">Produit ajouté au panier !</span>
        </div>
      )}
    </div>
  );
}
