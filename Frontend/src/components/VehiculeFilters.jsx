function VehiculeFilters({ vehicules, filter, onFilterChange }) {
  const count = (s) => vehicules.filter(v => v.status === s).length

  const filters = [
    { key: 'tous', label: `Tous (${vehicules.length})` },
    { key: 'disponible', label: `Disponibles (${count('disponible')})` },
    { key: 'louer', label: `Loués (${count('louer')})` },
    { key: 'maintenance', label: `Maintenance (${count('maintenance')})` },
  ]

  return (
    <div className='px-5 flex gap-2 flex-wrap mb-4'>
      {filters.map(btn => (
        <button
          key={btn.key}
          onClick={() => onFilterChange(btn.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === btn.key
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  )
}

export default VehiculeFilters
