import React, { useState } from 'react';
import { X, Car } from 'lucide-react';

// ---------------------------------------------------------------------------
// AdminAddVehicule – Modal / Popup
// Props:
//   isOpen  : boolean       – controls visibility
//   onClose : () => void    – called when the user closes the modal
// ---------------------------------------------------------------------------


const STATUS_OPTIONS = [
  // options pour le statut du véhicule
  { value: 'disponible',  label: 'Disponible' },
  { value: 'loue',        label: 'Loué' },
  { value: 'maintenance', label: 'Maintenance' },
];

const CARBURANT_OPTIONS = [
  // options pour le type de carburant
  { value: 'essence',    label: 'Essence' },
  { value: 'diesel',     label: 'Diesel' },
  { value: 'electrique', label: 'Électrique' },
  { value: 'hybride',    label: 'Hybride' },
];

const AdminAddVehicule = ({ isOpen, onClose }) => {
  // state pour gérer le formulaire
  const [form, setForm] = useState({
    // les données du formulaire
    id_vehicule: '',
    marque: '',
    modele: '',
    carburant: 'essence',
    prix_par_jour: '',
    status: 'disponible',
  });
  const [loading, setLoading] = useState(false);
  
  const [error, setError]     = useState(null);
  const [success, setSuccess] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      id_vehicule: '',
      marque: '',
      modele: '',
      carburant: 'essence',
      prix_par_jour: '',
      status: 'disponible',
    });
    setError(null);
    setSuccess(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        ...form,
        prix_par_jour: parseFloat(form.prix_par_jour),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? ''}/vehicules`,                      
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erreur serveur');
      }
      setSuccess('Véhicule ajouté avec succès !');
      setTimeout(() => handleClose(), 1500);
    } catch (err) {
      setError(err.message ?? 'Une erreur inconnue est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Modal card */}
      <div
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl">
              <Car size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-800">
              Ajouter un véhicule
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Fermer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* ID Véhicule */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700" htmlFor="id_vehicule">
              Identifiant véhicule
            </label>
            <input
              id="id_vehicule"
              name="id_vehicule"
              type="text"
              required
              placeholder="ex : VH_001"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
              value={form.id_vehicule}
              onChange={handleChange}
            />
          </div>

          {/* Marque + Modèle – side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700" htmlFor="marque">
                Marque
              </label>
              <input
                id="marque"
                name="marque"
                type="text"
                required
                placeholder="Toyota"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={form.marque}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700" htmlFor="modele">
                Modèle
              </label>
              <input
                id="modele"
                name="modele"
                type="text"
                required
                placeholder="Corolla"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={form.modele}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Carburant */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700" htmlFor="carburant">
              Carburant
            </label>
            <select
              id="carburant"
              name="carburant"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-sm"
              value={form.carburant}
              onChange={handleChange}
            >
              {CARBURANT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Prix / jour + Status – side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700" htmlFor="prix_par_jour">
                Prix / jour (€)
              </label>
              <input
                id="prix_par_jour"
                name="prix_par_jour"
                type="number"
                min="0"
                step="0.01"
                required
                placeholder="45.00"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={form.prix_par_jour}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700" htmlFor="status">
                Statut
              </label>
              <select
                id="status"
                name="status"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-sm"
                value={form.status}
                onChange={handleChange}
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Feedback */}
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-600 text-sm bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              {success}
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Ajout…' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddVehicule;
