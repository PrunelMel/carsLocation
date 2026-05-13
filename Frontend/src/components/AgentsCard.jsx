function AgentCard({ nom, prenom, email }) {
  return (
    <div >
      <div>
        <svg viewBox='0 0 100 100' className='h-5'>
          <circle cx={50} cy={50} r={40} />
          <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fill='var(--color-blue-500)'
            className='text-6xl font-semibold '

          >
            {nom.at(0)}
          </text>
        </svg>
        {nom && <p className='text-2xl font-semibold '>{prenom} {nom}</p>}
        {email && <p className='text-gray-500'>{email}</p>}</div>
    </div>
  )
}

function AgentsCard({ agents }) {
  return (
    <div>
    <h1>Agents</h1>
    <div className='flex flex-wrap gap-5'>
      {agents.map((agent) => (
        <AgentCard key={agent.id_user} {...agent} />
      ))}
      </div>
    </div>
  )
}

export default AgentsCard