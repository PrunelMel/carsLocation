import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  X, Calendar, CheckCircle2, AlertCircle, Loader,
  Fuel, Car, Tag, Clock, ArrowRight,
} from "lucide-react";
import { StarIcon, GearIcon, HeartIcon, BoltIcon } from "./icons/icons";
import { apiService } from "../services/api";


const STATUS_STYLE = {
  disponible:  { label: "Disponible",   cls: "bg-emerald-100 text-emerald-700" },
  louer:       { label: "Loué",         cls: "bg-blue-100 text-blue-700"       },
  maintenance: { label: "Maintenance",  cls: "bg-red-100 text-red-700"         },
};

function DetailsModal({ car, onClose, onReserver }) {
  const st = STATUS_STYLE[car.status] 
  const disponible = car.status === "disponible";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose();{/*Juste pour le fun :) */} }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {car.img
            ? <img src={car.img} alt={`${car.marque} ${car.modele}`} className="w-full h-full object-cover" />
            : <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                <Car size={48} className="text-slate-300" />
              </div>
          }
          {/* Badge statut sur l'image */}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${st.cls}`}>
            {st.label}
          </span>
          {/* Bouton fermer(la croix)*/}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:text-red-500  transition-colors shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 space-y-5">
          {/* Titre + prix */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-800 text-xl leading-tight">
                {car.marque} {car.modele}
              </h2>
            </div>
            <div className="text-right shrink-0">
              <p className="text-blue-600 font-bold text-2xl">{car.prix_par_jour} DH</p>
              <p className="text-slate-400 text-xs">par jour</p>
            </div>
          </div>

          {/* Informations du vehicule du vehicule */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
              <Fuel size={16} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-slate-400 text-[11px] uppercase font-semibold">Carburant</p>
                <p className="text-slate-700 text-sm font-semibold">{car.carburant}</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
              <Tag size={16} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-slate-400 text-[11px] uppercase font-semibold">Marque</p>
                <p className="text-slate-700 text-sm font-semibold">{car.marque}</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
              <Car size={16} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-slate-400 text-[11px] uppercase font-semibold">Modèle</p>
                <p className="text-slate-700 text-sm font-semibold">{car.modele}</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-2">
              <Clock size={16} className="text-blue-500 shrink-0" />
              <div>
                <p className="text-slate-400 text-[11px] uppercase font-semibold">Statut</p>
                <p className={`text-sm font-semibold ${disponible ? "text-emerald-600" : "text-red-500"}`}>
                  {st.label}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => {//onClose ferme d'abord la carte detail
                 onClose();onReserver(); }}
              disabled={!disponible}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                disponible
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Réserver
              {disponible && <ArrowRight size={15} />}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


function ReservationModal({ car, onClose }) {
  const idClient = localStorage.getItem("idClient");
  const today    = new Date().toISOString().split("T")[0];

  const [form, setForm]       = useState({ date_debut: today, date_fin: "" });
  const [etat, setEtat]       = useState("idle");
  const [message, setMessage] = useState("");

  function calcJours() {
    if (!form.date_debut || !form.date_fin) return 0;
    const d = Math.round((new Date(form.date_fin) - new Date(form.date_debut)) / 86400000);
    return d > 0 ? d : 0;
  }

  const jours   = calcJours();
  const montant = +(jours * car.prix_par_jour).toFixed(2);

  async function handleReserver() {
    if (!idClient) {
      setEtat("error");
      setMessage("Vous devez être connecté pour réserver.");
      return;
    }
    if (!form.date_debut || !form.date_fin || jours <= 0) {
      setEtat("error");
      setMessage("Veuillez sélectionner des dates valides.");
      return;
    }

    setEtat("loading");
    setMessage("");

    try {
      const utilisateurs = await apiService.getUtilisateur();
      const agent = utilisateurs[0];
      if (!agent) {
        setEtat("error");
        setMessage("Aucun agent trouvé. Contactez l'agence.");
        return;
      }

      await apiService.createReservations({
        date_debut:       form.date_debut,
        date_fin:         form.date_fin,
        date_reservation: today,
        montant_total:    montant,
        status:           "en_attente",
        id_client:        idClient,
        id_vehicule:      car.id_vehicule,
        id_user:          agent.id_user,
      });

      setEtat("success");
      setMessage("Votre réservation a bien été envoyée !");
    } catch (e) {
      setEtat("error");
      setMessage(e.message ?? "Une erreur est survenue. Réessayez.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        exit={{    opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-800 text-lg leading-tight">Réserver ce véhicule</h2>
            <p className="text-slate-400 text-sm">
              {car.marque} {car.modele} — {car.prix_par_jour} DH / jour
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Photo */}
        {car.img && (
          <div className="h-40 overflow-hidden">
            <img src={car.img} alt={`${car.marque} ${car.modele}`} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Corps */}
        <div className="px-6 py-5 space-y-4">
          {etat === "error" && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
              <AlertCircle size={15} />
              {message}
            </div>
          )}
          {etat === "success" && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm">
              <CheckCircle2 size={15} />
              {message}
            </div>
          )}

          {etat !== "success" && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Date de début</label>
                  <input
                    type="date"
                    min={today}
                    value={form.date_debut}
                    onChange={e => setForm({ ...form, date_debut: e.target.value, date_fin: "" })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Date de fin</label>
                  <input
                    type="date"
                    min={form.date_debut || today}
                    value={form.date_fin}
                    onChange={e => setForm({ ...form, date_fin: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {jours > 0 && (
                <div className="bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-700 text-sm">
                    <Calendar size={15} />
                    <span><strong>{jours}</strong> jour{jours > 1 ? "s" : ""}</span>
                  </div>
                  <span className="text-blue-700 font-bold text-lg">{montant} DH</span>
                </div>
              )}

              <button
                onClick={handleReserver}
                disabled={etat === "loading" || jours <= 0}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {etat === "loading" && <Loader size={15} className="animate-spin" />}
                {etat === "loading" ? "Envoi en cours…" : "Confirmer la réservation"}
              </button>
            </>
          )}

          {etat === "success" && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
            >
              Fermer
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}


function CarCard({ car, index }) {
  const [showDetails,  setShowDetails]  = useState(false);
  const [showReserver, setShowReserver] = useState(false);

  const disponible = car.status === "disponible";

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0  }}
        exit={{    opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)" }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <img
            src={car.img}
            alt={`${car.marque} ${car.modele}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold backdrop-blur-sm ${
            disponible ? "bg-emerald-500/90 text-white" : "bg-gray-600/80 text-white"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${disponible ? "bg-white" : "bg-gray-300"}`} />
            {disponible ? "Disponible" : "Indisponible"}
          </div>
          
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 p-4 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-slate-900 font-bold text-[15.5px] leading-tight tracking-tight">
              {car.marque} {car.modele}
            </h3>
            
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-blue-600 font-bold text-[22px] tracking-tight">{car.prix_par_jour}</span>
            <span className="text-gray-400 text-[13px] font-medium">DH / jour</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 py-3 border-t border-gray-100">
            {[
              { icon: <GearIcon />, label: car.marque    },
              { icon: <BoltIcon />, label: car.carburant },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-gray-500 text-[12.5px] font-medium">
                <span className="text-gray-400">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Boutons */}
          <div className="flex gap-2 mt-auto pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              
              onClick={() => setShowDetails(true)}
              className="flex-1 py-2.5 rounded-xl border border-gray-200 text-slate-700 text-[13px] font-semibold hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50 transition-all"
            >
              Détails
            </motion.button>
            <motion.button
              whileHover={disponible ? { scale: 1.02 } : {}}
              whileTap={disponible ? { scale: 0.97 } : {}}
              onClick={() => disponible && setShowReserver(true)}
              disabled={!disponible}
              className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                disponible
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              Réserver
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {showDetails && (
          <DetailsModal
            car={car}
            onClose={() => setShowDetails(false)}
            onReserver={() => setShowReserver(true)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReserver && (
          <ReservationModal
            car={car}
            onClose={() => setShowReserver(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default CarCard;