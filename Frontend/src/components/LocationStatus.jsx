import React from 'react'

function LocationStatus() {
    return (

        <svg viewBox='0 0 45 45' className='w-50 h-50 m-5'>
            <circle cx={20} cy={20} r={19} fill='none' stroke='#317AC1' strokeDasharray={15} strokeDashoffset={40}>

            </circle>
            <circle cx={20} cy={20} r={19} fill='none' stroke='#24D26D' strokeDasharray={15} strokeDashoffset={20}>

            </circle>
             <circle cx={20} cy={20} r={19} fill='none' stroke='#F27438' strokeDasharray={15} strokeDashoffset={60}>

            </circle>
        </svg>

    )
}

export default LocationStatus