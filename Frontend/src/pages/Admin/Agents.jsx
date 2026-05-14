import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { apiService } from '../../services/api'
import AgentCard from '../../components/AgentCard'
import AgentModal from '../../components/AgentModal'



function Agents() {
  const myEmail = localStorage.getItem('userEmail')
  const myId = localStorage.getItem('userId')
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const formulaire = {
  id_user: '',
  nom: '',
  prenom: '',
  mot_de_passe: '',
  email: '',
  role: 'agent',
  id_admin: myId ,
  img: '',
}

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [modeEdition, setModeEdition] = useState(false)
  const [agentEnCours, setAgentEnCours] = useState(formulaire)
  const [idEdition, setIdEdition] = useState(null)
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')
  const [saving, setSaving] = useState(false)



  const fetchAgents = async () => {
    try {
      setLoading(true)
      const data = await apiService.getUtilisateur()
      // Exclure l'admin connecté
      setAgents(data.filter(a => a.email !== myEmail))
    } catch (e) {
      console.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAgents() }, [])

  // Ouvrir modal Ajout 
  function ouvrirAjout() {
    setModeEdition(false)
    setAgentEnCours({ ...formulaire })
    setIdEdition(null)
    setErreur('')
    setSucces('')
    setShowModal(true)
  }

  // Ouvrir modal Édition 
  function ouvrirEdition(agent) {
    setModeEdition(true)
    setAgentEnCours({
      id_user: agent.id_user,
      nom: agent.nom,
      prenom: agent.prenom,
      mot_de_passe: '',      
      email: agent.email,
      role: agent.role,
      id_admin: agent.id_admin,
      img: agent.img ,
    })
    setIdEdition(agent.id_user)
    setErreur('')
    setSucces('')
    setShowModal(true)
  }

 
  async function handleSubmit() {
    setErreur('')
    setSucces('')

    // Validations simples
    if (!agentEnCours.nom.trim() || !agentEnCours.prenom.trim() || !agentEnCours.email.trim()) {
      setErreur('Nom, prénom et email sont obligatoires.')
      return
    }
    if (!modeEdition && !agentEnCours.mot_de_passe.trim()) {
      setErreur('Le mot de passe est obligatoire pour un nouvel agent.')
      return
    }

    setSaving(true)
    try {
      if (modeEdition) {
        // Si le mot de passe est vide on garde l'ancien — on doit envoyer quelque chose,
        // donc on demande le mot de passe actuel (ou on exclut si l'API le permet).
        // Ici on envoie le payload complet ; si vide l'API re-hashe une chaîne vide,
        // donc on impose qu'il soit rempli en édition aussi.
        if (!agentEnCours.mot_de_passe.trim()) {
          setErreur('Veuillez saisir le nouveau mot de passe (ou l\'ancien pour le conserver).')
          setSaving(false)
          return
        }
        await apiService.updateUtilisateur(idEdition, agentEnCours)
        setSucces('Agent mis à jour avec succès !')
      } else {
        // Pour la création, on exclut id_user car il est généré par le backend
        const {id_user, ...createPayload } = agentEnCours
        await apiService.createUtilisateur(createPayload)
        setSucces('Agent ajouté avec succès !')
      }
      await fetchAgents()
      setTimeout(() => setShowModal(false), 800)
    } catch (e) {
      setErreur('Erreur : ' + (e.message ?? 'inconnue'))
    } finally {
      setSaving(false)
    }
  }

  // Suppression 
  async function handleDelete(id_user) {
    const accord = confirm('Voulez-vous supprimer cet agent ?')
    if (!accord) return
    try {
      await apiService.deleteUtilisateur(id_user)
      setAgents(prev => prev.filter(a => a.id_user !== id_user))
    } catch (e) {
      alert('Erreur lors de la suppression : ' + e.message)
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar />

      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 m-5'>
        <div>
          <h1 className='text-xl md:text-2xl font-semibold'>Gestion des Agents</h1>
          <p className='text-gray-500 text-xs md:text-sm'>{agents.length} agent{agents.length !== 1 ? 's' : ''} enregistré{agents.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={ouvrirAjout}
          className='w-full md:w-auto text-white bg-blue-600 rounded-lg font-semibold px-5 py-2 hover:bg-blue-700 transition-colors'
        >
          + Ajouter un agent
        </button>
      </div>

      {loading ? (
        <div className='p-10 text-center text-gray-400'>Chargement...</div>
      ) : agents.length === 0 ? (
        <div className='p-10 text-center text-gray-400'>Aucun agent enregistré</div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
          {agents.map(agent => (
            <AgentCard
              key={agent.id_user}
              agent={agent}
              onEdit={ouvrirEdition}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      {console.log(myId)}

      <AgentModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        modeEdition={modeEdition}
        agent={agentEnCours}
        onChange={setAgentEnCours}
        onSubmit={handleSubmit}
        saving={saving}
        erreur={erreur}
        succes={succes}
      />
    </div>
  )
}

export default Agents
