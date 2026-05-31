import React, { useState } from "react";
import { Star, MessageSquare, Check, Plus, Filter, Upload, X, Image as ImageIcon } from "lucide-react";
import { Review } from "../types";
import { PRODUCTS } from "../data/storeData";

interface ReviewsProps {
  reviews: Review[];
  onAddReview: (perfumeId: string, name: string, rating: number, comment: string, image?: string) => void;
}

export default function Reviews({ reviews, onAddReview }: ReviewsProps) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    perfumeId: PRODUCTS[0].id,
    name: "",
    rating: 5,
    comment: "",
  });

  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [dragActive, setDragActive] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleImageFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
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
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage("");
  };

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === "all") return true;
    return r.perfumeId === selectedFilter;
  });

  // Calculate metrics
  const totalReviews = filteredReviews.length;
  const averageRating = totalReviews > 0 
    ? (filteredReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";

  // Counts of stars
  const starCounts = [0, 0, 0, 0, 0]; // index 0 = 1 star, up to index 4 = 5 star
  filteredReviews.forEach((r) => {
    const starIdx = Math.max(1, Math.min(5, r.rating)) - 1;
    starCounts[starIdx]++;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    onAddReview(formData.perfumeId, formData.name, formData.rating, formData.comment, uploadedImage || undefined);
    setFormSuccess(true);
    setFormData({
      perfumeId: PRODUCTS[0].id,
      name: "",
      rating: 5,
      comment: "",
    });
    setUploadedImage("");

    setTimeout(() => {
      setFormSuccess(false);
      setIsFormOpen(false);
    }, 2000);
  };

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-neutral-900">
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="font-serif text-3xl font-bold tracking-wide text-white sm:text-4xl">
          Les Avis de Nos <span className="text-[#ECC343] italic">Privilégiés</span>
        </h2>
        <p className="text-xs text-neutral-400 max-w-lg mx-auto">
          Découvrez les retours honnêtes de notre aimable clientèle en Algérie concernant la longévité de nos sillages, nos délais de livraison et l'authenticité de nos flacons d'origine.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Metric Summary card - Col-4 */}
        <div className="lg:col-span-4 rounded-xl border border-neutral-900 bg-neutral-950/70 p-6 self-start space-y-6">
          <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
            Vue d'Ensemble
          </h3>

          <div className="flex items-baseline space-x-3">
            <span className="font-serif text-5xl font-extrabold text-[#ECC343]">{averageRating}</span>
            <div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4.5 w-4.5 ${
                      i < Math.round(Number(averageRating))
                        ? "text-gold-400 fill-gold-400"
                        : "text-neutral-800"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500 block mt-1">Sur base de ( {totalReviews} ) avis avisés</span>
            </div>
          </div>

          {/* Progress bar breakdowns */}
          <div className="space-y-2 pt-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starCounts[stars - 1] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center text-xs text-neutral-400 gap-3">
                  <span className="w-12 font-mono flex items-center gap-1 shrink-0">
                    {stars} <Star className="h-3 w-3 text-gold-400 fill-gold-400" />
                  </span>
                  <div className="flex-grow h-2 rounded bg-neutral-900 overflow-hidden">
                    <div
                      className="bg-gold-500 h-full rounded transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right text-[10px] font-mono text-neutral-500">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            {!isFormOpen ? (
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full flex items-center justify-center space-x-2 rounded-lg border border-gold-500/30 bg-gold-500/10 py-3.5 text-xs font-bold uppercase tracking-widest text-gold-300 hover:bg-gold-500 hover:text-neutral-950 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Rédiger un avis</span>
              </button>
            ) : (
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-full text-center text-xs text-neutral-500 hover:text-neutral-400 underline"
              >
                Annuler
              </button>
            )}
          </div>
        </div>

        {/* List of Reviews & Interactive filters - Col-8 */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active reviews filter row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-900 pb-4">
            <div className="flex items-center space-x-2 text-neutral-400 text-xs">
              <Filter className="h-4 w-4 text-gold-400" />
              <span>Filtrer par Sillage :</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedFilter("all")}
                className={`rounded-full px-3 py-1 text-xs cursor-pointer transition-colors ${
                  selectedFilter === "all"
                    ? "bg-gold-500 text-neutral-950 font-bold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white"
                }`}
              >
                Tous les avis
              </button>
              {PRODUCTS.map((prod) => (
                <button
                  key={prod.id}
                  onClick={() => setSelectedFilter(prod.id)}
                  className={`rounded-full px-3 py-1 text-xs cursor-pointer transition-colors ${
                    selectedFilter === prod.id
                      ? "bg-gold-500 text-neutral-950 font-bold"
                      : "bg-neutral-900 text-neutral-400 hover:text-white"
                  }`}
                >
                  {prod.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form input details container */}
          {isFormOpen && (
            <div className="rounded-xl border border-gold-500/25 bg-neutral-950 p-5 space-y-4">
              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
                Exprimez Votre Expérience Olfactive
              </h4>

              {formSuccess ? (
                <div className="flex flex-col items-center justify-center p-6 text-center text-emerald-400 space-y-1.5">
                  <Check className="h-8 w-8 bg-emerald-500/10 p-1.5 border border-emerald-500/20 rounded-full" />
                  <p className="text-xs font-bold uppercase tracking-wider">Votre avis a été certifié d'origine !</p>
                  <p className="text-[10px] text-neutral-500">Merci de faire partie de la maison AURA.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-neutral-400 uppercase mb-1" htmlFor="input-name">
                        Votre Nom / Pseudonyme *
                      </label>
                      <input
                        id="input-name"
                        type="text"
                        required
                        placeholder="Ex: Sonia M."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded bg-neutral-900 border border-neutral-800 p-2 text-xs text-white outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-neutral-400 uppercase mb-1" htmlFor="input-fragrance">
                        Fragrance Essayée *
                      </label>
                      <select
                        id="input-fragrance"
                        value={formData.perfumeId}
                        onChange={(e) => setFormData({ ...formData, perfumeId: e.target.value })}
                        className="w-full rounded bg-neutral-900 border border-neutral-800 p-2 text-xs text-neutral-300 outline-none focus:border-gold-500 cursor-pointer"
                      >
                        {PRODUCTS.map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 uppercase mb-1.5">
                      Note Globale (Étoiles)
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="focus:outline-none shrink-0"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= formData.rating
                                ? "text-gold-400 fill-gold-400"
                                : "text-neutral-800 hover:text-neutral-700"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 uppercase mb-1" htmlFor="input-comment">
                      Votre Témoignage Olfactif *
                    </label>
                    <textarea
                      id="input-comment"
                      required
                      rows={3}
                      placeholder="Commentaires sur la tenue, l'évolution des notes sur votre peau, sillage..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full rounded bg-neutral-900 border border-neutral-800 p-2.5 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  {/* Drag-and-drop Image Upload */}
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-400 uppercase mb-1.5">
                      Ajouter une photo du flacon (Optionnel)
                    </label>

                    {!uploadedImage ? (
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`flex flex-col items-center justify-center border border-dashed rounded-lg p-5 text-center transition-all ${
                          dragActive
                            ? "border-gold-450 bg-gold-500/5"
                            : "border-neutral-800 bg-neutral-900/40 hover:border-neutral-700"
                        }`}
                      >
                        <Upload className="h-6 w-6 text-neutral-500 mb-2" />
                        <p className="text-xs text-neutral-300">
                          Glissez votre photo ici ou{" "}
                          <label className="text-gold-400 hover:text-gold-300 font-semibold underline cursor-pointer">
                            choisissez un fichier
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileInput}
                              className="hidden"
                            />
                          </label>
                        </p>
                        <p className="text-[10px] text-neutral-500 mt-1">PNG, JPG, JPEG (max 5 MB)</p>
                      </div>
                    ) : (
                      <div className="relative rounded-lg border border-neutral-800 p-2 bg-neutral-900 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={uploadedImage}
                            alt="Aperçu parfum"
                            className="h-10 w-10 rounded object-cover border border-neutral-800"
                          />
                          <div>
                            <span className="text-[9px] font-mono text-emerald-400 block font-bold">PHOTO PRÊTE À L'ENVOI</span>
                            <span className="text-[10px] text-neutral-400 block">Exemplaire vérifié</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeUploadedImage}
                          className="p-1 px-2.5 rounded bg-neutral-800 hover:bg-red-950/20 border border-neutral-700 hover:border-red-500/30 text-neutral-400 hover:text-red-400 transition-colors text-[10px] font-bold"
                        >
                          Retirer
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-gold-400 py-3 text-xs font-bold uppercase tracking-wider text-neutral-950 hover:bg-gold-300 transition-colors cursor-pointer"
                  >
                    Soumettre Mon Expérience
                  </button>
                </form>
              )}
            </div>
          )}

          {/* List display */}
          <div className="space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="text-center py-10 rounded-lg bg-neutral-900/10 border border-dashed border-neutral-900">
                <p className="text-xs text-neutral-500 italic">Aucun avis publié pour ce produit.</p>
              </div>
            ) : (
              filteredReviews.map((review) => {
                const perfumeMatched = PRODUCTS.find((p) => p.id === review.perfumeId);
                return (
                  <div key={review.id} className="rounded-xl border border-neutral-900 bg-neutral-900/20 p-5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <span className="font-serif text-sm font-bold text-white">{review.name}</span>
                        {review.verified && (
                          <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[8px] font-semibold text-emerald-400 uppercase">
                            Flacon Garanti
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-mono text-neutral-500">{review.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < review.rating ? "text-gold-400 fill-gold-400" : "text-neutral-800"
                            }`}
                          />
                        ))}
                      </div>

                      {perfumeMatched && (
                        <span className="text-[10px] font-mono text-gold-400/80 bg-gold-500/5 px-2 py-0.5 rounded border border-gold-500/15">
                          Sillage : {perfumeMatched.name}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-1">
                      <div className={`${review.image ? "md:col-span-10" : "md:col-span-12"}`}>
                        <p className="text-xs text-neutral-300 leading-relaxed italic pr-4">
                          "{review.comment}"
                        </p>
                      </div>
                      {review.image && (
                        <div className="md:col-span-2 grow-0 self-center">
                          <div className="group relative rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 p-1 max-w-[120px]">
                            <img
                              src={review.image}
                              alt="Photo de la fragrance"
                              className="h-16 w-full object-contain rounded transition-all duration-300 group-hover:scale-110 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
