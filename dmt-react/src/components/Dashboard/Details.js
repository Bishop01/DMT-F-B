import React, { useState } from 'react'
import { MdTrain } from "react-icons/md"
import { motion, AnimatePresence } from "framer-motion"


const Details = ({ key }) => {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open)
    }

    const style = {
        text: 'font-semibold overflow-hidden whitespace-nowrap flex space-x-5 text-sm text-white bg-[#30D5C8] shadow-lg rounded-lg',
        icon: 'right-0 absolute rounded-full p-1 bg-[#30D5C8] shadow-lg hover:cursor-pointer hover:bg-[#1dada2] hover:transition'
    }

    const animateFrom = {
        width: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
    }
    const animateTo = {
        width: "auto",
        paddingTop: "8px",
        paddingBottom: "8px",
        paddingLeft: "12px",
        paddingRight: "12px",
    }

    return (
        <div className='relative flex'>
            {open &&
                <AnimatePresence>
                    <motion.div
                        key={key}
                        initial={animateFrom}
                        animate={animateTo}
                        exit={animateFrom}
                        transition={{ type: "none", duration: 0.5 }}
                        className={style.text}>
                        <div>
                            <div>
                                Previous Station
                            </div>
                            <div>
                                Next Station
                            </div>
                        </div>
                        <div className='pr-5'>
                            <div>
                                Left Station
                            </div>
                            <div>
                                Estimate time for Station
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>}
            <AnimatePresence>
                <motion.div
                    key={key + "1"}
                    initial={open ? { scale: 1, } : ""}
                    animate={open ? { scale: 0.6, } : ""}
                    className={style.icon} onClick={toggle}>
                    <MdTrain className='w-8 h-8 text-white' />
                </motion.div>
            </AnimatePresence>
        </div >
    )
}

export default Details