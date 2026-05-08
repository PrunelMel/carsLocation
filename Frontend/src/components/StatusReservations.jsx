import React from 'react'

function StatusReservations({ enAttente=0, confirmees=0, enCours=0, terminees=0, annulees=0 }) {
  const total = enAttente + confirmees + enCours + terminees + annulees;
  const enAttenteAngle = (enAttente / total) * 360;
  const confirmeesAngle = (confirmees / total) * 360;
  const enCoursAngle = (enCours / total) * 360;
  const termineesAngle = (terminees / total) * 360;
  const annuleesAngle = (annulees / total) * 360;

  return (
    <div className='grid grid-cols-1 shadow-[0_0_5px_0_rgba(0,0,0,0.2)] p-5 rounded-xl bg-white'>
      <h2 className='text-xl font-bold mb-4 text-center '>Statut des Réservations</h2>
      <div className='grid grid-cols-1'>
        <svg viewBox='0 0 36 36' className='h-40 pb-5 justify-self-center self-center' >


          <circle cx='18' cy='18' r='16' fill="none" stroke='#3b82f6' strokeWidth='3'
            pathLength="360"
            strokeDasharray={`${enAttenteAngle} 360`}
            strokeDashoffset='0' />

          <circle cx='18' cy='18' r='16' fill="none" stroke='#10b981' strokeWidth='3'
            pathLength="360"
            strokeDasharray={`${confirmeesAngle} 360`}
            strokeDashoffset={`-${enAttenteAngle}`} />

          <circle cx='18' cy='18' r='16' fill="none" stroke='#f59e0b' strokeWidth='3'
            pathLength="360"
            strokeDasharray={`${enCoursAngle} 360`}
            strokeDashoffset={`-${enAttenteAngle + confirmeesAngle}`} />

          <circle cx='18' cy='18' r='16' fill="none" stroke='#6b7280' strokeWidth='3'
            pathLength="360"
            strokeDasharray={`${termineesAngle} 360`}
            strokeDashoffset={`-${enAttenteAngle + confirmeesAngle + enCoursAngle}`} />

          <circle cx='18' cy='18' r='16' fill="none" stroke='#ef4444' strokeWidth='3'
            pathLength="360"
            strokeDasharray={`${annuleesAngle} 360`}
            strokeDashoffset={`-${enAttenteAngle + confirmeesAngle + enCoursAngle + termineesAngle}`} />
          <text x="18" y="18" textAnchor="middle" dominantBaseline="central" fill='#99a1af' fontSize={6} >Total: {total}</text>
        </svg>


        <div className=' flex flex-col gap-4'>

          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-3'>

              <span className='w-4 h-4 bg-blue-500 rounded-full '></span>

              <span className='text-gray-600 font-medium'>En Attente</span>
            </div>

            <span className='text-slate-800 font-bold'>
              {enAttente}/{total}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start gap-3'>
              <span className='w-4 h-4 bg-emerald-500 rounded-full '></span>
              <span className='text-gray-600 font-medium'>Confirmées</span>
            </div>
            <span className='text-slate-800 font-bold'>
              {confirmees}/{total}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='w-4 h-4 bg-amber-500 rounded-full '></span>
              <span className='text-gray-600 font-medium'>En Cours</span>
            </div>
            <span className='text-slate-800 font-bold'>
              {enCours}/{total}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='w-4 h-4 bg-gray-500 rounded-full '></span>
              <span className='text-gray-600 font-medium'>Terminées</span>
            </div>
            <span className='text-slate-800 font-bold'>
              {terminees}/{total}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='w-4 h-4 bg-red-500 rounded-full '></span>
              <span className='text-gray-600 font-medium'>Annulées</span>
            </div>
            <span className='text-slate-800 font-bold'>
              {annulees}/{total}
            </span>
          </div>

          
        </div>
      </div>


    </div>
  )
}

export default StatusReservations
