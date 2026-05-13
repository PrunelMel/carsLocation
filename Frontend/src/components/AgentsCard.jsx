function AgentCard({ nom = '', prenom = '', email = '' }) {
  return (
    <div className='flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm'>
      <svg viewBox='0 0 100 100' className='h-10 w-10 flex-shrink-0'>
        <circle cx={50} cy={50} r={45} fill='#dbeafe' />
        <text
          x="50" y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fill='#2563eb'
          fontSize="48"
          fontWeight="bold"
        >
          {nom ? nom.at(0).toUpperCase() : '?'}
        </text>
      </svg>
      <div>
        {nom && <p className='font-semibold'>{prenom} {nom}</p>}
        {email && <p className='text-gray-500 text-sm'>{email}</p>}
      </div>
    </div>
  )
}

function AgentsCard({ agents = [] }) {
  return (
    <div className='bg-white rounded-xl shadow-[0_0_5px_0_rgba(0,0,0,0.2)] p-5'>
      <h1 className='text-lg font-bold mb-3'>Agents ({agents.length})</h1>
      <div className='flex flex-col gap-3'>
        {agents.length === 0
          ? <p className='text-gray-400 text-sm'>Aucun agent</p>
          : agents.map((agent) => (
            <AgentCard key={agent.id_user} {...agent} />
          ))
        }
      </div>
    </div>
  )
}

export default AgentsCard
