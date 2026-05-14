import {motion} from "framer-motion"
import { useState } from "react"
import { StarIcon, GearIcon, HeartIcon, SeatsIcon, BoltIcon, RouteIcon } from "./icons/icons";
import { apiService } from "../services/api";
const id_client = localStorage.getItem('clientDrixenvaId')
function CarCard({ car, index }) {
  function formaterDatePrecise(date) {
    const annee = date.getFullYear();
    const mois = String(date.getMonth() + 1).padStart(2, '0');
    const jour = String(date.getDate()).padStart(2, '0');
    
    return `${annee}-${mois}-${jour}`; 
}
  const [liked, setLiked] = useState(false);
  const handleReserve = async () => {
    if(id_client){
      try{
        console.log("Reserving", car)
        confirm("Voulez-vous vraiment reserver ce vehicule ?")
        const date = new Date()
        const retour = new Date(date.getTime())
        retour.setDate(retour.getDate() + 3)
        console.log("date reserve", formaterDatePrecise(date))
        console.log("data retour", formaterDatePrecise(retour))
        const vehiculeReserve = {
          date_debut:formaterDatePrecise(date),
          date_fin:formaterDatePrecise(retour),
          montant_total:car.prix_par_jour * 3,
          status:"confirmee",
          id_client:id_client,
          id_vehicule:car.id_vehicule,
          // id_user:car.id_user,
        }
        console.log(vehiculeReserve)
        const res = await apiService.createReservations(vehiculeReserve)
        console.log(res)
        const res2 = await apiService.updateVehicules(car.id_vehicule,  {marque:car.marque, modele:car.modele, carburant:car.carburant, prix_par_jour:car.prix_par_jour, status:"louer"})
        console.log(res2) 
      }
      catch(e){
        alert("Erreur lors de la reservation : " + e.message)
        console.log(e)
      }

    }
    else{
      alert("Veuillez vous connecter")
      window.location.href = '/login'
    }
    
  }

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
          ${car.status === "disponible"
            ? "bg-emerald-500/90 text-white"
            : "bg-red-600/80 text-white"}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${car.status ? "bg-white" : "bg-gray-300"}`} />
          {car.status === "disponible" ? "Disponible" : "Indisponible"}
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
            <span className="text-blue-600 font-semibold text-[13px]"></span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-blue-600 font-bold text-[22px] tracking-tight">{car.prix_par_jour}€</span>
          <span className="text-gray-400 text-[13px] font-medium">/ jour</span>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 py-3 border-t border-gray-100">
          {[
            // { icon: <SeatsIcon />, label: `${car.seats} Places` },
            { icon: <GearIcon />,  label: car.marque },
            { icon: <BoltIcon />,  label: car.carburant },
            // { icon: <RouteIcon />, label: car.range },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-gray-500 text-[12.5px] font-medium">
              <span className="text-gray-400">{icon}</span>
              {label}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-auto pt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-700 text-[13px] font-semibold hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all"
          >
            Détails
          </motion.button>
          <motion.button
            // whileHover={{ scale: 1.02 }}
            // whileTap={{ scale: 0.97 }}
            disabled={car.status === "disponible" ? false : true}
            onClick={handleReserve}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all
              ${car.status === "disponible"
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