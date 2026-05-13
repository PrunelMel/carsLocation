import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { apiService } from '../../services/api'

const STATUS_COLORS = {
    en_attente: 'bg-blue-100 text-blue-700',
    confirmee: 'bg-emerald-100 text-emerald-700',
    en_cours: 'bg-amber-100 text-amber-700',
    terminee: 'bg-gray-100 text-gray-600',
    annulee: 'bg-red-100 text-red-600',
}

const STATUS_LABELS = {
    en_attente: 'En attente',
    confirmee: 'Confirmée',
    en_cours: 'En cours',
    terminee: 'Terminée',
    annulee: 'Annulée',
}

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
            montant_final: reservation.montant_final ?? ''
        })
        setErreurModif('')
        setSuccesModif('')
    }

    async function handleSubmitModif(e) {
        e.preventDefault()
        setErreurModif('')
        setSuccesModif('')
        setLoadingModif(true)

        // Le PUT attend un ReservationCreate complet — on réutilise les données existantes
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
            setReservations(prev => prev.map(r =>
                r.id_reservation === reservationAModifier.id_reservation
                    ? { ...r, status: formModif.status, montant_final: payload.montant_final }
                    : r
            ))
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

    const reservationsFiltrees = filterStatus === 'tous'
        ? reservations
        : reservations.filter(r => r.status === filterStatus)

    const countByStatus = (s) => reservations.filter(r => r.status === s).length

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />
            <div className='p-5'>
                <h1 className='text-2xl font-bold'>Gestion des Locations</h1>
                <h2 className='text-gray-500'>Liste de toutes les réservations</h2>
            </div>

            {/* Filtres */}
            <div className='px-5 pb-3 flex flex-wrap gap-2'>
                {[
                    { key: 'tous', label: `Toutes (${reservations.length})` },
                    { key: 'en_attente', label: `En attente (${countByStatus('en_attente')})` },
                    { key: 'confirmee', label: `Confirmées (${countByStatus('confirmee')})` },
                    { key: 'en_cours', label: `En cours (${countByStatus('en_cours')})` },
                    { key: 'terminee', label: `Terminées (${countByStatus('terminee')})` },
                    { key: 'annulee', label: `Annulées (${countByStatus('annulee')})` },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setFilterStatus(key)}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                            filterStatus === key ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Tableau */}
            {loading ? (
                <div className='p-10 text-center text-gray-500'>Chargement...</div>
            ) : reservationsFiltrees.length === 0 ? (
                <div className='p-10 text-center text-gray-400'>Aucune réservation trouvée</div>
            ) : (
                <div className='px-5 pb-10'>
                    <div className='overflow-x-auto bg-white rounded-xl shadow'>
                        <table className='w-full text-sm'>
                            <thead className='bg-gray-200 text-gray-600 uppercase text-xs'>
                                <tr>
                                    <th className='px-4 py-3 text-left'>Client</th>
                                    <th className='px-4 py-3 text-left'>Véhicule</th>
                                    <th className='px-4 py-3 text-left'>Agent</th>
                                    <th className='px-4 py-3 text-left'>Début</th>
                                    <th className='px-4 py-3 text-left'>Fin</th>
                                    <th className='px-4 py-3 text-left'>Montant</th>
                                    <th className='px-4 py-3 text-left'>Statut</th>
                                    <th className='px-4 py-3 text-left'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservationsFiltrees.map((r) => (
                                    <tr key={r.id_reservation} className='border-b hover:bg-gray-50'>
                                        <td className='px-4 py-3'>
                                            <p className='font-medium'>{r.client?.prenom} {r.client?.nom}</p>
                                            <p className='text-gray-400 text-xs'>{r.client?.email}</p>
                                        </td>
                                        <td className='px-4 py-3'>{r.vehicule?.marque} {r.vehicule?.modele}</td>
                                        <td className='px-4 py-3'>{r.utilisateur?.prenom} {r.utilisateur?.nom}</td>
                                        <td className='px-4 py-3'>{r.date_debut}</td>
                                        <td className='px-4 py-3'>{r.date_fin}</td>
                                        <td className='px-4 py-3'>
                                            <p>{r.montant_total} DH</p>
                                            {r.montant_final != null && (
                                                <p className='text-xs text-gray-400'>Final : {r.montant_final} DH</p>
                                            )}
                                        </td>
                                        <td className='px-4 py-3'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[r.status] || 'bg-gray-100'}`}>
                                                {STATUS_LABELS[r.status] || r.status}
                                            </span>
                                        </td>
                                        <td className='px-4 py-3'>
                                            <div className='flex gap-3'>
                                                <button
                                                    onClick={() => ouvrirModifier(r)}
                                                    className='text-blue-600 font-semibold hover:underline'
                                                >
                                                    Modifier
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r.id_reservation)}
                                                    className='text-red-500 font-semibold hover:underline'
                                                >
                                                    Supprimer
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal modification */}
            {reservationAModifier && (
                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
                        <h2 className='text-xl font-bold mb-1 text-blue-700'>Modifier la réservation</h2>
                        <p className='text-gray-400 text-sm mb-5'>
                            {reservationAModifier.client?.prenom} {reservationAModifier.client?.nom} —{' '}
                            {reservationAModifier.vehicule?.marque} {reservationAModifier.vehicule?.modele}
                        </p>

                        {erreurModif && <p className='text-red-500 mb-3 text-sm'>{erreurModif}</p>}
                        {succesModif && <p className='text-green-500 mb-3 text-sm'>{succesModif}</p>}

                        <div className='flex flex-col gap-4'>
                            <div>
                                <label className='text-sm font-semibold text-gray-700'>Statut</label>
                                <select
                                    value={formModif.status}
                                    onChange={e => setFormModif({ ...formModif, status: e.target.value })}
                                    className='w-full h-10 border border-gray-300 rounded px-3 mt-1'
                                >
                                    <option value="en_attente">En attente</option>
                                    <option value="confirmee">Confirmée</option>
                                    <option value="en_cours">En cours</option>
                                    <option value="terminee">Terminée</option>
                                    <option value="annulee">Annulée</option>
                                </select>
                            </div>

                            <div>
                                <label className='text-sm font-semibold text-gray-700'>Montant final (DH)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder={`Montant de base : ${reservationAModifier.montant_total} DH`}
                                    value={formModif.montant_final}
                                    onChange={e => setFormModif({ ...formModif, montant_final: e.target.value })}
                                    className='w-full h-10 border border-gray-300 rounded px-3 mt-1'
                                />
                            </div>

                            <div className='flex justify-end gap-3 mt-2'>
                                <button
                                    onClick={() => setReservationAModifier(null)}
                                    className='px-5 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 hover:cursor-pointer'
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSubmitModif}
                                    disabled={loadingModif}
                                    className='px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer disabled:opacity-50'
                                >
                                    {loadingModif ? 'Enregistrement...' : 'Enregistrer'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Locations
