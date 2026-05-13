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
    <div className='flex justify-between p-3 bg-white text-gray-500 shadow-sm'>
      <ul className='flex w-1/2 justify-between items-center'>
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
      <div className='flex items-center gap-3'>
        <img src={hero} alt="" className='w-8' />
        <span className='mx-2'>{userRole.toUpperCase()}</span>
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
