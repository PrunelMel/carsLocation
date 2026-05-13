import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ShieldCheck, KeyRound } from 'lucide-react';

const LoginPageAgent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex w-full font-sans bg-white">
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
            <h2 className="text-white font-bold text-2xl tracking-wide mb-16">DriveNow | Portail Agents</h2>
            <div className="max-w-md">
              <h1 className="text-white text-5xl font-extrabold leading-tight mb-6">
                Espace Agent<br />DriveNow
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed">
                Gérez votre flotte et vos réservations en toute simplicité. Le portail dédié à nos partenaires de confiance.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-48">
                <p className="text-white text-3xl font-bold mb-1">50+</p>
                <p className="text-slate-300 text-sm">Agences Partenaires</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 w-48">
                <p className="text-white text-3xl font-bold mb-1">10K+</p>
                <p className="text-slate-300 text-sm">Réservations Gérées</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <ShieldCheck size={16} className="text-white" />
                <span className="text-white text-xs font-medium">Accès Sécurisé PRO</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <ShieldCheck size={16} className="text-white" />
                <span className="text-white text-xs font-medium">Support Dédié</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
        <div className="w-full max-w-md">
          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Adresse Email ou Nom d'utilisateur</label>
              <input
                type="text"
                placeholder="jean.dupont ou agent@drivenow.fr"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Mot de passe</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-700">Mot de passe oublié ?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="remember" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
              <label htmlFor="remember" className="text-sm text-gray-600 font-medium">
                Se souvenir de moi
              </label>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-lg transition-colors mt-2">
              Accéder au portail
            </button>
          </form>

          {/* Security Features */}
          <div className="flex justify-center items-center gap-6 mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Lock size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Connexion PRO</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <ShieldCheck size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Audit de sécurité</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <KeyRound size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Accès Restreint</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPageAgent;
