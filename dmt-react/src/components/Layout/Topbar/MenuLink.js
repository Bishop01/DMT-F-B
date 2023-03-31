import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react';

const MenuLink = ({ icon, text, k }) => {

    const [hover, setHover] = useState(false);
    const style = {
        btn: 'hover:shadow-md rounded-full p-1 pl-3 flex items-center justify-center hover:cursor-pointer hover:bg-[#30D5C8]',
        text: "mr-2 text-white font-semibold whitespace-nowrap overflow-hidden",
    }

    const onHover = () => {
        setHover(true)
    }

    const animateFrom = {
        width: 0
    }
    const animateTo = {
        width: "auto"
    }

    return (
        <button
            className={style.btn}
            onMouseEnter={e => onHover()}
            onMouseLeave={e => setHover(false)}>
            <AnimatePresence>
                {hover &&
                    //console.log(char);
                    <motion.div
                        key={k}
                        initial={animateFrom}
                        animate={animateTo}
                        exit={animateFrom}
                        transition={{ duration: 1, type: "spring" }}
                        className={style.text}
                    >
                        {text}
                    </motion.div>
                }
            </AnimatePresence>
            <motion.div
                animate={hover ? { rotate: [0, 360], scale: [1, 1.2, 1] } : ""}
                transition={{ duration: 0.5, type: "bounce" }}>
                {icon}
            </motion.div>
        </button >
    )
}

export default MenuLink