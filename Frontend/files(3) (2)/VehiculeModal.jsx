// components/VehiculeModal.jsx
function VehiculeModal({
  isOpen,
  onClose,
  modeEdition,
  vehicule,
  onChange,
  onSubmit,
  saving,
  erreur,
  succes,
}) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
        <h2 className='text-xl font-bold mb-1 text-blue-700'>
          {modeEdition ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
        </h2>
        <p className='text-gray-400 text-sm mb-5'>
          {modeEdition ? 'Mettez à jour les informations du véhicule' : 'Remplissez les détails du nouveau véhicule'}
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
          {!modeEdition && (
            <div>
              <label className='text-sm font-semibold text-gray-700'>ID Véhicule</label>
              <input
                type='text'
                required
                placeholder='VH001'
                value={vehicule.id_vehicule}
                onChange={e => onChange({ ...vehicule, id_vehicule: e.target.value })}
                className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
          )}

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='text-sm font-semibold text-gray-700'>Marque</label>
              <input
                type='text'
                required
                placeholder='Toyota'
                value={vehicule.marque}
                onChange={e => onChange({ ...vehicule, marque: e.target.value })}
                className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
            <div>
              <label className='text-sm font-semibold text-gray-700'>Modèle</label>
              <input
                type='text'
                required
                placeholder='Corolla'
                value={vehicule.modele}
                onChange={e => onChange({ ...vehicule, modele: e.target.value })}
                className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='text-sm font-semibold text-gray-700'>Carburant</label>
              <select
                value={vehicule.carburant}
                onChange={e => onChange({ ...vehicule, carburant: e.target.value })}
                className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white'
              >
                <option value=''>-- Choisir --</option>
                <option value='Essence'>Essence</option>
                <option value='Diesel'>Diesel</option>
                <option value='Électrique'>Électrique</option>
                <option value='Hybride'>Hybride</option>
              </select>
            </div>
            <div>
              <label className='text-sm font-semibold text-gray-700'>Prix/Jour (DH)</label>
              <input
                type='number'
                min='1'
                required
                placeholder='350'
                value={vehicule.prix_par_jour}
                onChange={e => onChange({ ...vehicule, prix_par_jour: e.target.value })}
                className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
          </div>

          <div>
            <label className='text-sm font-semibold text-gray-700'>Statut</label>
            <select
              value={vehicule.status}
              onChange={e => onChange({ ...vehicule, status: e.target.value })}
              className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white'
            >
              <option value='disponible'>Disponible</option>
              <option value='louer'>Loué</option>
              <option value='maintenance'>Maintenance</option>
            </select>
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
              disabled={saving}
              className='px-5 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50'
            >
              {saving ? 'Enregistrement...' : modeEdition ? 'Mettre à jour' : 'Ajouter'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehiculeModal
