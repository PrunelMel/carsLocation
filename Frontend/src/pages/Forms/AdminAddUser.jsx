import React, { useState } from 'react';
import { Eye, EyeOff, X, UserPlus } from 'lucide-react';

// ---------------------------------------------------------------------------
// AdminAddUser – Modal / Popup
// Props:
//   isOpen  : boolean  – controls visibility
//   onClose : () => void – called when the user closes the modal
// ---------------------------------------------------------------------------

const AdminAddUser = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    id_user: '',
    nom: '',
    prenom: '',
    mot_de_passe: '',
    role: 'agent',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ id_user: '', nom: '', prenom: '', mot_de_passe: '', role: 'agent' });
    setError(null);
    setSuccess(null);
    setShowPassword(false);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Erreur serveur');
      }
      setSuccess('Utilisateur créé avec succès !');
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
      {/* Modal card – stop propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl">
              <UserPlus size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-800">Ajouter un utilisateur</h2>
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
          {/* ID User */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700" htmlFor="id_user">
              Identifiant
            </label>
            <input
              id="id_user"
              name="id_user"
              type="text"
              required
              placeholder="ex : usr_001"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
              value={form.id_user}
              onChange={handleChange}
            />
          </div>

          {/* Nom + Prénom – side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700" htmlFor="nom">
                Nom
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                required
                placeholder="Dupont"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={form.nom}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700" htmlFor="prenom">
                Prénom
              </label>
              <input
                id="prenom"
                name="prenom"
                type="text"
                required
                placeholder="Jean"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={form.prenom}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700" htmlFor="mot_de_passe">
              Mot de passe
            </label>
            <div className="relative">
              <input
                id="mot_de_passe"
                name="mot_de_passe"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={form.mot_de_passe}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Toggle password"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Rôle */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700" htmlFor="role">
              Rôle
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm"
              value={form.role}
              onChange={handleChange}
            >
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
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
              className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors disabled:opacity-50"
            >
              {loading ? 'Création…' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddUser;
