import React, { useEffect, useState } from 'react';
import {
  Car,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';
import { apiService } from '../services/api';

// ── helpers ────────────────────────────────────────────────────────────────

const STATUS_META = {
  en_attente: { label: 'En attente',  color: 'bg-blue-100 text-blue-700',      dot: 'bg-blue-500'    },
  confirmee:  { label: 'Confirmée',   color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  en_cours:   { label: 'En cours',    color: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-500'   },
  terminee:   { label: 'Terminée',    color: 'bg-gray-100 text-gray-600',       dot: 'bg-gray-400'    },
  annulee:    { label: 'Annulée',     color: 'bg-red-100 text-red-600',         dot: 'bg-red-500'     },
};

function fmt(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function nbJours(debut, fin) {
  const d = Math.round((new Date(fin) - new Date(debut)) / 86400000);
  return d > 0 ? d : 0;
}

// ── Carte réservation ──────────────────────────────────────────────────────

function ReservationCard({ r }) {
  const [open, setOpen] = useState(false);
  const meta   = STATUS_META[r.status] ?? STATUS_META.en_attente;
  const jours  = nbJours(r.date_debut, r.date_fin);
  const retour = r.retour;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Car size={22} className="text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-slate-800 text-base leading-tight">
              {r.vehicule?.marque} {r.vehicule?.modele}
            </p>
            <p className="text-slate-400 text-sm">{r.vehicule?.carburant}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
          <button
            onClick={() => setOpen(o => !o)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>
      </div>

      {/* Résumé rapide */}
      <div className="px-5 pb-4 flex flex-wrap gap-6 border-t border-slate-50 pt-3">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={14} className="text-blue-400" />
          <span>{fmt(r.date_debut)} → {fmt(r.date_fin)}</span>
        </div>
        <div className="text-sm text-slate-500">
          <span className="font-semibold text-slate-700">{jours}</span> jour{jours > 1 ? 's' : ''}
        </div>
        <div className="text-sm text-slate-500">
          Montant :&nbsp;
          <span className="font-semibold text-slate-700">
            {r.montant_final ?? r.montant_total} DH
          </span>
          {r.montant_final != null && r.montant_final !== r.montant_total && (
            <span className="ml-1 line-through text-slate-400 text-xs">{r.montant_total} DH</span>
          )}
        </div>
      </div>

      {/* Détails dépliables */}
      {open && (
        <div className="border-t border-slate-100 px-5 py-4 bg-slate-50 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Agent</p>
            <p className="text-slate-700 font-medium">
              {r.utilisateur?.prenom} {r.utilisateur?.nom}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Date de réservation</p>
            <p className="text-slate-700 font-medium">{fmt(r.date_reservation)}</p>
          </div>
          {retour && (
            <>
              <div>
                <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Date de retour</p>
                <p className="text-slate-700 font-medium">{fmt(retour.date_retour)}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-semibold mb-1">État du véhicule</p>
                <p className="text-slate-700 font-medium capitalize">
                  {retour.etat_voiture?.replace(/_/g, ' ')}
                </p>
              </div>
              {retour.frais_supplementaire > 0 && (
                <div>
                  <p className="text-slate-400 text-xs uppercase font-semibold mb-1">Frais supplémentaires</p>
                  <p className="text-red-600 font-semibold">{retour.frais_supplementaire} DH</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ── Composant principal ────────────────────────────────────────────────────

const FILTRES = [
  { key: 'toutes',     label: 'Toutes'     },
  { key: 'en_attente', label: 'En attente' },
  { key: 'confirmee',  label: 'Confirmée'  },
  { key: 'en_cours',   label: 'En cours'   },
  { key: 'terminee',   label: 'Terminée'   },
  { key: 'annulee',    label: 'Annulée'    },
];

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [erreur, setErreur]             = useState('');
  const [filtre, setFiltre]             = useState('toutes');

  const idClient = localStorage.getItem('idClient');

  useEffect(() => {
    const fetchReservations = async () => {
      if (!idClient) {
        setErreur("Session expirée. Veuillez vous reconnecter.");
        setLoading(false);
        return;
      }
      try {
        // apiService.getReservations() retourne toutes les réservations
        // on filtre côté client par id_client
        const data = await apiService.getReservations();
        const miennes = data.filter(r => r.client?.id_client === idClient);
        setReservations(miennes);
      } catch (e) {
        setErreur(e.message ?? "Impossible de charger vos réservations.");
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [idClient]);

  // Stats calculées dynamiquement
  const actives       = reservations.filter(r => ['en_attente', 'confirmee', 'en_cours'].includes(r.status));
  const retournees    = reservations.filter(r => r.retour);
  const nonRetournees = reservations.filter(r => r.status === 'en_cours' && !r.retour);

  const stats = [
    { title: 'Réservations actives',    count: actives.length,       icon: <Clock        size={20} className="text-blue-600"    />, color: 'bg-blue-50'    },
    { title: 'Véhicules retournés',     count: retournees.length,    icon: <CheckCircle2 size={20} className="text-emerald-600" />, color: 'bg-emerald-50' },
    { title: 'Véhicules non retournés', count: nonRetournees.length, icon: <XCircle      size={20} className="text-rose-600"   />, color: 'bg-rose-50'    },
  ];

  const affichees =
    filtre === 'toutes'
      ? reservations
      : reservations.filter(r => r.status === filtre);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
            Mes réservations
          </h1>
          <p className="text-slate-500 text-base">
            Consultez vos réservations et le statut de vos véhicules.
          </p>
        </div>

        {/* Erreur globale */}
        {erreur && (
          <div className="flex items-center gap-2 mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            <AlertCircle size={16} />
            {erreur}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className={`${s.color} p-3 rounded-xl`}>{s.icon}</div>
              <div>
                <p className="text-xs font-medium text-slate-500">{s.title}</p>
                <p className="text-2xl font-bold text-slate-800">{s.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTRES.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltre(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                filtre === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              {label}
              {key !== 'toutes' && (
                <span className="ml-1.5 opacity-60">
                  ({reservations.filter(r => r.status === key).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Liste */}
        {loading ? (
          <div className="flex justify-center items-center py-24 text-slate-400 text-sm gap-2">
            <Clock size={18} className="animate-spin" />
            Chargement…
          </div>
        ) : affichees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400">
            <Car size={40} className="mb-3 opacity-30" />
            <p className="font-semibold text-base">Aucune réservation trouvée</p>
            <p className="text-sm mt-1">
              {filtre === 'toutes'
                ? "Vous n'avez pas encore de réservation."
                : 'Aucune réservation avec ce statut.'}
            </p>
            {filtre === 'toutes' && (
              <a
                href="/home/cars"
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Parcourir les véhicules
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {affichees.map(r => (
              <ReservationCard key={r.id_reservation} r={r} />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default Reservation;