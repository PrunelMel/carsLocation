import {motion} from "framer-motion"
import { useState } from "react"
import { StarIcon, GearIcon, HeartIcon, SeatsIcon, BoltIcon, RouteIcon } from "./icons/icons";
function CarCard({ car, index }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={car.img}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* Dispo badge */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm
          ${car.available
            ? "bg-emerald-500/90 text-white"
            : "bg-gray-600/80 text-white"}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${car.available ? "bg-white" : "bg-gray-300"}`} />
          {car.available ? "Disponible" : "Indisponible"}
        </div>

        {/* Like */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setLiked(l => !l)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-sm"
        >
          <HeartIcon filled={liked} />
        </motion.button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">

        {/* Name + Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-slate-900 font-bold text-[15.5px] leading-tight tracking-tight">{car.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <StarIcon />
            <span className="text-blue-600 font-semibold text-[13px]">{car.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-blue-600 font-bold text-[22px] tracking-tight">{car.price}€</span>
          <span className="text-gray-400 text-[13px] font-medium">/ jour</span>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 py-3 border-t border-gray-100">
          {[
            { icon: <SeatsIcon />, label: `${car.seats} Places` },
            { icon: <GearIcon />,  label: car.transmission },
            { icon: <BoltIcon />,  label: car.energy },
            { icon: <RouteIcon />, label: car.range },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-gray-500 text-[12.5px] font-medium">
              <span className="text-gray-400">{icon}</span>
              {label}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto pt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-700 text-[13px] font-semibold hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            Détails
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            disabled={!car.available}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all
              ${car.available
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            Réserver
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CarCard;