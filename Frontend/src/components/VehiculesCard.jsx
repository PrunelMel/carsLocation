import React from 'react'

function VehiculeCard({ marque, modele, status }) {
  return (
      <div>
        {marque && modele && <p className=' '>{marque} {modele}</p>}
        {status && <p className='text-gray-500'>Status: {status}</p>}
      </div>
  
  )
}

function VehiculesCard({ vehicules }) {
  return (
    <div className='flex flex-wrap gap-5'>
        <h1>Vehicules</h1>
      {vehicules.map((vehicule) => (
        <VehiculeCard key={vehicule.id_vehicule} {...vehicule} />
      ))}
    </div>
  )
}
   

export default VehiculesCard