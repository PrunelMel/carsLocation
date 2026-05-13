import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { apiService } from '../../services/api'
import ShowAgent from '../../components/ShowAgent'
import { Link } from 'react-router-dom'
function Agents() {
    const [agents, setAgents] = useState([])
    function handleDelete(id_user) {
        const supprimer = async () => {
            try {
                const accord = confirm("Voulez vous supprimer cet utilisateur ?")
                if (accord) {
                    const reponse = await apiService.deleteUtilisateur(id_user)
                    if (reponse.ok) {


                        setAgents((prevAgents) => prevAgents.filter(agent => agent.id_user !== id_user))

                        return reponse
                    }

                }

            }
            catch (e) {
                console.log(e.message)
            }
        }
        supprimer()


    }

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const data = await apiService.getUtilisateur()
                setAgents(data.filter((agent) => agent.email !== localStorage.getItem("userEmail")))
            }
            catch (e) {
                console.log(e.message)
            }
        }
        fetchAgent()
    }, [])


    return (
        <div className='bg-gray-100 min-h-screen' >
            <Navbar></Navbar>
            <div className='flex justify-between m-5'>
                <h1 className=' text-2xl  font-semibold'>Gestion des Agents</h1>
                <button className=' text-xl text-white bg-blue-600 rounded font-semibold p-2 hover:cursor-pointer hover:bg-blue-700 transition-colors'><Link to="/admin/creation">Ajouter un utilisateur</Link></button>
            </div>

            <div className='grid grid-cols-3 gap-5 p-3'>
                {
                    agents.map((agent) => <ShowAgent {...agent} handleDelete={handleDelete} key={agent.id_user}></ShowAgent>)
                }

            </div>
            {console.log(agents)}
        </div>

    )
}

export default Agents