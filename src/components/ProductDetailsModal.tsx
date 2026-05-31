import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, ChevronRight, Star, ShoppingBag, Wind } from "lucide-react";
import { Perfume, Review } from "../types";

interface ProductDetailsModalProps {
  perfume: Perfume | null;
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (perfume: Perfume, selectedSize: { ml: number; price: number }) => void;
}

export default function ProductDetailsModal({
  perfume,
  reviews,
  onClose,
  onAddToCart,
}: ProductDetailsModalProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  if (!perfume) return null;

  const currentSize = perfume.sizes[selectedSizeIndex];
  const productReviews = reviews.filter((r) => r.perfumeId === perfume.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-gold-500/25 bg-neutral-950 p-6 shadow-2xl md:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 bg-neutral-950 text-neutral-400 hover:text-gold-400 focus:outline-none cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Left Column: Premium Image Stage */}
            <div className="relative flex items-center justify-center rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-950 p-6 md:col-span-5">
              <div className="absolute h-40 w-40 rounded-full bg-gold-500/10 blur-3xl"></div>
              <img
                src={perfume.image}
                alt={perfume.name}
                className="z-10 max-h-72 w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 rounded-full bg-neutral-950/80 border border-gold-500/20 px-3 py-1 text-[10px] text-gold-300 font-semibold tracking-wider">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                <span>FLACON ORIGINAL CERTIFIÉ</span>
              </div>
            </div>

            {/* Right Column: Descriptions & Notes */}
            <div className="flex flex-col justify-between md:col-span-7">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-gold-400">
                  {perfume.categoryLabel}
                </span>
                <h2 className="mt-1 font-serif text-3xl font-bold tracking-wide text-white">
                  {perfume.name}
                </h2>
                <p className="font-serif text-sm italic text-neutral-400">
                  {perfume.subName}
                </p>

                {/* Scent family definition */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="rounded bg-neutral-900 px-2.5 py-1 text-xs text-neutral-400 border border-neutral-800">
                    Origine: <strong className="text-gold-400">Grasse, France</strong>
                  </span>
                  <span className="rounded bg-neutral-900 px-2.5 py-1 text-xs text-neutral-400 border border-neutral-800">
                    Intensité: <strong className="text-gold-400">{perfume.characteristics.intensity}</strong>
                  </span>
                </div>

                <div className="mt-5 border-t border-neutral-900 pt-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
                    Origine & Pyramide Olfactive
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {perfume.richDescription}
                  </p>
                </div>

                {/* Fragrance pyramid display */}
                <div className="mt-5 rounded-xl border border-neutral-900 bg-neutral-900/30 p-4 space-y-3.5">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Top notes */}
                    <div className="border-r border-neutral-800/60 pr-2">
                      <div className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">Tête (Top)</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {perfume.notes.top.map((note) => (
                          <span key={note} className="text-[10px] text-neutral-300 bg-neutral-900/60 px-1.5 py-0.5 rounded">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Heart notes */}
                    <div className="border-r border-neutral-800/60 px-2">
                      <div className="text-[10px] uppercase font-bold text-gold-500 tracking-wider">Cœur (Heart)</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {perfume.notes.heart.map((note) => (
                          <span key={note} className="text-[10px] text-neutral-300 bg-neutral-900/60 px-1.5 py-0.5 rounded">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Base notes */}
                    <div className="pl-2">
                      <div className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">Fond (Base)</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {perfume.notes.base.map((note) => (
                          <span key={note} className="text-[10px] text-neutral-300 bg-neutral-900/60 px-1.5 py-0.5 rounded">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom control row */}
              <div className="mt-6 border-t border-neutral-900 pt-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-xs text-neutral-500 uppercase tracking-widest">Contenance & Tarif</span>
                    <div className="mt-1.5 flex gap-2">
                      {perfume.sizes.map((size, idx) => (
                        <button
                          key={size.ml}
                          onClick={() => setSelectedSizeIndex(idx)}
                          className={`rounded px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                            selectedSizeIndex === idx
                              ? "bg-gold-500 text-neutral-950 font-bold"
                              : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
                          }`}
                        >
                          {size.ml}ml ( {size.price.toLocaleString("fr-FR")} DA )
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end justify-between sm:justify-end gap-4">
                    <div className="text-right">
                      <div className="text-[10px] text-neutral-500">PRIX TOTAL:</div>
                      <div className="font-mono text-2xl font-bold text-[#ECC343]">
                        {currentSize.price.toLocaleString("fr-FR")} <span className="text-sm font-sans text-neutral-400">DA</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(perfume, currentSize)}
                      className="flex h-12 items-center justify-center space-x-2 rounded-lg bg-gold-500 px-6 font-bold text-neutral-950 hover:bg-gold-400 shadow-md shadow-gold-500/10 cursor-pointer text-xs uppercase tracking-widest transition-all hover:scale-105"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Ajouter au Panier</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Reviews */}
          <div className="mt-8 border-t border-neutral-900 pt-6">
            <h3 className="font-serif text-lg font-bold text-white mb-4">Avis sur ce Parfum</h3>
            {productReviews.length === 0 ? (
              <p className="text-xs text-neutral-500 italic">Aucun avis pour l'instant. Soyez le premier à donner votre avis !</p>
            ) : (
              <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                {productReviews.map((review) => (
                  <div key={review.id} className="rounded-lg bg-neutral-900/40 border border-neutral-900 p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-neutral-300">{review.name}</span>
                        {review.verified && (
                          <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[8px] font-medium text-emerald-400">
                            Acheteur Vérifié
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono">{review.date}</span>
                    </div>
                    <div className="flex space-x-1.5 mb-2">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3 w-3 ${
                            idx < review.rating ? "text-gold-400 fill-gold-400" : "text-neutral-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
