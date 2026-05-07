import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import InfoCard from '../components/InfoCard'
import vite from '../assets/react.svg'
import monnaie from '../assets/monnaie1.png'
import carlouer from '../assets/car.svg'
import carDispo from '../assets/carDispo.png'
import agentActif from '../assets/agentActif.png'


import { apiService } from '../services/api'

function Board() {
    const [agents, setAgents] = useState({})
    const [vehicules, setVehicules] = useState({
        "louer": 0,
        "disponible": 0,
        "maintenance": 0
    })
    const [paiments, setPaiments] = useState({})
    const [montantMensuel, setMontantMensuel] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataPaiements = await apiService.getPaiements()
                const dataAgents = await apiService.getUtilisateur()
                const dataVehicules = await apiService.getVehicules()
                setPaiments(dataAgents)
                setMontantMensuel(dataPaiements.reduce((accumalateur, paiement) => paiement.reservation.vehicule.prix_par_jour + accumalateur, 0))
                setAgents(dataAgents.filter((agent) => agent.role === "agent"))
                setVehicules(dataVehicules.reduce((acc, vehicule) => {

                    if (!acc[vehicule.status]) {
                        acc[vehicule.status] = 0;
                    }

                    acc[vehicule.status]++;


                    return acc;
                }, {}));
            } catch (err) {
                console.error(err.message)
            } 
        }

        fetchData()
    }, [])
    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar></Navbar>
            <div className='p-5'>
                <h1 className='text-2xl'>
                    Tableau de Bord
                </h1>
                <h2 className='text-gray-500'>Vue d'ensemble de votre Agence</h2>
            </div>
            <div className='grid grid-cols-4 gap-8 p-5'>
                <InfoCard nom="Revenus mensuel" nombre={montantMensuel} device="DH" src={monnaie}></InfoCard>
                <InfoCard nom="Vehicule loués" nombre={vehicules.louer} src={carlouer}></InfoCard>
                <InfoCard nom="Vehicule disponible" nombre={vehicules.disponible} src={carDispo}></InfoCard>
                <InfoCard nom="Agent actifs" nombre={agents.length} src={agentActif}></InfoCard>

            </div>
            {console.log(vehicules)}



        </div>
    )
}

export default Board