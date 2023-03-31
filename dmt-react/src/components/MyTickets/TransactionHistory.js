import React, { useEffect, useState } from 'react'
import FilterBox from '../common/FilterBox'
import Transaction from '../common/Transaction'

const TransactionHistory = () => {
    const [tExpanded, setExpanded] = useState(0);

    const onClick = (index) => {
        //console.log(e)
        setExpanded(index)
    }

    useEffect(() => {

    })

    return (
        <div className='flex w-full h-full px-3 py-6'>
            <div className='w-[25%]'>
                <FilterBox />
            </div>
            <div className='relative ml-auto w-[50%] mr-5'>
                <div className='absolute space-y-5 h-full overflow-y-auto w-full pr-2'>
                    <Transaction key={0} onClick={onClick} index={0} expanded={tExpanded === 0 ? true : false} />
                    <Transaction key={1} onClick={onClick} index={1} expanded={tExpanded === 1 ? true : false} />
                    <Transaction key={2} onClick={onClick} index={2} expanded={tExpanded === 2 ? true : false} />
                </div>
            </div>
        </div>
    )
}

export default TransactionHistory