// components/ReservationEditModal.jsx
function ReservationEditModal({
  reservation,
  formModif,
  onChange,
  onSubmit,
  onClose,
  loading,
  erreur,
  succes,
}) {
  if (!reservation) return null

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
        <h2 className='text-xl font-bold mb-1 text-blue-700'>Modifier la réservation</h2>
        <p className='text-gray-400 text-sm mb-5'>
          {reservation.client?.prenom} {reservation.client?.nom} —{' '}
          {reservation.vehicule?.marque} {reservation.vehicule?.modele}
        </p>

        {erreur && (
          <p className='text-red-500 mb-3 text-sm bg-red-50 border border-red-200 rounded px-3 py-2'>
            {erreur}
          </p>
        )}
        {succes && (
          <p className='text-green-600 mb-3 text-sm bg-green-50 border border-green-200 rounded px-3 py-2'>
            {succes}
          </p>
        )}

        <div className='flex flex-col gap-4'>
          <div>
            <label className='text-sm font-semibold text-gray-700'>Statut</label>
            <select
              value={formModif.status}
              onChange={e => onChange({ ...formModif, status: e.target.value })}
              className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
            >
              <option value='en_attente'>En attente</option>
              <option value='confirmee'>Confirmée</option>
              <option value='en_cours'>En cours</option>
              <option value='terminee'>Terminée</option>
              <option value='annulee'>Annulée</option>
            </select>
          </div>

          <div>
            <label className='text-sm font-semibold text-gray-700'>Montant final (DH)</label>
            <input
              type='number'
              min='0'
              step='0.01'
              placeholder={`Montant de base : ${reservation.montant_total} DH`}
              value={formModif.montant_final}
              onChange={e => onChange({ ...formModif, montant_final: e.target.value })}
              className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div className='flex justify-end gap-3 mt-2'>
            <button
              type='button'
              onClick={onClose}
              className='px-5 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors'
            >
              Annuler
            </button>
            <button
              type='button'
              onClick={onSubmit}
              disabled={loading}
              className='px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50'
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReservationEditModal
