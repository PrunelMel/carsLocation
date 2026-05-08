import React from 'react'
function LocationRow({ client="", vehicule="", utilisateur="", date_debut="", date_fin="", status="" }) {
  return (
    <tr className='bg-white  hover:bg-gray-100 '>
      <td className='py-2 px-4 text-sm text-gray-600 text-center'>{client.nom}</td>
      <td className='py-2 px-4 text-sm text-gray-600 text-center'>{vehicule.marque} {vehicule.modele}</td>
      <td className='py-2 px-4 text-sm text-gray-600 text-center'>{utilisateur.nom}</td>
      <td className='py-2 px-4 text-sm text-gray-600 text-center'>{date_debut}</td>
      <td className='py-2 px-4 text-sm text-gray-600 text-center'>{date_fin}</td>
      <td className='py-2 px-4 text-sm text-gray-600 text-center'>{status}</td>
    </tr>
  )
}

function HistoriqueLocations({ locations }) {
  return (
    <div className='shadow-[0_0_5px_0_rgba(0,0,0,0.2)] p-5 rounded-xl bg-gray-50 border-3 border-white'>
      <h1 className='text-xl font-bold text-center mb-3'>Historique des Locations</h1>
      <table className='min-w-full bg-gray-50  rounded-lg'>
        <thead>
          <tr className='bg-gray-100 text-gray-500 uppercase text-sm rounded-full '>
            <th className='py-2 px-4 '>Client</th>
            <th className='py-2 px-4 '>Véhicule</th>
            <th className='py-2 px-4 '>Agent</th>
            <th className='py-2 px-4 '>Date de Début</th>
            <th className='py-2 px-4 '>Date de Fin</th>
            <th className='py-2 px-4 '>Statut</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <LocationRow key={location.id_reservation} {...location} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
        
    
export default HistoriqueLocations