import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Sliders, Heart, Compass, ArrowRight, RefreshCcw } from "lucide-react";
import { Perfume } from "../types";
import { PRODUCTS } from "../data/storeData";

interface ScentQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (perfume: Perfume) => void;
}

export default function ScentQuiz({ isOpen, onClose, onSelectProduct }: ScentQuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    atmosphere: "", // boisé, frais, ambre, floral
    intensity: "", // light, medium, strong
    occasion: "", // daily, night, signature
  });

  const [recommendedPerfume, setRecommendedPerfume] = useState<Perfume | null>(null);
  const [matchScore, setMatchScore] = useState(0);

  const resetQuiz = () => {
    setStep(1);
    setAnswers({ atmosphere: "", intensity: "", occasion: "" });
    setRecommendedPerfume(null);
    setMatchScore(0);
  };

  const handleSelectAtmosphere = (value: string) => {
    setAnswers({ ...answers, atmosphere: value });
    setStep(2);
  };

  const handleSelectIntensity = (value: string) => {
    setAnswers({ ...answers, intensity: value });
    setStep(3);
  };

  const handleSelectOccasion = (value: string) => {
    const updatedAnswers = { ...answers, occasion: value };
    setAnswers(updatedAnswers);
    calculateRecommendation(updatedAnswers);
  };

  const calculateRecommendation = (finalAnswers: typeof answers) => {
    // Advanced heuristics to match our 7 premium fragrances
    let matchId = "creed-aventus";
    let score = 98;

    const { atmosphere, intensity, occasion } = finalAnswers;

    if (atmosphere === "frais") {
      if (intensity === "strong" || occasion === "night") {
        matchId = "creed-aventus";
        score = 99;
      } else {
        matchId = "lv-imagination";
        score = 97;
      }
    } else if (atmosphere === "floral") {
      matchId = "baccarat-rouge-540";
      score = 98;
    } else if (atmosphere === "ambre") {
      if (intensity === "strong" || occasion === "night") {
        matchId = "lv-ombre-nomade";
        score = 99;
      } else {
        matchId = "tf-tobacco-vanille";
        score = 96;
      }
    } else {
      // wood/boisé
      if (intensity === "strong" || occasion === "signature") {
        matchId = "creed-royal-oud";
        score = 98;
      } else {
        matchId = "tf-oud-wood";
        score = 95;
      }
    }

    const matched = PRODUCTS.find((p) => p.id === matchId) || PRODUCTS[0];
    setRecommendedPerfume(matched);
    setMatchScore(score);
    setStep(4);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/92 backdrop-blur-md"
          />

          {/* Dialog Card container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-gold-500/25 bg-neutral-950 p-6 shadow-2xl md:p-8"
          >
            {/* Header close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-neutral-900 bg-neutral-950 text-neutral-400 hover:text-gold-400 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Steps graphics */}
            {step < 4 && (
              <div className="mb-6 flex gap-1.5 items-center justify-center">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-sm transition-all duration-300 ${
                      s <= step ? "bg-gold-400" : "bg-neutral-900"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Quiz content */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-3">
                      <Compass className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold tracking-wide text-white">
                      Diagnostic Olfactif Aura
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Étape 1 sur 3 : Quel univers aromatique vous correspond le mieux ?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[
                      {
                        val: "boisé",
                        label: "Boisé Profond & Cuiré",
                        desc: "Forêts humides, feu de bois, feuilles de cèdre et cuir noble.",
                      },
                      {
                        val: "frais",
                        label: "Chaleur Radiante & Agrumes",
                        desc: "Sable chaud, zeste d'agrumes méditerranéens et soleil pur.",
                      },
                      {
                        val: "ambre",
                        label: "Ambre Oriental & Épices",
                        desc: "Volutes d'encens sacré, cannelle riche et bois d'oud d'exception.",
                      },
                      {
                        val: "floral",
                        label: "Floral Poudré & Gourmand",
                        desc: "Pétales sauvages, caramel velouté et gousse de vanille royale.",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectAtmosphere(opt.val)}
                        className="text-left rounded-xl border border-neutral-900 bg-neutral-900/40 p-4 hover:border-gold-500/50 hover:bg-neutral-900 transition-all cursor-pointer"
                      >
                        <span className="block font-serif text-sm font-semibold tracking-wide text-white">
                          {opt.label}
                        </span>
                        <span className="block text-[11px] text-neutral-400 mt-1 leading-relaxed">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-3">
                      <Sliders className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold tracking-wide text-white">
                      Intensité du Sillage
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Étape 2 sur 3 : Quel degré de puissance et de présence recherchez-vous ?
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        val: "light",
                        label: "Légère & Intime",
                        desc: "Pour une empreinte discrète mais sophistiquée, perceptible de près.",
                      },
                      {
                        val: "medium",
                        label: "Présence Solennelle (Ambiante)",
                        desc: "Pour un compromis équilibré entre sillage remarqué et élégance de bureau.",
                      },
                      {
                        val: "strong",
                        label: "Absolue & Souveraine (Majestueuse)",
                        desc: "Un sillage royal et dominateur, qui s'impose et rayonne longuement.",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectIntensity(opt.val)}
                        className="w-full text-left rounded-xl border border-neutral-900 bg-neutral-900/40 p-4 hover:border-gold-500/50 hover:bg-neutral-900 transition-all cursor-pointer"
                      >
                        <span className="block font-serif text-sm font-semibold tracking-wide text-white">
                          {opt.label}
                        </span>
                        <span className="block text-[11px] text-neutral-400 mt-1">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="text-center">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 mb-3">
                      <Heart className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-xl font-bold tracking-wide text-white">
                      Occasion d'Usage
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Étape 3 sur 3 : Dans quel contexte principal porterez-vous cette œuvre ?
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      {
                        val: "daily",
                        label: "Quotidien professionnel ou Signature active",
                        desc: "Pour s'habiller d'une prestance affirmée lors de vos réunions journalières.",
                      },
                      {
                        val: "night",
                        label: "Soirées d'apparat & Réceptions",
                        desc: "Pour attirer les éloges et compliments lors des grandes réceptions de prestige.",
                      },
                      {
                        val: "signature",
                        label: "Cadeau de haute valeur ou Évènement historique",
                        desc: "L'excellence suprême pour commémorer un moment intemporel.",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOccasion(opt.val)}
                        className="w-full text-left rounded-xl border border-neutral-900 bg-neutral-900/40 p-4 hover:border-gold-500/50 hover:bg-neutral-900 transition-all cursor-pointer"
                      >
                        <span className="block font-serif text-sm font-semibold tracking-wide text-white">
                          {opt.label}
                        </span>
                        <span className="block text-[11px] text-neutral-400 mt-1">
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && recommendedPerfume && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5 text-center"
                >
                  <div>
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-[13px] tracking-[0.2em] uppercase text-emerald-400 font-bold">
                      Accord Parfait Établi ({matchScore}%)
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Les maîtres parfumeurs ont identifié votre sillage idéal :
                    </p>
                  </div>

                  {/* Recommendation Card */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl border border-gold-500/20 bg-neutral-900/30 p-5 text-left">
                    {/* Bottle thumbnail */}
                    <div className="h-28 w-28 bg-neutral-950 rounded-xl p-2 flex items-center justify-center flex-none">
                      <img
                        src={recommendedPerfume.image}
                        alt={recommendedPerfume.name}
                        className="h-24 w-auto object-contain filter drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-2">
                      <span className="font-mono text-[9px] tracking-widest bg-gold-500/10 text-gold-400 px-2 py-0.5 rounded border border-gold-500/20 uppercase font-semibold">
                        {recommendedPerfume.categoryLabel}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white leading-none">
                        {recommendedPerfume.name}
                      </h4>
                      <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                        {recommendedPerfume.description}
                      </p>
                      
                      <div className="pt-2 flex flex-wrap gap-1">
                        {recommendedPerfume.notes.top.slice(0, 2).map((n) => (
                          <span key={n} className="text-[9px] text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded font-mono">
                            {n}
                          </span>
                        ))}
                        <span className="text-[9px] text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded font-mono">
                          ...et plus
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    <button
                      onClick={resetQuiz}
                      className="w-full sm:w-1/3 flex items-center justify-center space-x-1.5 rounded-lg border border-neutral-800 bg-neutral-900 text-xs font-semibold text-neutral-400 py-3 hover:text-white"
                    >
                      <RefreshCcw className="h-3.5 w-3.5" />
                      <span>Refaire</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectProduct(recommendedPerfume);
                        onClose();
                      }}
                      className="flex-grow flex items-center justify-center space-x-1.5 rounded-lg bg-gold-400 text-xs font-bold uppercase tracking-wider text-neutral-950 py-3 hover:bg-gold-300"
                    >
                      <span>Examiner le flacon</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
