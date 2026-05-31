import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Star, ShieldCheck, HelpCircle, Phone, ArrowDown, MapPin, Truck, HelpCircle as HelpIcon, Flame, Mail, Sparkles } from "lucide-react";
import { Perfume, CartItem, Review } from "./types";
import { PRODUCTS, INITIAL_REVIEWS, HERO_IMAGE } from "./data/storeData";

// Component imports
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetailsModal from "./components/ProductDetailsModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import ScentQuiz from "./components/ScentQuiz";
import AuthenticityChecker from "./components/AuthenticityChecker";
import Reviews from "./components/Reviews";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("aura_perfume_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem("aura_perfume_reviews");
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Navigation / UI States
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("aura_perfume_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("aura_perfume_reviews", JSON.stringify(reviews));
  }, [reviews]);

  // Cart Handlers
  const handleAddToCart = (perfume: Perfume, selectedSize: { ml: number; price: number }) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.perfume.id === perfume.id && item.selectedSize.ml === selectedSize.ml
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { perfume, selectedSize, quantity: 1 }];
      }
    });

    // Animate cart opening momentarily to give rich tactile feedback
    setCartOpen(true);
  };

  const handleUpdateQuantity = (perfumeId: string, sizeMl: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.perfume.id === perfumeId && item.selectedSize.ml === sizeMl) {
            return { ...item, quantity: Math.max(1, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const handleRemoveItem = (id: string, sizeMl: number) => {
    setCartItems((prev) => prev.filter((item) => !(item.perfume.id === id && item.selectedSize.ml === sizeMl)));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Review Handlers
  const handleAddReview = (perfumeId: string, name: string, rating: number, comment: string, image?: string) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      perfumeId,
      name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      verified: true, // Marked as guaranteed buyer since they are on the site
      image,
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  // Scroll logic jump
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter Catalog
  const filteredProducts = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const cartTotalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen text-neutral-200">
      {/* Header and navbar */}
      <Navbar
        cartCount={cartTotalCount}
        onCartClick={() => setCartOpen(true)}
        onQuizClick={() => setQuizOpen(true)}
        onVerificationClick={() => handleScrollToSection("authenticity")}
        onScrollToSection={handleScrollToSection}
      />

      {/* Hero Banner Section */}
      <section id="hero" className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Absolute Background gold glow */}
        <div className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-gold-400/5 blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-neutral-900 blur-3xl"></div>

        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          
          {/* Hero text */}
          <div className="space-y-6 lg:col-span-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full bg-gold-500/10 border border-gold-500/20 px-4 py-1.5 text-xs text-gold-300 font-serif">
              <Sparkles className="h-3.5 w-3.5 text-[#ECC343]" />
              <span>FRAGRANCES RAFFINÉES & ORIGINALES</span>
            </div>

            <h1 className="font-serif text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.08]">
              Éveillez Votre <span className="text-[#ECC343] italic block mt-1">AURA Suprême</span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-lg text-sm text-neutral-400 leading-relaxed">
              Découvrez la noblesse d'une collection de parfums de prestige 100% originaux formulés à Grasse. Des sillages d'une longévité infinie, certifiés authentiques, livrés à domicile partout en Algérie avec paiement cash sécurisé à la réception.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => handleScrollToSection("collection")}
                className="flex items-center justify-center space-x-2 rounded-xl bg-gold-500 px-8 py-4 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:bg-gold-400 shadow-xl shadow-gold-500/10 hover:shadow-gold-500/20 transition-all cursor-pointer group"
              >
                <span>Découvrir la Collection</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </button>

              <button
                onClick={() => setQuizOpen(true)}
                className="flex items-center justify-center space-x-2 rounded-xl border border-gold-500/35 bg-gold-500/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#ECC343] hover:bg-gold-500 hover:text-neutral-950 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Diagnostic Olfactif</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-900 max-w-sm mx-auto lg:mx-0 text-left">
              <div>
                <span className="block font-mono text-xl font-bold text-white leading-none">100%</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mt-1.5">Original Garanti</span>
              </div>
              <div className="border-l border-neutral-900 pl-4">
                <span className="block font-mono text-xl font-bold text-white leading-none">24h+</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mt-1.5">Tenue sur peau</span>
              </div>
              <div className="border-l border-neutral-900 pl-4">
                <span className="block font-mono text-xl font-bold text-white leading-none">58</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mt-1.5">Wilayas livrées</span>
              </div>
            </div>
          </div>

          {/* Hero Banner Visual Asset Stage */}
          <div className="relative lg:col-span-6 flex justify-center items-center">
            <div className="absolute inset-0 -z-10 bg-radial-gradient from-gold-500/10 to-transparent blur-3xl rounded-full"></div>
            
            <div className="relative rounded-2xl border border-gold-800/25 bg-neutral-950/65 p-4 md:p-6 shadow-2xl shadow-gold-500/5 overflow-hidden w-full max-w-lg aspect-[1.2]">
              {/* Overlay elements */}
              <div className="absolute top-4 left-4 z-10 rounded-full bg-neutral-950/80 px-3 py-1 text-[10px] text-gold-400 font-mono tracking-widest border border-gold-700/30">
                PRODUITS HAUTE GAMME
              </div>
              <img
                src={HERO_IMAGE}
                alt="AURA Collection d'Exception"
                className="w-full h-full object-cover rounded-xl filter brightness-[0.9] hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Value Pillars Row */}
      <section className="bg-neutral-950 border-y border-neutral-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Pillar 1 */}
            <div className="flex gap-4 p-4 rounded-xl border border-neutral-900 bg-neutral-950/40">
              <ShieldCheck className="h-6 w-6 text-[#ECC343] shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-white tracking-wide">Authenticité Laser</h4>
                <p className="text-xs text-neutral-500 mt-1">Chaque boîte et flacon porte un Batch Code unique imprimé au laser, vérifiable directement en ligne.</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex gap-4 p-4 rounded-xl border border-neutral-900 bg-neutral-950/40">
              <Truck className="h-6 w-6 text-[#ECC343] shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-white tracking-wide">Paiement à la livraison</h4>
                <p className="text-xs text-neutral-500 mt-1">Réglez tranquillement en liquide à la maison, après avoir examiné et vérifié la boîte d'origine à l'arrivée.</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex gap-4 p-4 rounded-xl border border-neutral-900 bg-neutral-950/40">
              <MapPin className="h-6 w-6 text-[#ECC343] shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-white tracking-wide">Livraison sur 58 Wilayas</h4>
                <p className="text-xs text-neutral-500 mt-1">Expédition express sécurisée vers toutes les provinces d'Algérie avec support de confirmation téléphonique.</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex gap-4 p-4 rounded-xl border border-neutral-900 bg-neutral-950/40">
              <Star className="h-6 w-6 text-[#ECC343] shrink-0" />
              <div>
                <h4 className="font-serif text-sm font-semibold text-white tracking-wide">Ingrédients de Grasse</h4>
                <p className="text-xs text-neutral-500 mt-1">Parfums formulés dans les meilleurs laboratoires de Grasse (France) sous l'égide de nos maîtres nez.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Fragrance Collection Grid Area */}
      <section id="collection" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-400">
              LES SILLAGES EMBLÉMATIQUES
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-white sm:text-4xl">
              Notre Collection <span className="text-[#ECC343] italic">Premium</span>
            </h2>
          </div>

          {/* Filtering Categories slider */}
          <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-wider">
            {[
              { val: "all", label: "Tous les Flacons" },
              { val: "woody", label: "Boisés Profonds" },
              { val: "amber", label: "Oud & Épices" },
              { val: "floral", label: "Fleuris Suisses" },
              { val: "fresh", label: "Radiants & Frais" },
            ].map((cat) => (
              <button
                key={cat.val}
                onClick={() => setActiveCategory(cat.val)}
                className={`rounded-full px-4 py-2 transition-all cursor-pointer ${
                  activeCategory === cat.val
                    ? "bg-[#ECC343] text-neutral-950 font-bold shadow-lg shadow-gold-500/10"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((perfume) => (
            <ProductCard
              key={perfume.id}
              perfume={perfume}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedPerfume(p)}
            />
          ))}
        </div>
      </section>

      {/* Scent Quiz Interactive Mid-Banner */}
      <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-gold-800/15 bg-neutral-950 p-8 md:p-12 shadow-2xl">
          <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-gold-400/5 blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs uppercase font-mono tracking-widest text-[#ECC343] font-bold">
              Besoin de conseil olfactif ?
            </span>
            <h2 className="font-serif text-3xl font-bold leading-tight text-white md:text-4xl">
              Trouvez le parfum original qui correspond exactement à <span className="text-[#ECC343] italic">votre personnalité</span>
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              En répondant à notre questionnaire conçu par des nez professionnels, découvrez quelle fragrance AURA de Grasse révélera le mieux votre prestance au quotidien ou lors de vos réceptions d'apparat.
            </p>
            <button
              onClick={() => setQuizOpen(true)}
              className="flex items-center space-x-2 rounded-xl bg-gold-500 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:bg-gold-400 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              <span>Démarrer le diagnostic olfactif</span>
            </button>
          </div>
        </div>
      </section>

      {/* Embedded Authenticity module */}
      <AuthenticityChecker />

      {/* Embedded Reviews feed */}
      <Reviews reviews={reviews} onAddReview={handleAddReview} />

      {/* Heritage narrative section "Notre Histoire" */}
      <section id="story" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-neutral-900">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          
          {/* visual visual */}
          <div className="relative flex justify-center items-center">
            <div className="absolute h-64 w-64 bg-gold-600/5 blur-3xl"></div>
            
            <div className="aspect-[1.3] relative rounded-2xl border border-neutral-900 bg-neutral-950 p-4 shadow-xl">
              <img
                src={PRODUCTS[0].image}
                alt="Branding AURA d'exception"
                className="z-10 h-64 w-auto object-contain mx-auto filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Narrative text */}
          <div className="space-y-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#ECC343]">
              L'ART Olfactive DEPUIS NOS DISTILLERIES
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-white sm:text-4xl">
              La Fusion Intemporelle : <span className="text-[#ECC343] italic">Grasse & L'Algérie</span>
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              La maison <strong className="text-white">AURA PARFUME</strong> est née d'une vision audacieuse : marier l'expertise technique séculaire des maîtres parfumeurs de Grasse (Alpes-Maritimes) avec la poésie charismatique et chaleureuse du territoire algérien. Nos essences précieuses puisent leur inspiration tant dans les brises fraîches de la baie d'Alger que dans la majesté mystique des dunes sahariennes.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Nous n'acceptons aucun compromis olfactif. Tandis que le marché regorge de dilutions altérées ou de contrefaçons volatiles, nos compositions reposent sur des concentrations suprêmes de pur extrait, garantissant des sillages envoûtants qui rayonnent majestueusement tout au long de la journée.
            </p>
          </div>
        </div>
      </section>

      {/* Customer service section (support tel, call back) */}
      <section className="bg-neutral-950 border-t border-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center max-w-2xl space-y-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#ECC343]/10 border border-[#ECC343]/30 text-[#ECC343]">
            <Phone className="h-5 w-5" />
          </div>
          <h3 className="font-serif text-2xl font-bold tracking-wide text-white">
            Un Conseiller Clientele Dédié pour l'Algérie
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Vous avez une hésitation olfactive, des questions sur une livraison urgente à Oran, Constantine ou Sétif, ou besoin d'aide pour saisir votre commande ? Notre équipe d'experts est disponible par appel direct ou message de confirmation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <div className="rounded-xl border border-neutral-900 bg-neutral-950 px-6 py-4">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Notre Ligne d'Assistance</span>
              <span className="text-gold-400 font-mono text-base font-bold">+213 (0) 550 88 44 22</span>
            </div>
            <div className="rounded-xl border border-neutral-900 bg-neutral-950 px-6 py-4">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">Support Courriel</span>
              <span className="text-gold-400 font-mono text-base font-bold">concierge@aura-parfume.dz</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-sm text-neutral-500 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-neutral-900 pb-8">
            {/* Branding left */}
            <div>
              <h4 className="font-serif text-lg font-bold text-white tracking-widest">
                AURA <span className="font-sans text-[10px] tracking-[0.25em] font-light text-neutral-400">PARFUME</span>
              </h4>
              <p className="text-xs text-neutral-600 mt-1">Parfumerie de niche d'origine Grassoise & Prestige Algérien.</p>
            </div>

            {/* Nav rights right */}
            <div className="flex flex-wrap gap-4 text-xs font-medium text-neutral-500">
              <button onClick={() => handleScrollToSection("collection")} className="hover:text-gold-400 cursor-pointer">Collection</button>
              <button onClick={() => handleScrollToSection("authenticity")} className="hover:text-gold-400 cursor-pointer">Contrôle de Batch</button>
              <button onClick={() => handleScrollToSection("story")} className="hover:text-gold-400 cursor-pointer">Histoire</button>
              <button onClick={() => handleScrollToSection("reviews")} className="hover:text-gold-400 cursor-pointer">Avis</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-neutral-600">
            <p>© 2026 AURA PARFUME CO. Tous droits réservés.</p>
            <p className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>Garantie Originale en Dinar Algérien (DA)</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer sliding sidebar */}
      <CartDrawer
        isOpen={cartOpen}
        cartItems={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {/* Checkout form Modal with Wilayas selector */}
      <CheckoutModal
        isOpen={checkoutOpen}
        cartItems={cartItems}
        onClose={() => setCheckoutOpen(false)}
        onClearCart={handleClearCart}
      />

      {/* Diagnostic sensory Scent Quiz */}
      <ScentQuiz
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        onSelectProduct={(perfume) => setSelectedPerfume(perfume)}
      />

      {/* Fragrance breakdown Pyramidal details modal */}
      <ProductDetailsModal
        perfume={selectedPerfume}
        reviews={reviews}
        onClose={() => setSelectedPerfume(null)}
        onAddToCart={(perfume, size) => {
          handleAddToCart(perfume, size);
          setSelectedPerfume(null);
        }}
      />
    </div>
  );
}
