import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { 
  Car, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  User, 
  LogOut, 
  ArrowRight,
  TrendingUp,
  History
} from 'lucide-react';
import {motion} from "framer-motion"
const id_client = localStorage.getItem('clientDrixenvaId')

const Reservation = () => {
  // Dummy data
  const handleCancel = async (r) => {
    console.log('Annulation de Réservation')
    if(id_client){
      setIsDeleting(true);

      const res = await apiService.deleteReservation(r.id_reservation)
      console.log(res)
      console.log(r)
      const res2 = await apiService.updateVehicules(r.vehicle.id_vehicule,  {marque:r.vehicle.marque, modele:r.vehicle.modele, carburant:r.vehicle.carburant, prix_par_jour:r.vehicle.prix_par_jour, status:"disponible"} )
      console.log(res2)
    }else{
      alert("Veuillez vous connecter")
      window.location.href = '/login'
    }
    setIsDeleting(false);
  }

  
  const stats = [
    { title: "Réservations actives", count: 1, icon: <Clock size={20} className="text-blue-600" />, color: "bg-blue-50" },
    { title: "Véhicules retournés", count: 1, icon: <CheckCircle2 size={20} className="text-emerald-600" />, color: "bg-emerald-50" },
    { title: "Véhicules non retournés", count: 1, icon: <XCircle size={20} className="text-rose-600" />, color: "bg-rose-50" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-700';
      case 'Terminée': return 'bg-emerald-100 text-emerald-700';
      case 'Annulée': return 'bg-gray-100 text-gray-700';
      case 'confirmee': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReturnStatusColor = (status) => {
    if (status === 'Véhicule rendu') return 'bg-emerald-100 text-emerald-700';
    if (status === 'Non retourné') return 'bg-rose-100 text-rose-700';
    if (status === 'louer') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-600';
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getClientReservations(id_client);
      console.log(data);
      setRes(data);
    }
    if (id_client) {
      fetchData();
    }
    else {
      window.location.href = '/home/login'
    }
  }, []);

  const [res, setRes] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-20">
      {/* Navbar */}
      {/* <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Car size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">DriveNow</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-blue-600">Mes réservations</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Profil</a>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors">
              <LogOut size={18} />
              Déconnexion
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          </button>
        </div>
      </nav> */}

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Mes réservations</h1>
          <p className="text-slate-500 text-lg">Consultez vos réservations et le statut de vos véhicules.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold">{res.length}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reservations List */}
        { res.length > 0 ? (<div className="space-y-6">
          {res.map((res) => (
            <div key={res.id_reservation} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row">
                {/* Vehicle Image */}
                <div className="w-full md:w-64 h-48 md:h-auto bg-slate-100 overflow-hidden">
                  <img 
                    src={res.vehicule.img} 
                    alt={res.vehicle} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <h3 className="text-xl font-bold">{res.vehicule.marque + ' ' + res.vehicule.modele}</h3>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(res.status)}`}>
                          {res.status}
                        </span>
                        {res.vehicule.status !== 'Annulée' && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getReturnStatusColor(res.vehicule.status)}`}>
                            {res.vehicule.status}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date début</p>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar size={16} className="text-slate-400" />
                          <span className="font-medium">{new Date(res.date_debut).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date retour</p>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar size={16} className="text-slate-400" />
                          <span className="font-medium">{new Date(res.date_fin).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prix total</p>
                        <p className="text-lg font-bold text-blue-600">{res.montant_total}</p>
                      </div>
                      
                    </div>
                  </div>
                  {/* bouton d' annulation de réservation  */}
                  
                  <div className="mt-8 flex justify-end">
                    <button onClick={() => handleCancel(res)}  className="flex items-center gap-2 text-sm font-bold text-red-600 hover:gap-3 transition-all">
                      Annuler la reservation
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  

                  {/* <div className="mt-8 flex justify-end">
                    <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
                      Voir détails
                      <ArrowRight size={18} />
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>): 
        (
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
            <p className="text-gray-500 font-semibold text-lg mb-1">Aucune réservation trouvée</p>
            <p className="text-gray-400 text-sm">Essayez encore</p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Reservation;