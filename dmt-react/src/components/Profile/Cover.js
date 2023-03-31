import React, { useState } from 'react'
import { IoCameraSharp } from "react-icons/io5"
import { motion } from "framer-motion"

const Cover = () => {

    const [hover, setHover] = useState(false);
    const style = {
        cover: 'shadow-lg overflow-hidden absolute flex w-full bg-sky-100 h-[200px] rounded-tl-[70px] z-[-1]',
        profilePic: 'w-40 h-40 p-1 rounded-full bg-gray-200',
        camera: `${hover ? "text-white shadow-lg" : ""} relative mt-auto mb-2 border-2 rounded-full hover:cursor-pointer hover:bg-[#30D5C8] hover:transition`
    }
    const animation = {
        hover: {
            rotate: [0, 0, 270, 270, 0],
            scale: [1, 1.5, 1.5, 1, 1],
            transition: {
                times: [],
                repeat: Infinity,
                repeatDelay: 0.5,
                duration: 2
            }
        }
    }
    return (
        <div className='relative w-full'>
            <div className={style.cover}>
                <img className='w-full h-full' src='images/metro.jpg' />
            </div>
            <div className='pt-24 pl-5 flex w-full'>
                <img className={style.profilePic} src='images/dummyProfile.jpg' />
                <motion.div
                    variants={animation}
                    whileHover={"hover"}
                    onMouseEnter={e => setHover(true)}
                    onMouseLeave={e => setHover(false)}
                    className={style.camera} >
                    <IoCameraSharp className='h-8 w-8 p-1' />
                </motion.div>
            </div>
        </div >
    )
}

export default Cover