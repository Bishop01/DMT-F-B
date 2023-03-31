import React, { useState } from 'react'
import { useAuth } from '../../Auth/AuthContext';
import { motion, AnimatePresence } from "framer-motion"
import Loader from "../common/Loader"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Security = () => {

    const [loading, setLoading] = useState(false)
    const { updatePassword, currentUser } = useAuth()

    const [user, setUser] = useState({
        id: currentUser.id,
        currentPassword: "",
        newPassword: ""
    });

    const style = {
        label: "font-semibold w-[10%]",
        details: 'flex w-full items-center',
        input: 'text-sm border py-2 px-4 rounded-lg w-[30%] mr-5 focus:outline-[#30D5C8]',
        conatiner: 'absolute overflow-y-auto flex flex-col w-full p-8 h-full',
        detials_container: 'flex flex-col space-y-10 p-8 h-full ml-10',
        icon: 'text-gray-400 w-6 h-6 p-1 rounded-lg hover:bg-gray-400 hover:text-white hover:transition hover:cursor-pointer',
        iconCheck: 'ml-2 text-gray-400 p-1 rounded-lg hover:bg-[#30D5C8] hover:text-white hover:transition hover:cursor-pointer',
    }

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onUpdate = async () => {
        debugger
        setLoading(true)
        const msg = await updatePassword(user)
        setLoading(false)
        if (msg.error.length > 0) {
            toast.error(msg.error, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else {
            toast.success(msg.success, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        loading ? <Loader /> :
            <AnimatePresence>
                <motion.div
                    key={"bio"}
                    initial={{ x: 100, padding: "18px", opacity: 0 }}
                    animate={{ x: 0, padding: "20px", opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    exit={{ x: -100, opacity: 0 }}
                    className={style.conatiner}>
                    <div className={style.detials_container}>
                        <div className={style.details}>
                            <label className={style.label}>Username</label>
                            <input name='id' type="text" className={style.input} defaultValue={currentUser.id} readOnly />
                        </div>
                        <div className={style.details}>
                            <label className={style.label}>Current Password</label>
                            <input name='currentPassword' type="password" className={style.input} onChange={(e) => onChange(e)} />
                        </div>
                        <div className={style.details}>
                            <label className={style.label}>New Password</label>
                            <input name='newPassword' type="password" className={style.input} onChange={(e) => onChange(e)} />
                        </div>

                        <div>
                            <button onClick={() => onUpdate()} className='text-white font-semibold border rounded-xl px-4 py-2 bg-[#30D5C8]'>Update</button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
    )
}

export default Security