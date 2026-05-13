import React, { useEffect, useState } from 'react'
import { apiService } from '../../services/api'
import Navbar from '../../components/Navbar'
import ReservationFilters from '../../components/ReservationFilters'

const STATUS_STYLES = {
  en_attente: 'bg-blue-100 text-blue-800',
  confirmee: 'bg-green-100 text-green-800',
  en_cours: 'bg-amber-100 text-amber-800',
  terminee: 'bg-gray-100 text-gray-800',
  annulee: 'bg-red-100 text-red-800',
}

const STATUS_LABELS = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  en_cours: 'En cours',
  terminee: 'Terminée',
  annulee: 'Annulée',
}

function AgentReservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('tous')
  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await apiService.getReservations()
        // Filtrer uniquement les réservations de l'agent connecté
        const mesReservations = data.filter(
          res => res.utilisateur && res.utilisateur.email === userEmail
        )
        setReservations(mesReservations)
      } catch (err) {
        console.error('Erreur lors de la récupération des réservations :', err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReservations()
  }, [userEmail])

  const reservationsFiltrees =
    filter === 'tous'
      ? reservations
      : reservations.filter(r => r.status === filter)

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Mes Réservations</h1>
        <h2 className='text-gray-500'>Historique et suivi de vos locations</h2>
      </div>

      <ReservationFilters
        reservations={reservations}
        filterStatus={filter}
        onFilterChange={setFilter}
      />

      {loading ? (
        <div className='p-5 text-center text-gray-500'>Chargement...</div>
      ) : reservationsFiltrees.length === 0 ? (
        <div className='p-5 text-center text-gray-500'>Aucune réservation trouvée</div>
      ) : (
        <div className='p-5'>
          <div className='overflow-x-auto bg-white rounded-lg shadow'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-200 text-gray-600 uppercase text-xs'>
                <tr>
                  <th className='px-4 py-3 text-left'>Client</th>
                  <th className='px-4 py-3 text-left'>Véhicule</th>
                  <th className='px-4 py-3 text-left'>Date début</th>
                  <th className='px-4 py-3 text-left'>Date fin</th>
                  <th className='px-4 py-3 text-left'>Montant</th>
                  <th className='px-4 py-3 text-left'>Statut</th>
                </tr>
              </thead>
              <tbody>
                {reservationsFiltrees.map(res => (
                  <tr key={res.id_reservation} className='border-b hover:bg-gray-50'>
                    <td className='px-4 py-3'>
                      <p className='font-medium'>{res.client?.prenom} {res.client?.nom}</p>
                      <p className='text-gray-400 text-xs'>{res.client?.email}</p>
                    </td>
                    <td className='px-4 py-3'>
                      {res.vehicule ? `${res.vehicule.marque} ${res.vehicule.modele}` : 'N/A'}
                    </td>
                    <td className='px-4 py-3'>{res.date_debut || 'N/A'}</td>
                    <td className='px-4 py-3'>{res.date_fin || 'N/A'}</td>
                    <td className='px-4 py-3'>
                      <p>{res.montant_total} DH</p>
                      {res.montant_final != null && (
                        <p className='text-xs text-gray-400'>Final : {res.montant_final} DH</p>
                      )}
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          STATUS_STYLES[res.status] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {STATUS_LABELS[res.status] || res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgentReservations
