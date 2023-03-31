import { useState, useEffect } from "react";
import RegForm from "../Registration/RegForm";
import Logo from "../Login/Logo";
import { useAuth } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const Register = () => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { register } = useAuth()
    const [validation, setValidation] = useState(null)

    const navigate = useNavigate()

    const style = {
        image: "ml-10 flex flex-col w-[40%] h-full visible",
        from_container: "flex h-full w-[60%] items-center justify-center relative",
        container: "absolute flex justify-between w-full h-full bg-[#f0f2f5]"
    }

    const onSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)
        const message = await register(user)

        if (message.modelState) {
            setValidation(message.error)
            setError("")
        }
        else if (message.error.length > 0) {
            setError(message.error)
            setValidation(null)
        }
        else {
            toast.success(message.success, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigate("/login")
        }
        setLoading(false)
    }

    const onChange = e => {
        setError("")
        setValidation(null)
        const target = e.target
        const value = target.type === 'checkbox' ? target.checked : target.value;

        setUser({
            ...user,
            [target.name]: value
        })
    }

    return (
        <div className={style.container}>
            <div className={style.image}>
                <Logo />
            </div>
            <div className={style.from_container}>
                <RegForm onSubmit={onSubmit} loading={loading} onChange={onChange} error={error} validation={validation} />
            </div>
        </div>
    );
};

export default Register;