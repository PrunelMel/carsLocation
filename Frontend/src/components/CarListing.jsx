import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CarCard from "./CarCard";
import { apiService } from "../services/api";

var CARS = [];

const FILTERS = ["Tous", "Électrique", "Sport", "Premium", "SUV", "Luxe", "Break", "Hybride"];


export default function CarListing() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [sortBy, setSortBy] = useState("default");
  const [showOnly, setShowOnly] = useState("all");
  const [cars, setCars] = useState([]);
  // const filtered = CARS
  //   .filter(c => activeFilter === "Tous" || c.tag === activeFilter)
  //   .filter(c => showOnly === "all" || (showOnly === "available" ? c.available : !c.available))
  //   .sort((a, b) => {
  //     if (sortBy === "price-asc")   return a.price - b.price;
  //     if (sortBy === "price-desc")  return b.price - a.price;
  //     if (sortBy === "rating")      return b.rating - a.rating;
  //     return a.id - b.id;
  //   });
  
  useEffect(() => {
    const fetchData = async () => {
      try{
        const cars = await apiService.getVehicules();
        setCars(cars);
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
    CARS = apiService.getVehicules();
    console.log(CARS);
    
  }, []);
  return (
    <div className="min-h-screen bg-[#f7f8fa] p-20" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        select { appearance: none; outline: none; border: none; background: transparent; cursor: pointer; }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 9px; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Header */}
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
            {cars.length} véhicule{cars.length !== 1 ? "s" : ""} trouvé{cars.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          {/* Filter pills — scrollable */}
            {/* <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200
                    ${activeFilter === f
                      ? "bg-blue-600 text-white shadow-[0_2px_12px_rgba(37,99,235,0.35)]"
                      : "bg-white text-gray-500 border border-gray-200 hover:border-blue-300 hover:text-blue-600"}`}
                >
                  {f}
                </button>
              ))}
            </div> */}

          {/* Right controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Availability */}
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2">
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

            {/* Sort */}
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
                <option value="rating">Mieux notés</option>
              </select>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {cars.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
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
              <p className="text-gray-400 text-sm">Essayez un autre filtre</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
