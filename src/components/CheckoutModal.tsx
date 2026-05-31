import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, Mail, MapPin, Phone, User, Landmark, ShoppingBag, Truck, Gift } from "lucide-react";
import { CartItem, Wilaya } from "../types";
import { WILAYAS } from "../data/storeData";

interface CheckoutModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onClearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  cartItems,
  onClose,
  onClearCart,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    wilayaId: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedSize.price * item.quantity,
    0
  );

  const selectedWilaya = WILAYAS.find((w) => w.id === Number(formData.wilayaId));
  const shippingFee = selectedWilaya ? selectedWilaya.shippingFee : 0;
  const grandTotal = subtotal + shippingFee;

  // Validation
  const isValid =
    formData.fullName.trim().length >= 4 &&
    formData.phoneNumber.trim().length >= 9 &&
    formData.address.trim().length >= 8 &&
    formData.wilayaId !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);

    // Simulate luxury order dispatch with Algerian timeline constraints
    setTimeout(() => {
      const generatedCode = `AURA-${Math.floor(1000 + Math.random() * 9000)}-${formData.wilayaId}`;
      setOrderId(generatedCode);
      setLoading(false);
      setSuccess(true);
    }, 2200);
  };

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={!success && !loading ? onClose : undefined}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-gold-500/20 bg-neutral-950 p-6 shadow-2xl md:p-8"
          >
            {/* Close */}
            {!success && !loading && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900 bg-neutral-950 text-neutral-400 hover:text-gold-400 focus:outline-none cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            {!success ? (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left side: Checkout Form */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold tracking-wide text-white">
                      Finaliser Votre Commande
                    </h2>
                    <p className="text-xs text-[#ECC343] tracking-wide mt-1 uppercase font-semibold">
                      Paiement Cache à la Livraison (COD)
                    </p>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                      <div className="relative flex h-14 w-14 items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-2 border-gold-500/20 border-t-gold-400 animate-spin"></div>
                        <ShoppingBag className="h-5 w-5 text-gold-400" />
                      </div>
                      <p className="text-xs text-neutral-400 animate-pulse text-center leading-relaxed">
                        Validation de la commande...<br />
                        <span className="text-[10px] text-gold-500 font-mono">Emballage d'origine scellé sous contrôle</span>
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5" htmlFor="field-fullname">
                          Nom Complet (Nom & Prénom) *
                        </label>
                        <div className="relative">
                          <User className="absolute top-3.5 left-3.5 h-4 w-4 text-neutral-500" />
                          <input
                            id="field-fullname"
                            type="text"
                            required
                            placeholder="Ex: Mohamed Benali"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none focus:border-gold-500 font-serif"
                          />
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5" htmlFor="field-phone">
                          Numéro de Téléphone Mobile *
                        </label>
                        <div className="relative">
                          <Phone className="absolute top-3.5 left-3.5 h-4 w-4 text-neutral-500" />
                          <input
                            id="field-phone"
                            type="tel"
                            required
                            placeholder="Ex: 0550 12 34 56 ou 0661..."
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-3 pl-10 pr-4 text-sm font-mono text-white placeholder-neutral-500 outline-none focus:border-gold-500"
                          />
                        </div>
                      </div>

                      {/* Wilaya Selection */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5" htmlFor="field-wilaya">
                          Wilaya de Destination *
                        </label>
                        <div className="relative">
                          <Landmark className="absolute top-3.5 left-3.5 h-4 w-4 text-neutral-500" />
                          <select
                            id="field-wilaya"
                            required
                            value={formData.wilayaId}
                            onChange={(e) => setFormData({ ...formData, wilayaId: e.target.value })}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-3 pl-10 pr-4 text-sm text-neutral-300 outline-none focus:border-gold-500 cursor-pointer appearance-none"
                          >
                            <option value="">Sélectionnez votre Wilaya</option>
                            {WILAYAS.map((wilaya) => (
                              <option key={wilaya.id} value={wilaya.id}>
                                {wilaya.code} - {wilaya.name} ({wilaya.arabicName}) | +{wilaya.shippingFee} DA
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Full Address */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5" htmlFor="field-address">
                          Adresse de Livraison Précise *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute top-3.5 left-3.5 h-4 w-4 text-neutral-500" />
                          <input
                            id="field-address"
                            required
                            placeholder="Ex: Cité 500 logements, Batiment B4, N°12, Alger-Centre"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 py-3 pl-10 pr-4 text-sm text-white placeholder-neutral-500 outline-none focus:border-gold-500"
                          />
                        </div>
                      </div>

                      {/* Additional notes/requests */}
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5" htmlFor="field-notes">
                          Notes Additionnelles (Optionnel)
                        </label>
                        <textarea
                          id="field-notes"
                          rows={2}
                          placeholder="Ex: Appelez de préférence avant 14h, ou précisions sur l'emballage..."
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="w-full rounded-lg border border-neutral-800 bg-neutral-900/60 p-3 text-sm text-white placeholder-neutral-500 outline-none focus:border-gold-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!isValid}
                        className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg ${
                          isValid
                            ? "bg-[#ECC343] text-neutral-950 hover:bg-gold-400 hover:scale-[1.01]"
                            : "bg-neutral-900 text-neutral-500 cursor-not-allowed border border-neutral-800"
                        }`}
                      >
                        Confirmer Ma Commande - {grandTotal.toLocaleString("fr-FR")} DA
                      </button>
                    </form>
                  )}
                </div>

                {/* Right side: Receipt Summary */}
                <div className="lg:col-span-5 rounded-xl border border-neutral-900 bg-neutral-900/30 p-5 self-start">
                  <h3 className="font-serif text-sm font-semibold text-white tracking-wider border-b border-neutral-900 pb-3">
                    Votre Panier d'Origine
                  </h3>

                  <div className="mt-4 space-y-3 divide-y divide-neutral-950">
                    {cartItems.map((item) => (
                      <div key={`${item.perfume.id}-${item.selectedSize.ml}`} className="flex items-center justify-between pt-3 first:pt-0">
                        <div className="flex items-center space-x-3">
                          <div className="flex-none h-10 w-10 flex items-center justify-center rounded bg-neutral-950">
                            <img
                              src={item.perfume.image}
                              alt={item.perfume.name}
                              className="h-8 w-auto object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-white">{item.perfume.name}</p>
                            <p className="text-[10px] text-neutral-500 font-mono">
                              {item.selectedSize.ml}ml × {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-mono font-bold text-[#ECC343]">
                          {(item.selectedSize.price * item.quantity).toLocaleString("fr-FR")} DA
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Totals calculations */}
                  <div className="mt-5 border-t border-neutral-900 pt-4 space-y-2.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Sous-total flacons :</span>
                      <span className="font-mono text-neutral-300">{subtotal.toLocaleString("fr-FR")} DA</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5 text-gold-400" /> Livré à domicile :
                      </span>
                      <span className="font-mono text-neutral-300">
                        {selectedWilaya ? `${shippingFee.toLocaleString("fr-FR")} DA` : "Sélectionnez Wilaya"}
                      </span>
                    </div>

                    <div className="flex justify-between text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Gift className="h-3.5 w-3.5 text-yellow-500" /> Échantillon d'origine :
                      </span>
                      <span className="text-emerald-400 font-semibold uppercase text-[9px] bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        Offert (Gratuit)
                      </span>
                    </div>

                    <div className="pt-3.5 border-t border-neutral-900 flex justify-between items-end">
                      <span className="text-neutral-300 font-bold">TOTAL À S'ACQUITTER :</span>
                      <span className="font-mono text-base font-bold text-[#ECC343]">
                        {grandTotal.toLocaleString("fr-FR")} DA
                      </span>
                    </div>
                  </div>

                  {/* Safety guarantees list inside card */}
                  <div className="mt-6 border-t border-neutral-900 pt-4 space-y-2.5 text-[10px] text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-none" />
                      <span>Aucun paiement préalable : vous réglez à la livraison</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 flex-none" />
                      <span>Droit d'examiner l'authenticité de l'emballage à réception</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Success screen representing Algerian checkout verification flow */
              <div className="flex flex-col items-center justify-center text-center py-10 space-y-6">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10">
                  <ShieldCheck className="h-10 w-10 text-emerald-400" />
                  <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping"></div>
                </div>

                <div className="max-w-md space-y-2.5">
                  <h2 className="font-serif text-2xl font-bold tracking-wide text-white">
                    Félicitations pour Votre Achat !
                  </h2>
                  <p className="text-xs text-[#ECC343] font-mono tracking-widest uppercase">
                    Commande validée : {orderId}
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Cher(e) <strong className="text-white">{formData.fullName}</strong>, votre commande pour un parfum original <strong>AURA</strong> a bien été enregistrée.
                  </p>
                </div>

                <div className="w-full max-w-md rounded-xl border border-neutral-900 bg-neutral-900/40 p-5 space-y-4 text-left text-xs text-neutral-400">
                  <h4 className="text-neutral-200 font-bold flex items-center gap-1.5 border-b border-neutral-950 pb-2">
                    <Truck className="h-4 w-4 text-gold-400" /> Informations de transport & livraison
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      • <strong>Lieu de livraison :</strong> Wilaya de {selectedWilaya?.name} ({selectedWilaya?.arabicName}), {formData.address}
                    </li>
                    <li>
                      • <strong>Délai estimé :</strong> 24h à 48h (Jusqu'à 72h max pour les wilayas du Sud).
                    </li>
                    <li>
                      • <strong>Confirmation Téléphonique obligatoire :</strong> Un conseiller clientèle de la maison AURA va vous appeler sur le <strong className="text-white font-mono">{formData.phoneNumber}</strong> d'ici 2 heures pour valider verbalement votre adresse avant expédition.
                    </li>
                    <li>
                      • <strong>Total dû à la livraison :</strong> <strong className="text-[#ECC343] font-mono">{grandTotal.toLocaleString("fr-FR")} DA</strong> (Frais de port inclus).
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleFinish}
                  className="rounded-full bg-gold-400 px-8 py-3 text-xs font-bold uppercase tracking-widest text-neutral-950 transition-all hover:bg-gold-300 hover:scale-105 shadow-md shadow-gold-500/20 cursor-pointer"
                >
                  Fermer & Retour à la Boutique
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
