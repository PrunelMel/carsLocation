import React, { useState } from 'react'
import hero from '../../assets/login.svg'
import { apiService } from '../../services/api'
import { useNavigate, Navigate, Link } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    role: 'agent'
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
      localStorage.setItem('userRole', 'agent')
      setSucces('Connecté avec succès')
      setTimeout(() => navigate('/agent'), 500)
    } catch (e) {
      console.error(e.message)
      setErreur('Identifiants invalides')
    }
  }

  return (
    <div className='h-screen bg-gray-200 flex justify-center items-center'>
      <form
        className='bg-white rounded-2xl shadow-[0_0_5px_0_rgba(0,0,0,0.2)] w-120 p-8'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col'>
          <img src={hero} alt="" className='w-20 mb-4 mx-auto' />
          <h1 className='text-3xl mb-8 text-blue-700 font-semibold mx-auto'>Espace Agent</h1>
        </div>
        {erreur && <div className='text-red-500 font-serif mb-3'>{erreur}</div>}
        {succes && <div className='text-green-500 font-serif mb-3'>{succes}</div>}

        <div className='flex flex-col'>
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
          <p className='text-center mt-4 text-sm text-gray-500'>
            Vous êtes administrateur ?{' '}
            <Link to="/login" className='text-blue-600 hover:underline'>Connexion Admin</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
