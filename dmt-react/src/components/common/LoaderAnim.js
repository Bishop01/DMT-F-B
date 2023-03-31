import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimationControls } from "framer-motion"

const LoaderAnim = () => {

    const [turn, setTurn] = useState(null);
    const controls = useAnimationControls()

    useEffect(() => {
        controls.start(animation.animate)

        setTimeout(() => {
            setTurn(turn % 5 + 1)
            console.log(turn)
        }, 1000)

    }, [turn])

    const animation = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 0.5,
                ease: "easeIn",
            }
        }
    }

    const style = {
        dots: 'bg-[#30D5C8] rounded-full w-3 h-3'
    }

    return (
        <div className='absolute flex flex-col space-y-2 w-full h-full items-center pt-[20%]'>
            <div className='font-bold tracking-wider text-lg'>
                Loading
            </div>
            <div className='flex space-x-2'>
                <motion.div
                    animate={turn === 1 ? controls : ""}
                    key={1}
                    className={style.dots} />
                <motion.div
                    animate={turn === 2 ? controls : ""}
                    key={2}
                    className={style.dots} />
                <motion.div
                    animate={turn === 3 ? controls : ""}
                    key={3}
                    className={style.dots} />
                <motion.div
                    animate={turn === 4 ? controls : ""}
                    key={3}
                    className={style.dots} />
                <motion.div
                    animate={turn === 5 ? controls : ""}
                    key={3}
                    className={style.dots} />
            </div>
        </div>
    )
}

export default LoaderAnim