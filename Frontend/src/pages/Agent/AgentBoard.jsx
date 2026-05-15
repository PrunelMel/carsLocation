import React, { useEffect, useState } from 'react'
import { apiService } from '../../services/api'
import Navbar from '../../components/Navbar'
import InfoCard from '../../components/InfoCard'
import carlouer from '../../assets/car.svg'
import carDispo from '../../assets/carDispo.png'

function AgentBoard() {
    const [stats, setStats] = useState({
        reservations: 0,
        vehicules: 0
    })
    const userEmail = localStorage.getItem('userEmail')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataReservations = await apiService.getReservations()
                const dataVehicules = await apiService.getVehicules()
                
                // Compter les réservations de l'agent connecté
                const agentReservations = dataReservations.filter(res => res.utilisateur && res.utilisateur.email === userEmail).length
                
                // Compter les véhicules disponibles
                const availableVehicles = dataVehicules.filter(v => v.status === 'disponible').length
                
                setStats({
                    reservations: agentReservations,
                    vehicules: availableVehicles
                })
            } catch (err) {
                console.error(err.message)
            }
            
        }
        
        fetchData()
    }, [userEmail])

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar></Navbar>
            <div className='p-5 pt-28'>
                <h1 className='text-2xl font-bold'>Tableau de Bord Agent</h1>
                <h2 className='text-gray-500'>Vue d'ensemble de vos locations</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-5'>
                <InfoCard nom="Mes Réservations" nombre={stats.reservations} src={carlouer}></InfoCard>
                <InfoCard nom="Véhicules Disponibles" nombre={stats.vehicules} src={carDispo}></InfoCard>
            </div>
        </div>
    )
}

export default AgentBoard
