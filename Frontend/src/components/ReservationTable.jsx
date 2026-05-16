import { STATUS_COLORS, STATUS_LABELS } from './ReservationFilters'

function ReservationTable({ reservations, onEdit, onDelete }) {
  if (reservations.length === 0) {
    return (
      <div className='p-10 text-center text-gray-400'>Aucune réservation trouvée</div>
    )
  }

  return (
    <div className='px-5 pb-10'>
      <div className='overflow-x-auto bg-white rounded-xl shadow'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-200 text-gray-600 uppercase text-xs'>
            <tr>
              <th className='px-4 py-3 text-left'>Client</th>
              <th className='px-4 py-3 text-left'>Véhicule</th>
              <th className='px-4 py-3 text-left'>Agent</th>
              <th className='px-4 py-3 text-left'>Début</th>
              <th className='px-4 py-3 text-left'>Fin</th>
              <th className='px-4 py-3 text-left'>Montant</th>
              <th className='px-4 py-3 text-left'>Statut</th>
              <th className='px-4 py-3 text-left'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id_reservation} className='border-b hover:bg-gray-50'>
                <td className='px-4 py-3'>
                  <p className='font-medium'>{r.client?.prenom} {r.client?.nom}</p>
                  <p className='text-gray-400 text-xs'>{r.client?.email}</p>
                </td>
                <td className='px-4 py-3'>{r.vehicule?.marque} {r.vehicule?.modele}</td>
                <td className='px-4 py-3'>{r.utilisateur?.prenom} {r.utilisateur?.nom}</td>
                <td className='px-4 py-3'>{r.date_debut}</td>
                <td className='px-4 py-3'>{r.date_fin}</td>
                <td className='px-4 py-3'>
                  <p>{r.montant_total} DH</p>
                  {r.montant_final != null && (
                    <p className='text-xs text-gray-400'>Final : {r.montant_final} DH</p>
                  )}
                </td>
                <td className='px-4 py-3'>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[r.status] || 'bg-gray-100'}`}>
                    {STATUS_LABELS[r.status] || r.status}
                  </span>
                </td>
                <td className='px-4 py-3'>
                  <div className='flex gap-3'>
                    <button
                      onClick={() => onEdit(r)}
                      className='text-blue-600 font-semibold hover:underline'
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDelete(r.id_reservation)}
                      className='text-red-500 font-semibold hover:underline'
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

export default ReservationTable
