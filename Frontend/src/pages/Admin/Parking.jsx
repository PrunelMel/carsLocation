import { useEffect, useState } from 'react'
import { apiService } from '../../services/api'
import Navbar from '../../components/Navbar'
import VehiculeModal from '../../components/VehiculeModal'
import VehiculeFilters from '../../components/VehiculeFilters'
import VehiculeTable from '../../components/VehiculeTable'

const EMPTY_FORM = {
  id_vehicule: '',
  marque: '',
  modele: '',
  carburant: '',
  prix_par_jour: '',
  status: 'disponible',
  img: '',
}

function Parking() {
  const [vehicules, setVehicules] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('tous')

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modeEdition, setModeEdition] = useState(false)
  const [vehiculeEnCours, setVehiculeEnCours] = useState(EMPTY_FORM)
  const [idEdition, setIdEdition] = useState(null)
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')
  const [saving, setSaving] = useState(false)

  // ─── Fetch ────────────────────────────────────────────────
  const fetchVehicules = async () => {
    try {
      setLoading(true)
      const data = await apiService.getVehicules()
      setVehicules(data)
    } catch (err) {
      console.error('Erreur chargement véhicules :', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVehicules() }, [])

  const vehiculesFiltres =
    filter === 'tous' ? vehicules : vehicules.filter(v => v.status === filter)

  // Ouvrir Ajout 
  function ouvrirAjout() {
    setModeEdition(false)
    setVehiculeEnCours(EMPTY_FORM)
    setIdEdition(null)
    setErreur('')
    setSucces('')
    setShowModal(true)
  }

  //Ouvrir Édition (Pour modifier)
  function ouvrirEdition(vehicule) {
    setModeEdition(true)
    setVehiculeEnCours({ ...vehicule })
    setIdEdition(vehicule.id_vehicule)
    setErreur('')
    setSucces('')
    setShowModal(true)
  }

  // ─── Submit ───────────────────────────────────────────────
  async function handleSubmit() {
    setErreur('')
    setSucces('')

    // Validations
    if (!vehiculeEnCours.marque.trim() || !vehiculeEnCours.modele.trim()) {
      setErreur('La marque et le modèle sont obligatoires.')
      return
    }
    if (!vehiculeEnCours.carburant) {
      setErreur('Veuillez choisir un type de carburant.')
      return
    }
    if (!vehiculeEnCours.prix_par_jour || Number(vehiculeEnCours.prix_par_jour) <= 0) {
      setErreur('Le prix par jour doit être supérieur à 0.')
      return
    }
    

    setSaving(true)
    try {
      const payload = {
        ...vehiculeEnCours,
        prix_par_jour: parseFloat(vehiculeEnCours.prix_par_jour),
      }

      if (modeEdition) {
        await apiService.updateVehicules(idEdition, payload)
        setSucces('Véhicule mis à jour avec succès !')
      } else {
        await apiService.createVehicules(payload)
        setSucces('Véhicule ajouté avec succès !')
      }
      await fetchVehicules()
      setTimeout(() => setShowModal(false), 800)
    } catch (err) {
      setErreur('Erreur : ' + (err.message ?? 'inconnue'))
    } finally {
      setSaving(false)
    }
  }

  // ─── Suppression ──────────────────────────────────────────
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
        <button
          onClick={ouvrirAjout}
          className='bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
        >
          + Ajouter un véhicule
        </button>
      </div>

      <VehiculeFilters
        vehicules={vehicules}
        filter={filter}
        onFilterChange={setFilter}
      />

      {loading ? (
        <div className='p-10 text-center text-gray-400'>Chargement...</div>
      ) : (
        <VehiculeTable
          vehicules={vehiculesFiltres}
          onEdit={ouvrirEdition}
          onDelete={handleDelete}
        />
      )}

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
