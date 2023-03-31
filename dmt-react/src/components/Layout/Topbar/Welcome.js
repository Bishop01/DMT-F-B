import React from 'react'

const Welcome = ({ name }) => {
    return (
        <div className='flex flex-col'>
            <div>
                Welcome back
            </div>
            <div className='text-sm font-semibold'>
                {name}
            </div>
        </div>
    )
}

export default Welcome