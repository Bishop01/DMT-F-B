import React from 'react'
import { BsArrowRightCircle } from "react-icons/bs"
import { motion, AnimatePresence } from "framer-motion"

const Transaction = ({ expanded, onClick, index }) => {

    const style = {
        container: `text-gray-700 w-full ${expanded ? "bg-[#DEE8FD] shadow-none" : "bg-[#30D5C8] shadow-lg"} px-4 py-2 rounded-lg font-semibold text-sm divide-y divide-gray-700`
    }

    return (
        <div className={style.container}>
            <div className='flex items-center h-[40px] hover:cursor-pointer' onClick={e => onClick(index)}>
                <BsArrowRightCircle className='w-4 h-4 mr-2' />
                <div className=''>Transaction ID:&emsp;<span>Trx-021923475923-Wlt</span></div>
                <div className='ml-auto'>Date:&emsp;<span>10/10/2022</span></div>
            </div>
            <AnimatePresence>
                {expanded &&
                    <motion.div
                        initial={{ height: 0, padding: "0" }}
                        animate={{ height: "200px" }}
                        transition={{ duration: 0.8 }}
                        exit={{ height: 0, transition: { duration: 0.5 } }}
                        className='whitespace-nowrap overflow-hidden py-3 flex h-0 relative w-full'>
                        <div className='flex flex-col space-y-3 w-[60%] pl-8'>
                            <div className='space-y-3'>
                                <div className='text-base font-bold pt-2'>Location Details-</div>

                                <div>
                                    <div>
                                        Pickup Station - Mirpur-10
                                    </div>
                                    <div>
                                        Destination Station - Mirpur-10
                                    </div>
                                </div>
                            </div>
                            <div className='space-y-3'>
                                <div className='text-base text-gray-700 font-bold'>Ticket Details-</div>
                                <div>
                                    <div>
                                        Ticket ID - tkt-001294x95723
                                    </div>
                                    <div>
                                        Price - 20 BDT
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <img className=' ml-auto p-2 max-w-[100%]' src='/images/QR.png' />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div >
    )
}

export default Transaction