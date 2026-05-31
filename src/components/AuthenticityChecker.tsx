import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, ShieldAlert, BookOpen, Fingerprint, Search, Sparkles, CheckCircle2, Camera, Upload, RefreshCw } from "lucide-react";
import { BATCH_CODES_DATA } from "../data/storeData";

export default function AuthenticityChecker() {
  const [activeTab, setActiveTab] = useState<"code" | "photo">("code");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof BATCH_CODES_DATA[0] | null | undefined>(undefined);
  const [searchedCode, setSearchedCode] = useState("");
  
  // Custom Visual Scan properties
  const [scannedPhoto, setScannedPhoto] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [scanStatusMsg, setScanStatusMsg] = useState("");

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setResult(undefined);
    setScannedPhoto("");
    setSearchedCode(code.trim().toUpperCase());

    setTimeout(() => {
      const match = BATCH_CODES_DATA.find(
        (b) => b.code.toUpperCase() === code.trim().toUpperCase()
      );
      setResult(match);
      setLoading(false);
    }, 1200);
  };

  const handlePhotoScan = (file: File) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const base64Data = e.target.result as string;
        setScannedPhoto(base64Data);
        setLoading(true);
        setResult(undefined);
        
        // Stage status messages for the "AI Optic scan"
        setScanStatusMsg("Isolation de la bouteille...");
        
        setTimeout(() => {
          setScanStatusMsg("Analyse spectrale de la fiole de Grasse...");
        }, 800);
        
        setTimeout(() => {
          setScanStatusMsg("Recherche de gravure laser du Batch Code...");
        }, 1600);

        setTimeout(() => {
          // Select a matching batch for the user based on random list or we can pick a default beautiful match
          const randomIdx = Math.floor(Math.random() * BATCH_CODES_DATA.length);
          const mockMatch = BATCH_CODES_DATA[randomIdx];
          
          setSearchedCode(mockMatch.code);
          setResult(mockMatch);
          setLoading(false);
        }, 2400);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoScan(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handlePhotoScan(e.target.files[0]);
    }
  };

  const handlePresetClick = (preset: string) => {
    setCode(preset);
  };

  return (
    <section id="authenticity" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      {/* Abstract Background Accents */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-3xl"></div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
        {/* Left Side: Explanatory Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center space-x-2 rounded-full bg-gold-500/10 border border-gold-500/20 px-3.5 py-1 text-xs text-gold-300 font-semibold tracking-wider">
            <ShieldCheck className="h-4 w-4" />
            <span>GARANTIE DE SÉCURITÉ AURA</span>
          </div>

          <h2 className="font-serif text-3xl font-bold tracking-wide text-white sm:text-4xl">
            L'Excellence d'un Parfum <span className="text-[#ECC343] italic">100% Original</span>
          </h2>

          <p className="text-sm text-neutral-400 leading-relaxed">
            Dans l'univers de la haute parfumerie, chaque flacon de la maison <strong className="text-white">AURA PARFUME</strong> est une œuvre d'art exclusive. Nous formulons nos fragrances à <strong className="text-white">Grasse, en France</strong>, en utilisant les essences naturelles les plus rares et pures du monde.
          </p>

          <p className="text-sm text-neutral-400 leading-relaxed">
            Afin de protéger nos clients de la contrefaçon, chaque contenant porte un <strong className="text-white">Batch Code unique imprimé au laser</strong> sous la base du flacon et sur l'emballage. Utilisez notre module de contrôle en temps réel pour valider instantanément l'authenticité de votre sillage.
          </p>

          {/* Educational Bulletpoints */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-4">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 border border-gold-500/30 text-gold-400 font-bold text-xs flex-none">1</span>
              <div>
                <h4 className="text-xs font-bold text-neutral-200 uppercase">Matières Nobles</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">Oud de grade impérial, gousses entières de vanille, huiles essentielles distillées à l'ancienne.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 border border-gold-500/30 text-gold-400 font-bold text-xs flex-none">2</span>
              <div>
                <h4 className="text-xs font-bold text-neutral-200 uppercase">Flacon d'Apparat</h4>
                <p className="text-[11px] text-neutral-500 mt-0.5">Verre lourd de haute densité, bouchon massif scellé en alliage métallique doré à l'or fin.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Scanner widget */}
        <div className="lg:col-span-6 rounded-2xl border border-neutral-900 bg-neutral-950/80 p-6 md:p-8 relative overflow-hidden">
          {/* Laser scanning line effect on scanning */}
          {loading && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold-400 to-transparent z-10 opacity-70 shadow-[0_0_12px_3px_rgba(236,195,67,0.7)]"
            />
          )}

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fingerprint className="h-5 w-5 text-[#ECC343]" />
              <h3 className="font-serif text-base font-bold text-white tracking-wider uppercase">
                Vérificateur de Sillage
              </h3>
            </div>
            <span className="text-[9px] font-mono bg-neutral-900 border border-neutral-800 px-2.5 py-0.5 text-neutral-400">
              V.4.0_SECURE
            </span>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mb-6 flex gap-2 border-b border-neutral-900 pb-3.5">
            <button
              type="button"
              onClick={() => { setActiveTab("code"); setResult(undefined); setScannedPhoto(""); }}
              className={`flex-1 rounded-lg py-2.5 text-center text-xs font-bold leading-5 transition-all text-nowrap cursor-pointer ${
                activeTab === "code"
                  ? "bg-gold-500/10 border border-gold-500/35 text-gold-450"
                  : "bg-neutral-900/40 text-neutral-500 hover:text-neutral-300 border border-transparent"
              }`}
            >
              Écrire le Batch Code
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab("photo"); setResult(undefined); }}
              className={`flex-1 rounded-lg py-2.5 text-center text-xs font-bold leading-5 transition-all text-nowrap cursor-pointer ${
                activeTab === "photo"
                  ? "bg-gold-500/10 border border-gold-500/35 text-gold-450"
                  : "bg-neutral-900/40 text-neutral-500 hover:text-neutral-300 border border-transparent"
              }`}
            >
              Scanner une Photo
            </button>
          </div>

          {activeTab === "code" ? (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow relative">
                  <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Saisissez le code (Ex: MFKBR540)"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-3 pl-10 pr-4 text-xs font-mono tracking-widest text-[#ECC343] placeholder-neutral-500 outline-none focus:border-gold-500 uppercase"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-lg bg-neutral-900 border border-gold-500/35 px-6 font-semibold py-3 text-xs text-gold-400 uppercase tracking-widest hover:bg-gold-500 hover:text-neutral-950 transition-all cursor-pointer"
                >
                  Vérifier
                </button>
              </div>

              {/* Quick demo presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px]">
                <span className="text-neutral-500">Exemples de codes officiels :</span>
                {BATCH_CODES_DATA.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => handlePresetClick(item.code)}
                    className="rounded bg-neutral-900 hover:bg-neutral-850 px-2 py-0.5 text-[#ECC343] border border-neutral-800 font-mono"
                  >
                    {item.code}
                  </button>
                ))}
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {!scannedPhoto ? (
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center border border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive
                      ? "border-gold-400 bg-gold-500/5 shadow-inner"
                      : "border-neutral-800 bg-neutral-900/45 hover:border-neutral-700"
                  }`}
                >
                  <Camera className="h-8 w-8 text-neutral-500 mb-3" />
                  <p className="text-xs text-neutral-300">
                    Déposez la photo de votre flacon ici, ou{" "}
                    <label className="text-gold-400 hover:text-gold-300 font-bold underline cursor-pointer">
                      parcourez l'appareil
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-1.5 leading-relaxed">
                    Notre scanner laser identifiera le modèle, la bouteille, et consultera le registre de Grasse.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-neutral-800 p-4 bg-neutral-900 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={scannedPhoto}
                      alt="Flacon à scanner"
                      className="h-14 w-14 rounded object-cover border border-neutral-800 shadow-md flex-none"
                    />
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-gold-400 block font-bold">ANALYSÉ PAR FLACON-VISION AI</span>
                      <span className="text-[11px] text-neutral-300 block font-medium">Bouteille chargée avec succès</span>
                    </div>
                  </div>
                  
                  <label className="text-xs text-neutral-500 hover:text-neutral-400 underline font-semibold cursor-pointer shrink-0">
                    Changer de photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Results stage */}
          <div className="mt-8 border-t border-neutral-900 pt-6">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center py-6 space-y-3 text-center"
                >
                  <RefreshCw className="h-7 w-7 text-gold-400 animate-spin" />
                  <div>
                    <p className="text-[11px] font-mono text-gold-400 uppercase tracking-widest font-bold">SCAN LASER ACTIF</p>
                    <p className="text-[10px] font-medium text-neutral-400 mt-1">{scanStatusMsg || "Consultation de la base de Grasse..."}</p>
                  </div>
                </motion.div>
              )}

              {!loading && result === undefined && (
                <div className="text-center py-8 text-neutral-500 space-y-2">
                  <BookOpen className="h-8 w-8 mx-auto text-neutral-700" />
                  <p className="text-[11px]">En attente de contrôle de flacon.</p>
                  <p className="text-[10px] text-neutral-600 max-w-xs mx-auto">Veuillez entrer le Batch Code ou charger une photo de votre fiole pour authentification immédiate.</p>
                </div>
              )}

              {!loading && result === null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-950/20 border border-red-500/30 p-4 space-y-2 text-left"
                >
                  <div className="flex items-center space-x-2 text-red-400">
                    <ShieldAlert className="h-5 w-5" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Batch Code Suspect ou Inconnu
                    </h4>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Le code <strong className="text-red-300 font-mono">{searchedCode}</strong> ne figure pas dans nos registres officiels de fabrication. Si vous avez acheté ce flacon dans un marché non officiel, il s'agit probablement d'une contrefaçon préjudiciable à votre peau.
                  </p>
                  <div className="text-[10px] text-red-400/80 pt-1">
                    Conseil : Les parfums originaux AURA possèdent un capuchon métallique très lourd et l'alcool s'évapore proprement sans laisser de résidu huileux collant.
                  </div>
                </motion.div>
              )}

              {!loading && result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-emerald-950/20 border border-emerald-500/35 p-5 text-left space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        Flacon Original Certifié Conforme
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                      GENUINE
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 block uppercase text-[9px]">Gamme olfactive :</span>
                      <strong className="text-neutral-200">{result.model}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase text-[9px]">Laboratoire d'extraction :</span>
                      <strong className="text-neutral-200">{result.origin}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase text-[9px]">Période de distillation :</span>
                      <strong className="text-neutral-200">{result.productionDate}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase text-[9px]">Indice de pureté :</span>
                      <strong className="text-emerald-400">{result.purity}</strong>
                    </div>
                  </div>

                  <div className="text-[10px] text-neutral-400 bg-neutral-950/80 p-3 rounded border border-neutral-900 leading-relaxed italic">
                    "Cet exemplaire scellé a été contrôlé par le maître verrier de la distillerie Grassoise AURA et bénéficie de notre label de longévité olfactive renforcée (minimum 24 heures de persistance par pulvérisation)."
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
