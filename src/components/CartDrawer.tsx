import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, sizeMl: number, quantityDelta: number) => void;
  onRemoveItem: (id: string, sizeMl: number) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedSize.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-neutral-950 border-l border-gold-800/25 p-6 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between border-b border-neutral-900 pb-5">
                  <div className="flex items-center space-x-2.5">
                    <ShoppingBag className="h-5 w-5 text-gold-400" />
                    <h2 className="font-serif text-lg font-bold text-white tracking-wide">
                      Votre Coffret d'Achat
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-900 text-neutral-400 hover:text-gold-400 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Items List */}
                <div className="mt-6 flex-grow overflow-y-auto max-h-[calc(100vh-290px)] pr-1">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-neutral-600">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-200 text-sm">Votre panier est vide</p>
                        <p className="text-xs text-neutral-500 mt-1">Découvrez notre collection de parfums 100% originaux pour commencer.</p>
                      </div>
                      <button
                        onClick={onClose}
                        className="rounded-full border border-gold-500/20 bg-gold-400/10 px-5 py-2 text-xs text-gold-300 transition-colors hover:bg-gold-400/20"
                      >
                        Continuer les Achats
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={`${item.perfume.id}-${item.selectedSize.ml}`}
                          className="flex items-center justify-between rounded-xl border border-neutral-900/60 bg-neutral-900/30 p-3.5"
                        >
                          {/* Fragrance Thumbnail */}
                          <div className="h-16 w-16 flex-none rounded-lg bg-neutral-950 p-1 flex items-center justify-center">
                            <img
                              src={item.perfume.image}
                              alt={item.perfume.name}
                              className="h-12 w-auto object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Info Column */}
                          <div className="ml-4 flex-grow">
                            <h3 className="font-serif text-sm font-semibold text-white">
                              {item.perfume.name}
                            </h3>
                            <p className="text-[10px] text-neutral-500 font-mono">
                              Contenance : {item.selectedSize.ml}ml
                            </p>
                            
                            <div className="mt-2 flex items-center space-x-1">
                              <button
                                onClick={() => onUpdateQuantity(item.perfume.id, item.selectedSize.ml, -1)}
                                className="flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-neutral-400 hover:text-white"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="font-mono text-xs w-6 text-center text-neutral-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.perfume.id, item.selectedSize.ml, 1)}
                                className="flex h-5 w-5 items-center justify-center rounded bg-neutral-900 text-neutral-400 hover:text-white"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>

                          {/* Pricing Column */}
                          <div className="ml-4 text-right flex flex-col justify-between h-20 items-end">
                            <button
                              onClick={() => onRemoveItem(item.perfume.id, item.selectedSize.ml)}
                              className="text-neutral-600 hover:text-red-400 p-1"
                              title="Retirer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            
                            <div className="font-mono text-sm font-bold text-gold-400">
                              {(item.selectedSize.price * item.quantity).toLocaleString("fr-FR")} DA
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Section */}
              {cartItems.length > 0 && (
                <div className="border-t border-neutral-900 pt-5 space-y-4">
                  {/* Subtle Trust badge */}
                  <div className="flex items-center space-x-2 rounded-lg bg-green-500/5 border border-green-500/10 px-3.5 py-2">
                    <ShieldCheck className="h-4 w-4 text-green-400 flex-none" />
                    <p className="text-[10px] text-neutral-400">
                      Garantie d'authenticité AURA : Parfums 100% originaux dans leur emballage scellé.
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-400">Sous-total :</span>
                    <span className="font-mono text-xl font-bold text-[#ECC343]">
                      {subtotal.toLocaleString("fr-FR")} DA
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={onClose}
                      className="w-1/3 rounded-lg border border-neutral-800 py-3.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
                    >
                      Boutique
                    </button>
                    <button
                      onClick={onCheckout}
                      className="flex-grow flex items-center justify-center space-x-2 rounded-lg bg-gold-500 py-3.5 text-xs font-bold uppercase tracking-widest text-neutral-950 hover:bg-gold-400 transition-all cursor-pointer shadow-lg shadow-gold-500/15 group"
                    >
                      <span>Prendre Ma Commande</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
