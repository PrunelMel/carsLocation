function getStatusStyle(status) {
  const styles = {
    'disponible': 'bg-green-100 text-green-800',
    'louer': 'bg-blue-100 text-blue-800',
    'maintenance': 'bg-red-100 text-red-800',
  }
  return styles[status] || 'bg-gray-100 text-gray-800'
}

function VehiculeCard({ marque = '', modele = '', status = '', immatriculation = '' }) {
  return (
    <div className='flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2'>
      <div>
        <p className='font-medium text-gray-800'>{marque} {modele}</p>
        <p className='text-xs text-gray-400'>{immatriculation}</p>
      </div>
      {status && (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(status)}`}>
          {status}
        </span>
      )}
    </div>
  )
}

function VehiculesCard({ vehicules = [] }) {
  return (
    <div className='bg-white rounded-xl shadow-[0_0_5px_0_rgba(0,0,0,0.2)] p-5'>
      <h1 className='text-lg font-bold mb-3'>Véhicules ({vehicules.length})</h1>
      <div className='flex flex-col gap-2 max-h-64 overflow-y-auto'>
        {vehicules.length === 0
          ? <p className='text-gray-400 text-sm'>Aucun véhicule</p>
          : vehicules.map((vehicule) => (
            <VehiculeCard key={vehicule.id_vehicule} {...vehicule} />
          ))
        }
      </div>
    </div>
  )
}

export default VehiculesCard
