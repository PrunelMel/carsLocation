// components/AgentCard.jsx
function AgentCard({ agent, onEdit, onDelete }) {
  const initiales = `${agent.prenom?.[0] ?? ''}${agent.nom?.[0] ?? ''}`.toUpperCase()

  return (
    <div className='bg-white rounded-xl shadow p-5 flex flex-col gap-3'>
      <div className='flex items-center gap-4'>
        {agent.img ? (
          <img src={agent.img} alt={agent.nom} className='w-12 h-12 rounded-full object-cover' />
        ) : (
          <div className='w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg'>
            {initiales}
          </div>
        )}
        <div>
          <p className='font-semibold text-gray-800'>{agent.prenom} {agent.nom}</p>
          <p className='text-xs text-gray-400'>{agent.email}</p>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <span className='px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium capitalize'>
          {agent.role}
        </span>
        {agent.created_at && (
          <span className='text-xs text-gray-400'>
            Créé le {new Date(agent.created_at).toLocaleDateString('fr-FR')}
          </span>
        )}
      </div>

      <div className='flex gap-3 pt-1 border-t border-gray-100'>
        <button
          onClick={() => onEdit(agent)}
          className='flex-1 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded transition-colors'
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(agent.id_user)}
          className='flex-1 py-1.5 text-sm font-semibold text-red-500 hover:bg-red-50 rounded transition-colors'
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}

export default AgentCard
