import React, { useEffect, useState } from 'react'
import { apiService } from '../../services/api'
import Navbar from '../../components/Navbar'

function AgentParkingVehicles() {
    const [vehicules, setVehicules] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('tous')

    useEffect(() => {
        const fetchVehicules = async () => {
            try {
                const data = await apiService.getVehicules()
                setVehicules(data)
                // setLoading(false)
            } catch (err) {
                console.error('Erreur lors de la récupération des véhicules:', err.message)
                setLoading(false)
            }
            finally{
                setTimeout(() => setLoading(false), 1000)
            }
        }
        
        fetchVehicules()
    }, [])

    const getStatusColor = (status) => {
        const colors = {
            'disponible': 'bg-green-100 text-green-800',
            'louer': 'bg-blue-100 text-blue-800',
            'maintenance': 'bg-red-100 text-red-800'
        }
        return colors[status] || 'bg-gray-100 text-gray-800'
    }

    const vehiculesFiltres = filter === 'tous' 
        ? vehicules 
        : vehicules.filter(v => v.status === filter)

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar></Navbar>
            <div className='p-5 pt-28'>
                <h1 className='text-2xl font-bold'>Véhicules du Parking</h1>
                <h2 className='text-gray-500'>Liste des véhicules disponibles et loués</h2>
            </div>

            <div className='p-5 flex flex-wrap gap-2'>
                <button 
                    onClick={() => setFilter('tous')}
                    className={`px-4 py-2 rounded ${filter === 'tous' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                >
                    Tous ({vehicules.length})
                </button>
                <button 
                    onClick={() => setFilter('disponible')}
                    className={`px-4 py-2 rounded ${filter === 'disponible' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                >
                    Disponibles ({vehicules.filter(v => v.status === 'disponible').length})
                </button>
                <button 
                    onClick={() => setFilter('louer')}
                    className={`px-4 py-2 rounded ${filter === 'louer' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                >
                    Loués ({vehicules.filter(v => v.status === 'louer').length})
                </button>
                <button 
                    onClick={() => setFilter('maintenance')}
                    className={`px-4 py-2 rounded ${filter === 'maintenance' ? 'bg-blue-600 text-white' : 'bg-white'}`}
                >
                    Maintenance ({vehicules.filter(v => v.status === 'maintenance').length})
                </button>
            </div>

            {loading ? (
                <div className='p-5 text-center'>Chargement...</div>
            ) : vehiculesFiltres.length === 0 ? (
                <div className='p-5 text-center text-gray-500'>Aucun véhicule trouvé</div>
            ) : (
                <div className='p-5'>
                    <div className='overflow-x-auto bg-white rounded-lg shadow'>
                        <table className='w-full'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='px-4 py-3 text-left'>Marque</th>
                                    <th className='px-4 py-3 text-left'>Modèle</th>
                                    <th className='px-4 py-3 text-left'>Carburant</th>
                                    <th className='px-4 py-3 text-left'>Prix/Jour</th>
                                    <th className='px-4 py-3 text-left'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehiculesFiltres.map((vehicule) => (
                                    <tr key={vehicule.id_vehicule} className='border-b hover:bg-gray-50'>
                                        <td className='px-4 py-3'>{vehicule.marque || 'N/A'}</td>
                                        <td className='px-4 py-3'>{vehicule.modele || 'N/A'}</td>
                                        <td className='px-4 py-3'>{vehicule.carburant || 'N/A'}</td>
                                        <td className='px-4 py-3'>{vehicule.prix_par_jour || 'N/A'} DH</td>
                                        <td className='px-4 py-3'>
                                            <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(vehicule.status)}`}>
                                                {vehicule.status}
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

export default AgentParkingVehicles
