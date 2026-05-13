import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { apiService } from '../../services/api'
import ReservationFilters from '../../components/ReservationFilters'
import ReservationTable from '../../components/ReservationTable'
import ReservationEditModal from '../../components/ReservationEditModal'

function Locations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('tous')

  // Modal modification
  const [reservationAModifier, setReservationAModifier] = useState(null)
  const [formModif, setFormModif] = useState({ status: '', montant_final: '' })
  const [erreurModif, setErreurModif] = useState('')
  const [succesModif, setSuccesModif] = useState('')
  const [loadingModif, setLoadingModif] = useState(false)

  useEffect(() => {
    async function fetchReservations() {
      try {
        const data = await apiService.getReservations()
        setReservations(data)
      } catch (e) {
        console.error(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchReservations()
  }, [])

  function ouvrirModifier(reservation) {
    setReservationAModifier(reservation)
    setFormModif({
      status: reservation.status,
      montant_final: reservation.montant_final ?? '',
    })
    setErreurModif('')
    setSuccesModif('')
  }

  async function handleSubmitModif() {
    setErreurModif('')
    setSuccesModif('')
    setLoadingModif(true)

    const payload = {
      id_reservation: reservationAModifier.id_reservation,
      date_debut: reservationAModifier.date_debut,
      date_fin: reservationAModifier.date_fin,
      date_reservation: reservationAModifier.date_reservation,
      montant_total: reservationAModifier.montant_total,
      montant_final: formModif.montant_final !== '' ? parseFloat(formModif.montant_final) : null,
      status: formModif.status,
      id_client: reservationAModifier.client.id_client,
      id_vehicule: reservationAModifier.vehicule.id_vehicule,
      id_user: reservationAModifier.utilisateur.id_user,
    }

    try {
      await apiService.updateReservation(reservationAModifier.id_reservation, payload)
      setSuccesModif('Réservation mise à jour !')
      setReservations(prev =>
        prev.map(r =>
          r.id_reservation === reservationAModifier.id_reservation
            ? { ...r, status: formModif.status, montant_final: payload.montant_final }
            : r
        )
      )
      setTimeout(() => setReservationAModifier(null), 800)
    } catch (e) {
      setErreurModif('Erreur : ' + e.message)
    } finally {
      setLoadingModif(false)
    }
  }

  async function handleDelete(id_reservation) {
    const accord = confirm('Voulez-vous supprimer cette réservation ?')
    if (!accord) return
    try {
      await apiService.deleteReservation(id_reservation)
      setReservations(prev => prev.filter(r => r.id_reservation !== id_reservation))
    } catch (e) {
      console.error(e.message)
    }
  }

  const reservationsFiltrees =
    filterStatus === 'tous'
      ? reservations
      : reservations.filter(r => r.status === filterStatus)

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Gestion des Locations</h1>
        <h2 className='text-gray-500'>Liste de toutes les réservations</h2>
      </div>

      <ReservationFilters
        reservations={reservations}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      {loading ? (
        <div className='p-10 text-center text-gray-500'>Chargement...</div>
      ) : (
        <ReservationTable
          reservations={reservationsFiltrees}
          onEdit={ouvrirModifier}
          onDelete={handleDelete}
        />
      )}

      <ReservationEditModal
        reservation={reservationAModifier}
        formModif={formModif}
        onChange={setFormModif}
        onSubmit={handleSubmitModif}
        onClose={() => setReservationAModifier(null)}
        loading={loadingModif}
        erreur={erreurModif}
        succes={succesModif}
      />
    </div>
  )
}

export default Locations
