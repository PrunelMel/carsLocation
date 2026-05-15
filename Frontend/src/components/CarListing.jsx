import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "./CarCard";
import { apiService } from "../services/api";

// Filtres par carburant — construits à partir des vraies données API
// On garde une liste fixe de pills connues + "Tous"
const CARBURANT_FILTERS = ["Tous", "Essence", "Diesel", "Électrique", "Hybride"];

export default function CarListing() {
  const [cars, setCars]             = useState([]);
  const [loading, setLoading]       = useState(true);

  // Filtres
  const [activeFilter, setActiveFilter] = useState("Tous");   // carburant
  const [showOnly, setShowOnly]         = useState("all");     // disponibilité
  const [sortBy, setSortBy]             = useState("default"); // tri prix

  // ── Fetch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getVehicules();
        setCars(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ── Logique de filtrage + tri (mémoïsée) ─────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...cars];

    // 1. Filtre carburant
    if (activeFilter !== "Tous") {
      result = result.filter(
        c => c.carburant?.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // 2. Filtre disponibilité
    if (showOnly === "available") {
      result = result.filter(c => c.status === "disponible");
    } else if (showOnly === "unavailable") {
      result = result.filter(c => c.status !== "disponible");
    }

    // 3. Tri
    if (sortBy === "price-asc")  result.sort((a, b) => a.prix_par_jour - b.prix_par_jour);
    if (sortBy === "price-desc") result.sort((a, b) => b.prix_par_jour - a.prix_par_jour);

    return result;
  }, [cars, activeFilter, showOnly, sortBy]);

  function countCarburant(label) {
    if (label === "Tous") return cars.length;
    return cars.filter(c => c.carburant?.toLowerCase() === label.toLowerCase()).length;
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        select { appearance: none; outline: none; border: none; background: transparent; cursor: pointer; }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 9px; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <h1 className="text-slate-900 font-bold text-4xl tracking-tight mb-2">
            Nos véhicules <span className="text-blue-600">disponibles</span>
          </h1>
          <p className="text-gray-400 text-[15px]">
            {filtered.length} véhicule{filtered.length !== 1 ? "s" : ""} trouvé{filtered.length !== 1 ? "s" : ""}
            {filtered.length !== cars.length && (
              <span className="ml-1 text-gray-300">/ {cars.length} au total</span>
            )}
          </p>
        </motion.div>

        {/* ── Controls ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 mb-8"
        >
          {/* Pills carburant */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CARBURANT_FILTERS.map(f => {
              const count = countCarburant(f);
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.35)]"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {f}
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                    active ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selects disponibilité + tri */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Disponibilité */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>
              </svg>
              <select
                value={showOnly}
                onChange={e => setShowOnly(e.target.value)}
                className="text-[13px] font-medium text-gray-600"
              >
                <option value="all">Tous les statuts</option>
                <option value="available">Disponibles</option>
                <option value="unavailable">Indisponibles</option>
              </select>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </div>

            {/* Tri */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="text-[13px] font-medium text-gray-600"
              >
                <option value="default">Tri par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </div>

            {/* Réinitialiser — visible seulement si un filtre est actif */}
            {(activeFilter !== "Tous" || showOnly !== "all" || sortBy !== "default") && (
              <button
                onClick={() => { setActiveFilter("Tous"); setShowOnly("all"); setSortBy("default"); }}
                className="text-[13px] font-medium text-red-400 hover:text-red-600 transition-colors px-3 py-2 bg-red-50 rounded-xl border border-red-100"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Grille ── */}
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center py-24 text-gray-400 text-sm gap-2"
            >
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Chargement des véhicules…
            </motion.div>
          ) : filtered.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((car, i) => (
                <CarCard key={car.id_vehicule} car={car} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <p className="text-gray-500 font-semibold text-lg mb-1">Aucun véhicule trouvé</p>
              <p className="text-gray-400 text-sm mb-4">Essayez un autre filtre</p>
              <button
                onClick={() => { setActiveFilter("Tous"); setShowOnly("all"); setSortBy("default"); }}
                className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Voir tous les véhicules
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}