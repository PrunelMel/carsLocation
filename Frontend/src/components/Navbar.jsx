import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hero from '../assets/hero.svg'

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
    <div className='flex flex-col gap-3 p-3 md:flex-row md:items-center md:justify-between bg-white text-gray-500 shadow-sm'>
      <ul className='flex flex-wrap gap-3 md:gap-4 items-center w-full md:w-auto'>
        {isAdmin ? (
          <>
            <li className='text-xl text-blue-600 font-semibold'>
              <Link to="/admin">Espace Administration</Link>
            </li>
            <li><Link to="/admin">Tableau de Bord</Link></li>
            <li><Link to="/admin/parking">Parking</Link></li>
            <li><Link to="/admin/locations">Locations</Link></li>
            <li><Link to="/admin/agents">Agents</Link></li>
          </>
        ) : (
          <>
            <li className='text-xl text-blue-600 font-semibold'>
              <Link to="/agent">Espace Agent</Link>
            </li>
            <li><Link to="/agent">Tableau de Bord</Link></li>
            <li><Link to="/agent/parking">Parking</Link></li>
            <li><Link to="/agent/locations">Mes Réservations</Link></li>
          </>
        )}
      </ul>
      <div className='flex flex-wrap items-center gap-3 justify-between w-full md:w-auto'>
        <div className='flex items-center gap-3'>
          <img src={hero} alt="" className='w-8' />
          <span className='mx-2'>{userRole.toUpperCase()}</span>
        </div>
        <button
          onClick={handleLogout}
          className='text-red-500 font-medium hover:text-red-700 transition-colors'
        >
          Se déconnecter
        </button>
      </div>
    </div>
  )
}

export default NavBar
