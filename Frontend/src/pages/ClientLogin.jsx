import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ShieldCheck, KeyRound } from 'lucide-react';
import { apiService } from '../services/api';
const TABS = Object.freeze({
  LOGIN: 'login',
  REGISTER: 'register'
});
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginFormData, setFormData] = useState({
    email: '',
    mot_de_passe: ''
  })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [RegisterformData, setRegisterFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse:'',
    tel:'',
    cin:'',
    num_permis:'',
    mot_de_passe: ''
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(activeTab === 'login'){
        console.log('login')
        const data = await apiService.loginClient(loginFormData)
        console.log(loginFormData)
        console.log(data)
        
        if(data.email){
          console.log("succes login")
          localStorage.setItem('userEmail', data.email)
          localStorage.setItem('clientDrixenvaId', data.id_user)
          localStorage.setItem('clientRole', 'client')
          window.location.href = '/home/mesReservations'
        }
      }
      else{
        console.log('register')
        console.log(RegisterformData)
        const data = await apiService.createClient(RegisterformData)
        console.log(data)
        
      }
    }
    catch(e){
    console.log(e)
    }
  }
  return (
    <div className="min-h-screen flex w-full font-sans bg-white p-10">
      {/* Left side (Image & Branding) */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-slate-900">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop")' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <h2 className="text-white font-bold text-2xl tracking-wide mb-16">DriveNow</h2>
            <div className="max-w-md">
              <h1 className="text-white text-5xl font-extrabold leading-tight mb-6">
                Bienvenue sur<br/>DriveNow
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Réservez vos véhicules rapidement et facilement. L'excellence automobile à portée de main.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-48">
                <p className="text-white text-3xl font-bold mb-1">2.3K+</p>
                <p className="text-slate-300 text-sm">Clients Satisfaits</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-48">
                <p className="text-white text-3xl font-bold mb-1">150+</p>
                <p className="text-slate-300 text-sm">Modèles Premium</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <ShieldCheck size={16} className="text-white" />
                <span className="text-white text-xs font-medium">Paiements Sécurisés</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <ShieldCheck size={16} className="text-white" />
                <span className="text-white text-xs font-medium">Assurance Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
        <div className="w-full max-w-md">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button 
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-4 text-center font-semibold transition-colors ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Connexion
            </button>
            <button 
              onClick={() => setActiveTab('register')}
              className={`flex-1 pb-4 text-center font-semibold transition-colors ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Inscription
            </button>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Nom</label>
                <input 
                  type="text" 
                  placeholder="Jean Dupont"
                  value={RegisterformData.nom}
                  onChange={e => setRegisterFormData({ ...RegisterformData, nom: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            )}
            
            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Prenom</label>
                <input 
                  type="text" 
                  placeholder="Jean Dupont"
                  value={RegisterformData.prenom}
                  onChange={e => setRegisterFormData({ ...RegisterformData, prenom: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            )}

            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">téléphone</label>
                <input 
                  type="text" 
                  placeholder="Jean Dupont"
                  value={RegisterformData.tel}
                  onChange={e => setRegisterFormData({ ...RegisterformData, tel: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            )}

            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Adresse Physique</label>
                <input 
                  type="text" 
                  placeholder="Jean Dupont"
                  value={RegisterformData.adresse}
                  onChange={e => setRegisterFormData({ ...RegisterformData, adresse: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            )}

            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">CIN</label>
                <input 
                  type="text" 
                  placeholder="Jean Dupont"
                  value={RegisterformData.cin}
                  onChange={e => setRegisterFormData({ ...RegisterformData, cin: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            )}

            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Numéro Permis</label>
                <input 
                  type="text" 
                  placeholder="Jean Dupont"
                  value={RegisterformData.num_permis}
                  onChange={e => setRegisterFormData({ ...RegisterformData, num_permis: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            )}
            

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Adresse Email</label>
              <input 
                type="email" 
                placeholder="nom@exemple.fr" 
                value={activeTab === 'login' ? loginFormData.email : RegisterformData.email}
                onChange={(e) => activeTab === 'login' ? setFormData({ ...loginFormData, email: e.target.value }) : setRegisterFormData({ ...RegisterformData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Mot de passe</label>
                {activeTab === 'login' && (
                  <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Mot de passe oublié ?</a>
                )}
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  value={activeTab === 'login' ? loginFormData.mot_de_passe : RegisterformData.mot_de_passe}
                  onChange={(e) => activeTab === 'login' ? setFormData({ ...loginFormData, mot_de_passe: e.target.value }) : setRegisterFormData({ ...RegisterformData, mot_de_passe: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
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

            {activeTab === 'register' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Confirmer le mot de passe</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium">
                {activeTab === 'login' ? "Se souvenir de moi" : "J'accepte les conditions d'utilisation"}
              </label>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-colors mt-2">
              {activeTab === 'login' ? "Se connecter" : "S'inscrire"}
            </button>
          </form>

          {/* 
          Divider
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-xs font-bold text-gray-400">OU CONTINUER AVEC</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div> 
          */}

          {/* 
          Social Buttons
          <div className="flex gap-4">
            <button className="flex-1 flex justify-center items-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>
            <button className="flex-1 flex justify-center items-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-blue-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="flex-1 flex justify-center items-center py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.345 16.929c-1.127 1.64-2.28 3.255-4.088 3.28-1.782.025-2.355-1.055-4.404-1.055-2.023 0-2.651 1.029-4.378 1.08-1.78.052-3.1-1.748-4.25-3.385-2.353-3.388-4.148-9.563-1.746-13.743 1.189-2.067 3.333-3.383 5.632-3.409 1.73-.025 3.376 1.173 4.43 1.173 1.053 0 3.053-1.436 5.163-1.22 1.026.104 3.916.417 5.762 3.11-1.498.922-2.585 2.647-2.556 4.45.034 2.455 2.115 3.447 2.148 3.462-1.895 5.525-6.586 6.257-6.586 6.257zM11.966 6.551c-.08 0-.161-.002-.243-.006a5.553 5.553 0 0 1-1.294-4.146c1.077.051 2.45 1.002 3.277 2.155.674.935 1.258 2.213 1.11 3.407-1.144.11-2.484-.813-3.308-1.921-.303-.408-.48-.902-.542-1.489z" />
              </svg>
            </button>
          </div> 
          */}

          {/* Security Features */}
          <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Lock size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Connexion sécurisée</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Protection des données</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <KeyRound size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Accès sécurisé</span>
            </div>
          </div>
        </div>
      </div>

      {/* 
      Footer Links
      <div className="fixed bottom-6 right-0 w-full lg:w-1/2 flex justify-center gap-6 text-xs font-semibold text-gray-500 bg-white/80 backdrop-blur-sm py-2">
        <a href="#" className="hover:text-gray-800 transition-colors">Aide</a>
        <a href="#" className="hover:text-gray-800 transition-colors">Politique de confidentialité</a>
        <a href="#" className="hover:text-gray-800 transition-colors">Support</a>
      </div> 
      */}
    </div>
  );
};

export default LoginPage;