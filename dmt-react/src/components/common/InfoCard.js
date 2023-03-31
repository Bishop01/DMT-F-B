import React from 'react'

const InfoCard = ({ header, icon, value, bottomIcon, url }) => {
    return (
        <div className="relative font-semibold w-[300px] flex bg-white h-[150px] rounded-lg px-6 py-4">
            <div className='flex flex-col justify-between'>
                <div className='flex items-center space-x-2 text-gray-500'>
                    <div>{icon}</div>
                    <p className=''>{header}</p>
                </div>
                <div className='flex items-center text-2xl mb-3 ml-2'>
                    <div>{value}</div>
                    <div>{bottomIcon}</div>
                </div>
            </div>
            <div className='absolute right-0 bottom-0 mb-5 mr-10'>
                <img className='scale-110' src={url} />
            </div>
        </div>
    )
}

export default InfoCard