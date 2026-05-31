import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, ShieldCheck, Sparkles, Menu, X, Star } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onQuizClick: () => void;
  onVerificationClick: () => void;
  onScrollToSection: (id: string) => void;
}

export default function Navbar({
  cartCount,
  onCartClick,
  onQuizClick,
  onVerificationClick,
  onScrollToSection,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: "Collection", target: "collection" },
    { label: "Authenticité", target: "authenticity" },
    { label: "Notre Histoire", target: "story" },
    { label: "Avis Clients", target: "reviews" },
  ];

  return (
    <header id="store-header" className="sticky top-0 z-40 w-full border-b border-gold-800/20 bg-neutral-950/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo / Branding */}
        <div 
          onClick={() => onScrollToSection("hero")} 
          className="flex cursor-pointer items-center space-x-2"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gold-400 bg-neutral-900 shadow-lg shadow-gold-500/10">
            <span className="font-serif text-lg font-bold text-gold-400">A</span>
            <span className="absolute inset-0 rounded-full border border-gold-400/30 animate-pulse"></span>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold Tracking-widest text-[#ECC343] sm:text-2xl">
              AURA <span className="font-sans text-xs tracking-[0.3em] font-light text-neutral-400">PARFUME</span>
            </h1>
            <p className="hidden text-[8px] tracking-[0.15em] text-gold-300 sm:block">LES MAÎTRES DE L'ORIGINAL</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {menuItems.map((item) => (
            <button
              key={item.target}
              onClick={() => {
                onScrollToSection(item.target);
              }}
              className="text-neutral-400 transition-colors hover:text-gold-400 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={onQuizClick}
            className="flex items-center space-x-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1.5 text-xs text-gold-300 hover:bg-gold-500/25 transition-all animate-pulse"
          >
            <Sparkles className="h-3 w-3 text-gold-400" />
            <span>Diagnostic Olfactif</span>
          </button>
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onVerificationClick}
            className="hidden sm:flex items-center space-x-1 text-xs font-semibold tracking-wider text-green-400 hover:text-green-300 transition-colors"
            title="Vérificateur de Batch Code"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>100% Certifié</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onCartClick}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 hover:border-gold-500 hover:text-gold-400 transition-all cursor-pointer"
            id="cart-trigger"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-neutral-950"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-300 md:hidden hover:border-gold-500"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-neutral-900 bg-neutral-950 px-4 py-6 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onScrollToSection(item.target);
                  }}
                  className="text-left text-base font-medium text-neutral-300 hover:text-gold-400"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuizClick();
                }}
                className="flex items-center justify-center space-x-2 rounded-lg border border-gold-500/30 bg-gold-500/10 py-3 text-sm text-gold-300"
              >
                <Sparkles className="h-4 w-4" />
                <span>Diagnostic Olfactif - Quiz Senteur</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onVerificationClick();
                }}
                className="flex items-center justify-center space-x-2 rounded-lg border border-neutral-800 bg-neutral-900 py-3 text-sm text-neutral-300"
              >
                <ShieldCheck className="h-4 w-4 text-green-400" />
                <span>Vérification d'Authenticité (Batch Code)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
