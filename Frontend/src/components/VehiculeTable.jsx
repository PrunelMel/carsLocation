// components/VehiculeTable.jsx
const STATUS_COLORS = {
  disponible: 'bg-green-100 text-green-800',
  louer: 'bg-blue-100 text-blue-800',
  maintenance: 'bg-red-100 text-red-800',
}

const STATUS_LABELS = {
  disponible: 'Disponible',
  louer: 'Loué',
  maintenance: 'Maintenance',
}

function VehiculeTable({ vehicules, onEdit, onDelete }) {
  if (vehicules.length === 0) {
    return <div className='p-10 text-center text-gray-400'>Aucun véhicule trouvé</div>
  }

  return (
    <div className='px-3 md:px-5'>
      <div className='overflow-x-auto bg-white rounded-xl shadow'>
        <table className='w-full min-w-max text-xs md:text-sm'>
          <thead className='bg-gray-100 text-gray-600 text-xs md:text-sm uppercase'>
            <tr>
              <th className='px-2 md:px-4 py-3 text-left'>Marque</th>
              <th className='px-2 md:px-4 py-3 text-left'>Modèle</th>
              <th className='px-2 md:px-4 py-3 text-left hidden sm:table-cell'>Carburant</th>
              <th className='px-2 md:px-4 py-3 text-left'>Prix/Jour</th>
              <th className='px-2 md:px-4 py-3 text-left'>Statut</th>
              <th className='px-2 md:px-4 py-3 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicules.map(v => (
              <tr key={v.id_vehicule} className='border-t hover:bg-gray-50'>
                <td className='px-2 md:px-4 py-3 font-medium'>{v.marque || 'N/A'}</td>
                <td className='px-2 md:px-4 py-3'>{v.modele || 'N/A'}</td>
                <td className='px-2 md:px-4 py-3 font-mono text-xs md:text-sm hidden sm:table-cell'>{v.carburant || 'N/A'}</td>
                <td className='px-2 md:px-4 py-3'>{v.prix_par_jour || '0'} DH</td>
                <td className='px-2 md:px-4 py-3'>
                  <span
                    className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                      STATUS_COLORS[v.status] || 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {STATUS_LABELS[v.status] || v.status}
                  </span>
                </td>
                <td className='px-2 md:px-4 py-3'>
                  <div className='flex flex-col sm:flex-row justify-center gap-2'>
                    <button
                      onClick={() => onEdit(v)}
                      className='text-blue-600 font-semibold text-xs md:text-sm hover:text-blue-800'
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(v.id_vehicule)}
                      className='text-red-500 font-semibold text-xs md:text-sm hover:text-red-700'
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VehiculeTable
