import React, { useState } from 'react'
import hero from '../../assets/login.svg'
import { apiService } from '../../services/api'
import { useNavigate, Navigate } from 'react-router-dom'

function LoginAdmin() {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    role: 'admin'
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')
  const navigate = useNavigate()

  // Si déjà connecté, rediriger
  const userRole = localStorage.getItem('userRole')
  if (userRole === 'admin') return <Navigate to="/admin" replace />
  if (userRole === 'agent') return <Navigate to="/agent" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setErreur('')
    setSucces('')
    try {
      await apiService.loginUtilisateur(formData)
      localStorage.setItem('userEmail', formData.email)
      localStorage.setItem('userRole', formData.role)
      setSucces('Connecté avec succès')
      setTimeout(() => navigate('/admin'), 500)
    } catch (e) {
      console.error(e.message)
      setErreur('Identifiants invalides')
    }
  }

  return (
    <div className='h-screen bg-gray-200 flex justify-center items-center'>
      <form
        className='bg-white rounded-2xl shadow-[0_0_5px_0_rgba(0,0,0,0.2)] h-3/4 w-120 p-8'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col'>
          <img src={hero} alt="" className='w-20 mb-4 mx-auto' />
          <h1 className='text-3xl mb-8 text-blue-700 font-semibold mx-auto'>Espace Administration</h1>
        </div>
        {erreur && <div className='text-red-500 font-serif mb-3'>{erreur}</div>}
        {succes && <div className='text-green-500 font-serif mb-3'>{succes}</div>}

        <div className='flex flex-col justify-between'>
          <label htmlFor="email" className='text-sm font-semibold text-gray-700'>Email</label>
          <input
            type="email" id="email" required
            placeholder='example@gmail.com'
            className='h-10 border border-gray-300 rounded mb-5 px-2'
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <label htmlFor="password" className='text-sm font-semibold text-gray-700'>Mot de passe</label>
          <input
            type="password" id="password" required
            placeholder='Saisissez votre mot de passe'
            className='h-10 border border-gray-300 rounded mb-5 px-2'
            onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
          />
          <button type='submit' className='bg-blue-600 h-10 rounded text-white font-semibold hover:cursor-pointer hover:bg-blue-700 transition-colors'>
            Se connecter
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginAdmin
