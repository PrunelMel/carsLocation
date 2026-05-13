import { useEffect, useState } from 'react'
import { apiService } from '../../services/api'
import Navbar from '../../components/Navbar'
import VehiculeModal from '../../components/VehiculeModal'

const STATUS_COLORS = {
    'disponible': 'bg-green-100 text-green-800',
    'louer': 'bg-blue-100 text-blue-800',
    'maintenance': 'bg-red-100 text-red-800',
}

const STATUS_LABELS = {
    'disponible': 'Disponible',
    'louer': 'Loué',
    'maintenance': 'Maintenance',
}

const EMPTY_FORM = {
    id_vehicule: "",
    marque: '',
    modele: '',
    carburant: '',
    prix_par_jour: '',
    status: 'disponible',
}

function Parking() {
    const [vehicules, setVehicules] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('tous')
    const [showModal, setShowModal] = useState(false)
    const [modeEdition, setModeEdition] = useState(false)
    const [vehiculeEnCours, setVehiculeEnCours] = useState(EMPTY_FORM)
    const [idEdition, setIdEdition] = useState(null)
    const [erreur, setErreur] = useState('')
    const [succes, setSucces] = useState('')
    const [saving, setSaving] = useState(false)

    const fetchVehicules = async () => {
        try {
            setLoading(true)
            const data = await apiService.getVehicules()
            setVehicules(data)
        } catch (err) {
            setErreur('Erreur lors du chargement des véhicules')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVehicules()
    }, [])

    const vehiculesFiltres = filter === 'tous'
        ? vehicules
        : vehicules.filter(v => v.status === filter)

    const count = (s) => vehicules.filter(v => v.status === s).length

    function ouvrirAjout() {
        setModeEdition(false)
        setVehiculeEnCours(EMPTY_FORM)
        setIdEdition(null)
        setErreur(''); setSucces(''); setShowModal(true)
    }

    function ouvrirEdition(vehicule) {
        setModeEdition(true)
        setVehiculeEnCours({ ...vehicule })
        setIdEdition(vehicule.id_vehicule)
        setErreur(''); setSucces(''); setShowModal(true)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErreur(''); setSucces(''); setSaving(true)
        try {
            if (modeEdition) {
                await apiService.updateVehicules(idEdition, vehiculeEnCours)
                setSucces('Véhicule mis à jour avec succès')
            } else {
                if(vehiculeEnCours.id_vehicule) { 
                    await apiService.createVehicules(vehiculeEnCours)
                    setSucces('Véhicule ajouté avec succès')
                } else {
                    throw new Error("Impossible de créer un vehicule sans id")
                }
            }
            await fetchVehicules()
            setTimeout(() => setShowModal(false), 800)
        } catch (err) {
            setErreur('Erreur : ' + (err.response?.data?.message || err.message))
        } finally {
            setSaving(false)
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Voulez-vous supprimer ce véhicule ?')) return
        try {
            await apiService.deleteVehicules(id)
            setVehicules(prev => prev.filter(v => v.id_vehicule !== id))
        } catch (err) {
            alert('Erreur lors de la suppression : ' + err.message)
        }
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />

            {/* Header */}
            <div className='flex justify-between items-center p-5'>
                <div>
                    <h1 className='text-2xl font-bold'>Gestion du Parking</h1>
                    <h2 className='text-gray-500'>Ajoutez, modifiez ou supprimez des véhicules</h2>
                </div>
                <button onClick={ouvrirAjout} className='bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'>
                    + Ajouter un véhicule
                </button>
            </div>

            {/* Filtres */}
            <div className='px-5 flex gap-2 flex-wrap mb-4'>
                {[
                    { key: 'tous', label: `Tous (${vehicules.length})` },
                    { key: 'disponible', label: `Disponibles (${count('disponible')})` },
                    { key: 'louer', label: `Loués (${count('louer')})` },
                    { key: 'maintenance', label: `Maintenance (${count('maintenance')})` },
                ].map(btn => (
                    <button
                        key={btn.key}
                        onClick={() => setFilter(btn.key)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === btn.key ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {/* Tableau */}
            {loading ? (
                <div className='p-10 text-center text-gray-400'>Chargement...</div>
            ) : (
                <div className='px-5'>
                    <div className='overflow-x-auto bg-white rounded-xl shadow'>
                        <table className='w-full'>
                            <thead className='bg-gray-100 text-gray-600 text-sm uppercase'>
                                <tr>
                                    <th className='px-4 py-3 text-left'>Marque</th>
                                    <th className='px-4 py-3 text-left'>Modèle</th>
                                    <th className='px-4 py-3 text-left'>Carburant</th>
                                    <th className='px-4 py-3 text-left'>Prix/Jour</th>
                                    <th className='px-4 py-3 text-left'>Statut</th>
                                    <th className='px-4 py-3 text-center'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehiculesFiltres.map((v) => (
                                    <tr key={v.id_vehicule} className='border-t hover:bg-gray-50'>
                                        <td className='px-4 py-3 font-medium'>{v.marque || 'N/A'}</td>
                                        <td className='px-4 py-3'>{v.modele || 'N/A'}</td>
                                        <td className='px-4 py-3 font-mono text-sm'>{v.carburant || 'N/A'}</td>
                                        <td className='px-4 py-3'>{v.prix_par_jour || '0'} DH</td>
                                        <td className='px-4 py-3'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[v.status] || 'bg-gray-100 text-gray-800'}`}>
                                                {STATUS_LABELS[v.status] || v.status}
                                            </span>
                                        </td>
                                        <td className='px-4 py-3'>
                                            <div className='flex justify-center gap-3'>
                                                <button onClick={() => ouvrirEdition(v)} className='text-blue-600 font-semibold text-sm hover:text-blue-800'>Modifier</button>
                                                <button onClick={() => handleDelete(v.id_vehicule)} className='text-red-500 font-semibold text-sm hover:text-red-700'>Supprimer</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Utilisation du composant extrait */}
            <VehiculeModal 
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                modeEdition={modeEdition}
                vehicule={vehiculeEnCours}
                onChange={setVehiculeEnCours}
                onSubmit={handleSubmit}
                saving={saving}
                erreur={erreur}
                succes={succes}
            />
        </div>
    )
}

export default Parking