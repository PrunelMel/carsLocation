import React from 'react'

function InfoCard({src,nombre=0,nom,device}) {
    
  return (
    <div className='flex items-center shadow-[0_0_5px_0_rgba(0,0,0,0.2)]  rounded-2xl bg-white h-30 hover:bg-[rgb(238,231,231)]'>
        <img src={src} alt="" className='m-2 w-12'/>
        <div>
        {nombre&&<p className='text-2xl font-semibold '>{nombre}{device &&` ${device}`}</p>}
        {nom&&<p className='text-gray-500'>{nom}</p>}</div>


    </div>
  )
}

export default InfoCard