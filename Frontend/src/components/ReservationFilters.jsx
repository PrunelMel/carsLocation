export const STATUS_COLORS = {
  en_attente: 'bg-blue-100 text-blue-700',
  confirmee: 'bg-emerald-100 text-emerald-700',
  en_cours: 'bg-amber-100 text-amber-700',
  terminee: 'bg-gray-100 text-gray-600',
  annulee: 'bg-red-100 text-red-600',
}

export const STATUS_LABELS = {
  en_attente: 'En attente',
  confirmee: 'Confirmée',
  en_cours: 'En cours',
  terminee: 'Terminée',
  annulee: 'Annulée',
}

function ReservationFilters({ reservations, filterStatus, onFilterChange }) {
  const count = (s) => reservations.filter(r => r.status === s).length

  const filters = [
    { key: 'tous', label: `Toutes (${reservations.length})` },
    { key: 'en_attente', label: `En attente (${count('en_attente')})` },
    { key: 'confirmee', label: `Confirmées (${count('confirmee')})` },
    { key: 'en_cours', label: `En cours (${count('en_cours')})` },
    { key: 'terminee', label: `Terminées (${count('terminee')})` },
    { key: 'annulee', label: `Annulées (${count('annulee')})` },
  ]

  return (
    <div className='px-5 pb-3 flex flex-wrap gap-2'>
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            filterStatus === key
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default ReservationFilters
