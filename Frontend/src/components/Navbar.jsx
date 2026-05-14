import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hero from '../assets/hero.svg'

function NavBar() {
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole') || ''
  const isAdmin = userRole === 'admin'
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() {
    localStorage.removeItem('userRole')
    localStorage.removeItem('userEmail')
    navigate(isAdmin ? '/login' : '/login/agent')
  }

  return (
    <div className='bg-white text-gray-500 shadow-sm'>
      <div className='flex justify-between items-center p-3'>
        {/* Logo et titre */}
        <div className='text-sm md:text-lg text-blue-600 font-semibold'>
          {isAdmin ? 'Admin' : 'Agent'}
        </div>

        {/* Menu hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden flex flex-col gap-1.5 z-50'
        >
          <div className={`w-6 h-0.5 bg-gray-500 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-500 transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-500 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
        </button>

        {/* Menu desktop */}
        <ul className='hidden md:flex gap-4 lg:gap-6 flex-1 justify-center items-center text-sm lg:text-base'>
          {isAdmin ? (
            <>
              <li><Link to="/admin" className='hover:text-blue-600 transition-colors'>Tableau de Bord</Link></li>
              <li><Link to="/admin/parking" className='hover:text-blue-600 transition-colors'>Parking</Link></li>
              <li><Link to="/admin/locations" className='hover:text-blue-600 transition-colors'>Locations</Link></li>
              <li><Link to="/admin/agents" className='hover:text-blue-600 transition-colors'>Agents</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/agent" className='hover:text-blue-600 transition-colors'>Tableau de Bord</Link></li>
              <li><Link to="/agent/parking" className='hover:text-blue-600 transition-colors'>Parking</Link></li>
              <li><Link to="/agent/locations" className='hover:text-blue-600 transition-colors'>Mes Réservations</Link></li>
            </>
          )}
        </ul>

        {/* Profile et logout (desktop) */}
        <div className='hidden md:flex items-center gap-2 lg:gap-3'>
          <img src={hero} alt="" className='w-6 lg:w-8' />
          <span className='text-xs lg:text-sm font-medium'>{userRole.toUpperCase()}</span>
          <button
            onClick={handleLogout}
            className='text-red-500 text-xs lg:text-sm font-medium hover:text-red-700 transition-colors'
          >
            Déco
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className='md:hidden bg-gray-50 border-t border-gray-200 p-3'>
          <ul className='flex flex-col gap-3 text-sm'>
            {isAdmin ? (
              <>
                <li><Link to="/admin" onClick={() => setMenuOpen(false)} className='block py-2 px-3 hover:bg-gray-100 rounded transition-colors'>Tableau de Bord</Link></li>
                <li><Link to="/admin/parking" onClick={() => setMenuOpen(false)} className='block py-2 px-3 hover:bg-gray-100 rounded transition-colors'>Parking</Link></li>
                <li><Link to="/admin/locations" onClick={() => setMenuOpen(false)} className='block py-2 px-3 hover:bg-gray-100 rounded transition-colors'>Locations</Link></li>
                <li><Link to="/admin/agents" onClick={() => setMenuOpen(false)} className='block py-2 px-3 hover:bg-gray-100 rounded transition-colors'>Agents</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/agent" onClick={() => setMenuOpen(false)} className='block py-2 px-3 hover:bg-gray-100 rounded transition-colors'>Tableau de Bord</Link></li>
                <li><Link to="/agent/parking" onClick={() => setMenuOpen(false)} className='block py-2 px-3 hover:bg-gray-100 rounded transition-colors'>Parking</Link></li>
                <li><Link to="/agent/locations" onClick={() => setMenuOpen(false)} className='block py-2 px-3 hover:bg-gray-100 rounded transition-colors'>Mes Réservations</Link></li>
              </>
            )}
            <hr className='my-2' />
            <li className='flex items-center gap-2 py-2 px-3'>
              <img src={hero} alt="" className='w-6' />
              <span className='text-xs font-medium'>{userRole.toUpperCase()}</span>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className='w-full text-left text-red-500 py-2 px-3 text-sm font-medium hover:bg-red-50 rounded transition-colors'
              >
                Se déconnecter
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default NavBar
