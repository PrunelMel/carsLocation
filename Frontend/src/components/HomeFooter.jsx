import { Car } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-8 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Car size={20} className="text-blue-400" />
          <span className="text-white font-bold text-lg">Drivenxa</span>
        </div>
        {/* Simple links */}
        <nav className="flex gap-6 text-sm">
          <a href="/home" className="hover:text-blue-400 transition-colors">À propos</a>
          <a href="/home/cars" className="hover:text-blue-400 transition-colors">Véhicules</a>
          <a href="/home" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="/home" className="hover:text-blue-400 transition-colors">Contact</a>
        </nav>
        {/* Copyright */}
        <p className="text-xs text-slate-500 mt-4 md:mt-0">
          © {new Date().getFullYear()} Drivenxa. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
