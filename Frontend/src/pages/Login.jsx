import  { useState } from 'react'
import hero from '../assets/login.svg'
import { apiService } from '../services/api'
import { useNavigate, Navigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    mot_de_passe: '',
    role: 'agent'
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Si déjà connecté, rediriger
  const userRole = localStorage.getItem('userRole')
  if (userRole === 'admin') return <Navigate to="/admin" replace />
  if (userRole === 'agent') return <Navigate to="/agent" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setErreur('')
    setSucces('')
    setLoading(true)
    try {
      const response = await apiService.loginUtilisateur(formData)
      localStorage.setItem('userEmail', formData.email)
      localStorage.setItem('userRole', formData.role)
      localStorage.setItem('userId', response.id)
      console.log(response.id)
      setSucces('Connecté avec succès')
      setTimeout(() => {
        navigate(formData.role === 'admin' ? '/admin' : '/agent')
      }, 500)
    } catch (e) {
      console.error(e.message)
      setErreur('Email ou mot de passe incorrect')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-screen bg-gray-100 flex justify-center items-center'>
      <form
        className='bg-white rounded-2xl shadow-[0_0_10px_0_rgba(0,0,0,0.15)] w-full max-w-md p-10'
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className='flex flex-col items-center mb-8'>
          <img src={hero} alt="" className='w-16 mb-4' />
          <h1 className='text-2xl text-blue-700 font-bold'>Connexion</h1>
          <p className='text-gray-400 text-sm mt-1'>Bienvenue, veuillez vous identifier</p>
        </div>

        {/* Messages */}
        {erreur && (
          <div className='bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4'>
            {erreur}
          </div>
        )}
        {succes && (
          <div className='bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg px-4 py-3 mb-4'>
            {succes}
          </div>
        )}

        <div className='flex flex-col gap-4'>

          {/* Rôle */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-700'>Rôle</label>
            <select
              className='h-11 border border-gray-300 rounded-lg px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white'
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="agent">Agent</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          {/* Email */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-700'>Email</label>
            <input
              type="email" required
              placeholder='example@gmail.com'
              className='h-11 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Mot de passe */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-semibold text-gray-700'>Mot de passe</label>
            <input
              type="password" required
              placeholder='Saisissez votre mot de passe'
              className='h-11 border border-gray-300 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-blue-400'
              value={formData.mot_de_passe}
              onChange={(e) => setFormData({ ...formData, mot_de_passe: e.target.value })}
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='bg-blue-600 h-11 rounded-lg text-white font-semibold mt-2 hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

        </div>
      </form>
    </div>
  )
}

export default Login
