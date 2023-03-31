import React from 'react'

const ConfirmModal = () => {
    return (
        <div className='absolute flex items-center justify-center'>
            <div className='w-[50%] bg-white flex flex-col'>
                <div>
                    Do you wish to logout?
                </div>

                <div className='flex'>
                    <button>
                        Yes
                    </button>
                    <button>
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal