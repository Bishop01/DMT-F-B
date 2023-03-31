import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { IoMdArrowDropright } from "react-icons/io"
import { MdOutlineSort } from "react-icons/md"
import { motion, AnimatePresence } from "framer-motion"

const FilterBox = () => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className='w-full p-3 space-y-6 bg-[#30D5C8] rounded-lg shadow-lg divide-y'>
            <div className='flex flex-col space-y-2'>
                <div className='flex items-center space-x-1 text-gray-700'>
                    <AiOutlineSearch />
                    <label className='font-semibold'>Search</label>
                </div>
                <input className='text-sm px-2 py-1 border border-teal-400 rounded-lg w-full' type="text" placeholder='Enter transaction id' />
            </div>
            <div className='flex flex-col h-full'>
                <div className='flex items-center space-x-1 text-gray-700 pt-2 hover:cursor-pointer' onClick={e => setExpanded(!expanded)}>
                    <IoMdArrowDropright className='w-6 h-6' />
                    <label className='font-semibold hover:cursor-pointer'>Filter</label>
                </div>
                <AnimatePresence>
                    {expanded &&
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            transition={{ duration: 0.6 }}
                            exit={{ height: 0 }}
                            className='text-white divide-y h-full overflow-hidden whitespace-nowrap'>
                            <div className='flex flex-col space-y-1 py-2 mb-1'>
                                <div className='flex items-center'>
                                    <label className='font-semibold text-sm'>Transactions After</label>
                                    <button className='ml-auto text-sm bg-[#2aa39a] text-white py-1 px-2 rounded-lg'>Apply</button>
                                </div>
                                <input className='rounded-lg p-1 text-black text-sm' type="date" />
                            </div>
                            <div className='flex flex-col space-y-1 py-2 mb-1'>
                                <div className='flex items-center'>
                                    <label className='font-semibold text-sm'>Transactions Before</label>
                                    <button className='ml-auto text-sm bg-[#2aa39a] text-white py-1 px-2 rounded-lg'>Apply</button>
                                </div>
                                <input className='rounded-lg p-1 text-black text-sm' type="date" />
                            </div>
                            <div className='flex flex-col space-y-1 py-2 mb-1'>
                                <div className='flex items-center'>
                                    <label className='font-semibold text-sm'>Transactions Between</label>
                                    <button className='ml-auto text-sm bg-[#2aa39a] text-white py-1 px-2 rounded-lg'>Apply</button>
                                </div>
                                <input className='rounded-lg p-1 text-black text-sm' type="date" />
                            </div>
                            <div className='flex flex-col space-y-2 py-2 mb-1'>
                                <div className='flex items-center'>
                                    <MdOutlineSort className='h-5 w-5' />
                                    <label className='font-semibold text-sm'>Sort By</label>
                                </div>
                                <div className='flex items-center'>
                                    <select className='text-black rounded-lg px-2 py-1 text-sm w-[50%]'>
                                        <option>Date</option>
                                        <option>Price</option>
                                    </select>
                                    <button className='ml-auto text-sm bg-[#2aa39a] text-white py-1 px-2 rounded-lg'>Apply</button>
                                </div>
                            </div>
                        </motion.div>}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default FilterBox