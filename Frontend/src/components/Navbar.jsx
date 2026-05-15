import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hero from '../assets/hero.svg'

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150"
    >
      {children}
    </Link>
  );
}

function NavBar() {
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole') || ''
  const isAdmin = userRole === 'admin'

  function handleLogout() {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate(isAdmin ? '/login' : '/login/agent')
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 h-14 bg-white border-b border-slate-200 shadow-sm">
 
      {/* Left: brand + links */}
      <ul className="flex items-center gap-1">
        <li className="mr-6">
          <Link
            to={isAdmin ? "/admin" : "/agent"}
            className="text-[15px] font-semibold text-blue-600 tracking-tight"
          >
            {isAdmin ? "Espace Administration" : "Espace Agent"}
          </Link>
        </li>
 
        {isAdmin ? (
          <>
            <li><NavLink to="/admin">Tableau de Bord</NavLink></li>
            <li><NavLink to="/admin/parking">Parking</NavLink></li>
            <li><NavLink to="/admin/locations">Locations</NavLink></li>
            <li><NavLink to="/admin/agents">Agents</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/agent">Tableau de Bord</NavLink></li>
            <li><NavLink to="/agent/parking">Parking</NavLink></li>
            <li><NavLink to="/agent/locations">Mes Réservations</NavLink></li>
          </>
        )}
      </ul>
 
      {/* Right: user + logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
          <img src={hero} alt="" className="w-6 h-6 rounded-full object-cover" />
          <span className="text-xs font-medium text-slate-600 tracking-wide">
            {userRole.toUpperCase()}
          </span>
        </div>
 
        <button
          onClick={handleLogout}
          className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors"
        >
          Se déconnecter
        </button>
      </div>
 
    </div>
  );

}

export default NavBar
