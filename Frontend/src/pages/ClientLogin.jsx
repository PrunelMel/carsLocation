import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { apiService } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginFormData, setFormData] = useState({
    email: '',
    mot_de_passe: ''
  });
  const [RegisterformData, setRegisterFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    tel: '',
    cin: '',
    num_permis: '',
    mot_de_passe: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (activeTab === 'login') {
        const reponse = await apiService.loginClient(loginFormData);
        if (reponse.ok) {
          const data = await reponse.json();
          localStorage.setItem("nomClient", data.nom);
          localStorage.setItem("idClient", data.id);
          navigate("/home");
        } else {
          setError("Email ou mot de passe incorrect.");
        }
      } else {
        const reponse = await apiService.createClient(RegisterformData);
        if (reponse.ok) {
          setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
          setActiveTab('login');
        } else {
          setError("Erreur lors de l'inscription.");
        }
      }
    } catch (e) {
      setError("Email ou mot de passe incorrect.");
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-gray-50 justify-center">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
        <a href="/home" className='text-gray-500 font-semibold pb-5 hover:text-gray-700 transition-colors-'>Retourner à l'accueil</a>

        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button
              onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
              className={`flex-1 pb-4 text-center font-semibold transition-colors ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Connexion
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
              className={`flex-1 pb-4 text-center font-semibold transition-colors ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Inscription
            </button>
          </div>

          {/* Message de Reponse succes ou echec  */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Champs inscription uniquement */}
            {activeTab === 'register' && (
              <>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Nom</label>
                  <input
                    type="text"
                    placeholder="Dupont"
                    value={RegisterformData.nom}
                    onChange={e => setRegisterFormData({ ...RegisterformData, nom: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Prénom</label>
                  <input
                    type="text"
                    placeholder="Jean"
                    value={RegisterformData.prenom}
                    onChange={e => setRegisterFormData({ ...RegisterformData, prenom: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Téléphone</label>
                  <input
                    type="text"
                    placeholder="+212 6xx xx xx xx"
                    value={RegisterformData.tel}
                    onChange={e => setRegisterFormData({ ...RegisterformData, tel: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Adresse</label>
                  <input
                    type="text"
                    placeholder="123 Rue exemple, Casablanca"
                    value={RegisterformData.adresse}
                    onChange={e => setRegisterFormData({ ...RegisterformData, adresse: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">CIN</label>
                  <input
                    type="text"
                    placeholder="AB123456"
                    value={RegisterformData.cin}
                    onChange={e => setRegisterFormData({ ...RegisterformData, cin: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Numéro de permis</label>
                  <input
                    type="text"
                    placeholder="P1234567"
                    value={RegisterformData.num_permis}
                    onChange={e => setRegisterFormData({ ...RegisterformData, num_permis: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                    required
                  />
                </div>
              </>
            )}

            {/* Email — commun aux deux tabs */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Adresse Email</label>
              <input
                type="email"
                placeholder="nom@exemple.fr"
                value={activeTab === 'login' ? loginFormData.email : RegisterformData.email}
                onChange={e =>
                  activeTab === 'login'
                    ? setFormData({ ...loginFormData, email: e.target.value })
                    : setRegisterFormData({ ...RegisterformData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Mot de passe — commun aux deux tabs */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Mot de passe</label>
                {activeTab === 'login' && (
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Mot de passe oublié ?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={activeTab === 'login' ? loginFormData.mot_de_passe : RegisterformData.mot_de_passe}
                  onChange={e =>
                    activeTab === 'login'
                      ? setFormData({ ...loginFormData, mot_de_passe: e.target.value })
                      : setRegisterFormData({ ...RegisterformData, mot_de_passe: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-colors mt-2"
            >
              {activeTab === 'login' ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;