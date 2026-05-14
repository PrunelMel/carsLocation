function LocationRow({ client="", vehicule="", utilisateur="", date_debut="", date_fin="", status="" }) {
  return (
    <tr className='bg-white hover:bg-gray-100 border-b border-gray-200'>
      <td className='py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 text-center'>{client.nom}</td>
      <td className='py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 text-center'>{vehicule.marque} {vehicule.modele}</td>
      <td className='py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 text-center hidden sm:table-cell'>{utilisateur.nom}</td>
      <td className='py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 text-center'>{date_debut}</td>
      <td className='py-3 px-2 md:px-4 text-xs md:text-sm text-gray-600 text-center hidden md:table-cell'>{date_fin}</td>
      <td className='py-3 px-2 md:px-4 text-xs md:text-sm text-center'>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          status === 'confirmee' ? 'bg-green-100 text-green-700' :
          status === 'en_cours' ? 'bg-blue-100 text-blue-700' :
          status === 'terminee' ? 'bg-gray-100 text-gray-700' :
          status === 'annulee' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {status}
        </span>
      </td>
    </tr>
  )
}

function HistoriqueLocations({ locations }) {
  return (
    <div className='shadow-[0_0_5px_0_rgba(0,0,0,0.2)] p-3 md:p-5 rounded-xl bg-gray-50 border-3 border-white'>
      <h1 className='text-lg md:text-xl font-bold text-center mb-4'>Historique des Locations</h1>
      <div className='overflow-x-auto'>
        <table className='w-full min-w-max md:min-w-full bg-gray-50 rounded-lg'>
          <thead>
            <tr className='bg-gray-100 text-gray-500 uppercase text-xs md:text-sm rounded-full'>
              <th className='py-3 px-2 md:px-4 font-semibold'>Client</th>
              <th className='py-3 px-2 md:px-4 font-semibold'>Véhicule</th>
              <th className='py-3 px-2 md:px-4 font-semibold hidden sm:table-cell'>Agent</th>
              <th className='py-3 px-2 md:px-4 font-semibold'>Début</th>
              <th className='py-3 px-2 md:px-4 font-semibold hidden md:table-cell'>Fin</th>
              <th className='py-3 px-2 md:px-4 font-semibold'>Statut</th>
            </tr>
          </thead>
          <tbody>
            {locations.length > 0 ? (
              locations.map((location) => (
                <LocationRow key={location.id_reservation} {...location} />
              ))
            ) : (
              <tr>
                <td colSpan="6" className='py-8 px-4 text-center text-gray-400 text-sm'>
                  Aucune location enregistrée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
        
    
export default HistoriqueLocations