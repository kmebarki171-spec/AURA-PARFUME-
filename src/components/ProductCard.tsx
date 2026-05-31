import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Shield, Info, ShoppingBag } from "lucide-react";
import { Perfume } from "../types";

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, selectedSize: { ml: number; price: number }) => void;
  onSelectProduct: (perfume: Perfume) => void;
}

export default function ProductCard({ perfume, onAddToCart, onSelectProduct }: ProductCardProps) {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const currentSize = perfume.sizes[selectedSizeIndex];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-950/80 p-5 transition-all duration-300 hover:border-gold-500/45 hover:shadow-xl hover:shadow-gold-500/5"
    >
      {/* Product Tag Badge */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        {perfume.isNew && (
          <span className="self-start rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 shadow-md">
            Nouveau
          </span>
        )}
        {perfume.isPopular && (
          <span className="self-start rounded-full bg-neutral-900 border border-gold-500/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-400 shadow-md">
            Best Seller
          </span>
        )}
      </div>

      {/* Authenticity Guarantee Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950/80 border border-emerald-500/30 text-emerald-400" title="Parfum Original Garanti">
          <Shield className="h-4 w-4" />
        </div>
      </div>

      {/* Product Image Stage */}
      <div className="relative mb-6 flex h-64 w-full items-center justify-center rounded-xl bg-gradient-to-b from-neutral-900 to-neutral-950 overflow-hidden px-4">
        {/* Abstract luxury backdrop halo */}
        <div className="absolute h-32 w-32 rounded-full bg-gold-500/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-gold-500/10"></div>
        
        <img
          src={perfume.image}
          alt={perfume.name}
          className="z-10 h-48 w-auto object-contain transition-all duration-500 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 group-hover:rotate-1"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick View Interactive overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            onClick={() => onSelectProduct(perfume)}
            className="flex items-center space-x-2 rounded-full bg-gold-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 transition-all hover:bg-gold-400 hover:scale-105"
          >
            <Info className="h-4 w-4" />
            <span>Découvrir le Sillage</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <div className="mb-1 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#ECC343] uppercase">
          <span>{perfume.categoryLabel}</span>
          <span className="text-neutral-500">ORIGINAL BRAND</span>
        </div>

        <h3 className="font-serif text-xl font-semibold tracking-wide text-white group-hover:text-gold-300 transition-colors">
          {perfume.name}
        </h3>
        <p className="mb-3 font-serif text-[11px] italic text-neutral-400">
          {perfume.subName}
        </p>

        <p className="mb-4 line-clamp-2 text-xs text-neutral-400 leading-relaxed">
          {perfume.description}
        </p>

        {/* Charateristics meters */}
        <div className="mb-4 border-t border-neutral-900 pt-3 space-y-1.5 text-[10px] text-neutral-500">
          <div className="flex items-center justify-between">
            <span>Sillage / Projection :</span>
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-3.5 rounded-sm ${
                    i < perfume.characteristics.sillage ? "bg-gold-400" : "bg-neutral-800"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Tenue / Longévité :</span>
            <div className="flex space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-3.5 rounded-sm ${
                    i < perfume.characteristics.longevity ? "bg-gold-400" : "bg-neutral-800"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Select ml sizes & actions */}
      <div className="mt-auto pt-3 border-t border-neutral-900">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-neutral-400">Contenance:</span>
          <div className="flex space-x-1.5">
            {perfume.sizes.map((size, idx) => (
              <button
                key={size.ml}
                onClick={() => setSelectedSizeIndex(idx)}
                className={`rounded px-2.5 py-1 text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedSizeIndex === idx
                    ? "bg-gold-500 text-neutral-950 font-bold"
                    : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
                }`}
              >
                {size.ml}ml
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-wider">Prix de l'original :</div>
            <div className="font-mono text-lg font-bold text-[#ECC343] sm:text-xl">
              {currentSize.price.toLocaleString("fr-FR")} <span className="text-xs text-neutral-400">DA</span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(perfume, currentSize)}
            className="flex h-11 items-center justify-center space-x-1.5 rounded-lg bg-neutral-900 border border-gold-500/40 px-3.5 text-xs font-semibold tracking-widest text-[#ECC343] uppercase hover:bg-gold-500 hover:text-neutral-950 transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
