import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const MenuLink = ({ text, path, icon, animateFrom, animateTo, transitionDuration, onClick }) => {

    const [selected, setSelected] = useState(false);
    const ref = useRef(icon);

    const style = {
        container: `${selected ? "bg-[#30D5C8] text-white font-semibold" : ""} w-full px-3 py-1 flex items-center hover:cursor-pointer rounded-lg hover:bg-[#30D5C8] hover:transition hover:delay-[10ms] transition delay-75 hover:text-white`,
        link: 'pl-2 flex items-center p-2',
    }

    const rotateFrom = { rotate: 0 };
    const rotateTo = { rotate: 360 };

    return (
        <NavLink
            className={style.container}
            to={path}
            onClick={e => onClick(e)}
            style={({ isActive }) => {
                isActive ? setSelected(true) : setSelected(false)
            }}>
            <motion.div className='flex items-center'
                initial={animateFrom}
                animate={animateTo}
                transition={{ delay: transitionDuration }}
            >
                <motion.span
                    initial={selected ? rotateFrom : ""}
                    animate={selected ? rotateTo : ""}
                >{icon}</motion.span><span className='ml-2'>{text}</span>
            </motion.div>
        </NavLink >

    )
}

export default MenuLink