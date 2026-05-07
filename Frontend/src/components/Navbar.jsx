import React from 'react'
import { Link } from 'react-router-dom'
import hero from '../assets/hero.svg'
function NavBar() {
    const userRole = localStorage.getItem('userRole')
    return (
        <div className='flex justify-between  p-3 bg-white text-gray-500 shadow-sm' >

            <ul className='flex w-1/2 justify-between items-center'>
                <li className='text-xl text-blue-600 font-semibold'>
                    <Link to="/admin">Espace Administration</Link>
                </li>
                <li>
                    <Link to="/admin">Tableau de Bord</Link>
                </li>
                <li>
                    <Link to="/admin/Parking">Parking</Link>
                </li>
                <li>
                    <Link to="/admin/locations">Locations</Link>

                </li>
                <li>
                    <Link to="/admin/agents">Agents</Link>

                </li>
            </ul>
            <div className='flex items-center'>
                <img src={hero} alt="" className='w-8' />
                <span className='mx-2'>{userRole.toUpperCase()}</span>

                <button className='text-red-500'><Link to="/login">Se deconnecter</Link></button>
            </div>


        </div>
        

    )
}

export default NavBar