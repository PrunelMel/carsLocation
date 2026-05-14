// components/AgentModal.jsx
function AgentModal({ isOpen, onClose, modeEdition, agent, onChange, onSubmit, saving, erreur, succes }) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
      <div className='bg-white rounded-2xl shadow-xl p-8 w-full max-w-md'>
        <h2 className='text-xl font-bold mb-1 text-blue-700'>
          {modeEdition ? "Modifier l'agent" : 'Ajouter un agent'}
        </h2>
        <p className="text-gray-400 text-sm mb-5">
          {modeEdition ? "Mettez à jour les informations de l'agent" : "Remplissez les informations du nouvel agent"}
        </p>

        {erreur && <p className='text-red-500 mb-3 text-sm bg-red-50 border border-red-200 rounded px-3 py-2'>{erreur}</p>}
        {succes && <p className='text-green-600 mb-3 text-sm bg-green-50 border border-green-200 rounded px-3 py-2'>{succes}</p>}

        <div className='flex flex-col gap-4'>
          <div className='grid grid-cols-2 gap-3'>
             <div  className='hidden'>
              <label className='text-sm font-semibold text-gray-700'>ID agent</label>
              <input
                type='text'
                required
                placeholder='Dupont'
                value={agent.id_agent}
                onChange={e => onChange({ ...agent, id_user: e.target.value })}
              
              />
            </div>
            <div>
              <label className='text-sm font-semibold text-gray-700'>Nom</label>
              <input
                type='text'
                required
                placeholder='Dupont'
                value={agent.nom}
                onChange={e => onChange({ ...agent, nom: e.target.value })}
                className='w-full h-10 border border-gray-300 rounded px-3 mt-1 '
              />
            </div>
            <div>
              <label className='text-sm font-semibold text-gray-700'>Prénom</label>
              <input
                type='text'
                required
                placeholder='Jean'
                value={agent.prenom}
                onChange={e => onChange({ ...agent, prenom: e.target.value })}
                className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
              />
            </div>
          </div>

          

          <div>
            <label className='text-sm font-semibold text-gray-700'>Email</label>
            <input
              type='email'
              required
              placeholder='jean.dupont@example.com'
              value={agent.email}
              onChange={e => onChange({ ...agent, email: e.target.value })}
              className='w-full h-10 border border-gray-300 rounded px-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-gray-700'>
              {modeEdition ? 'Nouveau mot de passe' : 'Mot de passe'}
            </label>
            <input
              type='password'
              required={!modeEdition}
              placeholder={modeEdition && '••••••••'}
              value={agent.mot_de_passe}
              onChange={e => onChange({ ...agent, mot_de_passe: e.target.value })}
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

export default AgentModal
