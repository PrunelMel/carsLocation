import React from 'react';
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

const Reservation = () => {
  // Dummy data
  const reservations = [
    {
      id: 1,
      vehicle: "Porsche Taycan 4S",
      image: "/taycan.png",
      startDate: "12 Mai 2026",
      endDate: "15 Mai 2026",
      price: "540€",
      status: "Active",
      returnStatus: "Non retourné",
    },
    {
      id: 2,
      vehicle: "BMW M4 Competition",
      image: "/m4.png",
      startDate: "05 Mai 2026",
      endDate: "07 Mai 2026",
      price: "420€",
      status: "Terminée",
      returnStatus: "Véhicule rendu",
    },
    {
      id: 3,
      vehicle: "Audi RS6 Avant",
      image: "https:loginFormData//images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=85&auto=format",
      startDate: "01 Mai 2026",
      endDate: "03 Mai 2026",
      price: "390€",
      status: "Annulée",
      returnStatus: "N/A",
    }
  ];

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
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getReturnStatusColor = (status) => {
    if (status === 'Véhicule rendu') return 'bg-emerald-100 text-emerald-700';
    if (status === 'Non retourné') return 'bg-rose-100 text-rose-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-20">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-8 py-4">
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
      </nav>

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
                <p className="text-2xl font-bold">{stat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reservations List */}
        <div className="space-y-6">
          {reservations.map((res) => (
            <div key={res.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row">
                {/* Vehicle Image */}
                <div className="w-full md:w-64 h-48 md:h-auto bg-slate-100 overflow-hidden">
                  <img 
                    src={res.image} 
                    alt={res.vehicle} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <h3 className="text-xl font-bold">{res.vehicle}</h3>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(res.status)}`}>
                          {res.status}
                        </span>
                        {res.status !== 'Annulée' && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getReturnStatusColor(res.returnStatus)}`}>
                            {res.returnStatus}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date début</p>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar size={16} className="text-slate-400" />
                          <span className="font-medium">{res.startDate}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date retour</p>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Calendar size={16} className="text-slate-400" />
                          <span className="font-medium">{res.endDate}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Prix total</p>
                        <p className="text-lg font-bold text-blue-600">{res.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all">
                      Voir détails
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reservation;