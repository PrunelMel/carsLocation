import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { apiService } from '../../services/api'
import ShowAgent from '../../components/ShowAgent'
import { Link } from 'react-router-dom'

function Agents() {
    const [agents, setAgents] = useState([])
    const [agentAModifier, setAgentAModifier] = useState(null)
    const [formModif, setFormModif] = useState({
        nom: '', prenom: '', email: '', role: 'agent', mot_de_passe: '', id_admin: ''
    })
    const [erreurModif, setErreurModif] = useState('')
    const [succesModif, setSuccesModif] = useState('')

    function handleDelete(id_user) {
        const supprimer = async () => {
            try {
                const accord = confirm("Voulez vous supprimer cet utilisateur ?")
                if (accord) {
                    const reponse = await apiService.deleteUtilisateur(id_user)
                    if (reponse.ok) {
                        setAgents((prevAgents) => prevAgents.filter(agent => agent.id_user !== id_user))
                    }
                }
            } catch (e) {
                console.log(e.message)
            }
        }
        supprimer()
    }

    function handleModifier(agent) {
        setAgentAModifier(agent)
        setFormModif({
            nom: agent.nom,
            prenom: agent.prenom,
            email: agent.email,
            role: agent.role,
            mot_de_passe: '',
            id_admin: localStorage.getItem('userId') || ''
        })
        setErreurModif('')
        setSuccesModif('')
    }

    async function handleSubmitModif(e) {
        e.preventDefault()
        setErreurModif('')
        setSuccesModif('')

        if (!formModif.mot_de_passe) {
            setErreurModif("Le mot de passe est requis pour la mise à jour.")
            return
        }

        try {
            const payload = {
                id_user: agentAModifier.id_user,
                nom: formModif.nom,
                prenom: formModif.prenom,
                email: formModif.email,
                role: formModif.role,
                mot_de_passe: formModif.mot_de_passe,
                id_admin: formModif.role === 'agent' ? formModif.id_admin : null
            }
            await apiService.updateUtilisateur(agentAModifier.id_user, payload)
            setSuccesModif("Agent mis à jour avec succès !")
            // Mise à jour de la liste locale
            setAgents(prev => prev.map(a =>
                a.id_user === agentAModifier.id_user
                    ? { ...a, nom: formModif.nom, prenom: formModif.prenom, email: formModif.email, role: formModif.role }
                    : a
            ))
            setTimeout(() => setAgentAModifier(null), 500)
        } catch (e) {
            setErreurModif("Erreur lors de la mise à jour : " + e.message)
        }
    }

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const data = await apiService.getUtilisateur()
                setAgents(data.filter((agent) => agent.email !== localStorage.getItem("userEmail")))
            } catch (e) {
                console.log(e.message)
            }
        }
        fetchAgent()
    }, [])

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar />
            <div className='flex justify-between m-5'>
                <h1 className='text-2xl font-semibold'>Gestion des Agents</h1>
                <button className='text-xl text-white bg-blue-600 rounded font-semibold p-2 hover:cursor-pointer hover:bg-blue-700 transition-colors'>
                    <Link to="/admin/creation">Ajouter un utilisateur</Link>
                </button>
            </div>

            <div className='grid grid-cols-3 gap-5 p-3'>
                {agents.map((agent) => (
                    <ShowAgent
                        {...agent}
                        handleDelete={handleDelete}
                        handleModifier={handleModifier}
                        key={agent.id_user}
                    />
                ))}
            </div>

            {/* Modal de modification */}
            {agentAModifier && (
                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
                    <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
                        <h2 className='text-xl font-bold mb-5 text-blue-700'>Modifier l'agent</h2>

                        {erreurModif && <p className='text-red-500 mb-3'>{erreurModif}</p>}
                        {succesModif && <p className='text-green-500 mb-3'>{succesModif}</p>}

                        <div className='flex flex-col gap-3'>
                            <div>
                                <label className='text-sm font-semibold text-gray-700'>Prénom</label>
                                <input
                                    type="text"
                                    value={formModif.prenom}
                                    onChange={e => setFormModif({ ...formModif, prenom: e.target.value })}
                                    className='w-full h-10 border border-gray-300 rounded px-3 mt-1'
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold text-gray-700'>Nom</label>
                                <input
                                    type="text"
                                    value={formModif.nom}
                                    onChange={e => setFormModif({ ...formModif, nom: e.target.value })}
                                    className='w-full h-10 border border-gray-300 rounded px-3 mt-1'
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold text-gray-700'>Email</label>
                                <input
                                    type="email"
                                    value={formModif.email}
                                    onChange={e => setFormModif({ ...formModif, email: e.target.value })}
                                    className='w-full h-10 border border-gray-300 rounded px-3 mt-1'
                                />
                            </div>
                            <div>
                                <label className='text-sm font-semibold text-gray-700'>Rôle</label>
                                <select
                                    value={formModif.role}
                                    onChange={e => setFormModif({ ...formModif, role: e.target.value })}
                                    className='w-full h-10 border border-gray-300 rounded px-3 mt-1'
                                >
                                    <option value="agent">Agent</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className='text-sm font-semibold text-gray-700'>
                                    Nouveau mot de passe <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder='Requis pour valider la mise à jour'
                                    value={formModif.mot_de_passe}
                                    onChange={e => setFormModif({ ...formModif, mot_de_passe: e.target.value })}
                                    className='w-full h-10 border border-gray-300 rounded px-3 mt-1'
                                />
                            </div>

                            <div className='flex justify-end gap-3 mt-3'>
                                <button

                                    className='px-5 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 hover:cursor-pointer'
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleSubmitModif}
                                    className='px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 hover:cursor-pointer'
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Agents
