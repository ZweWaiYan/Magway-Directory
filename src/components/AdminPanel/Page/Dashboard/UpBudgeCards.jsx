import React from 'react'

import upArrow from '../../../../assets/upArrow.png';

const UpBudgetCards = () => {
    return (
        <div className='rounded-lg border  w-72 h-20 shadow-md'>
            <div className='flex justify-center items-center pt-3 p-2'>
                <div>
                    <p className='font-bold text-2xl'>291.8 K</p>
                    <div className='flex'>
                        <p>Total Income</p>
                        <p className='pl-3.5 text-green-400'>+ 3.5 %</p>
                    </div>
                </div>
                <div className='pl-10'>
                    <img className='w-12' src={upArrow} alt='' />
                </div>
            </div>
        </div>
    )
}

export default UpBudgetCards