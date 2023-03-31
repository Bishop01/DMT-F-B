import React from 'react'
import { Link } from 'react-router-dom'

const RegForm = ({ onSubmit, onChange, loading, error, validation }) => {

    const style = {
        input: 'p-3 rounded-lg border focus:outline-blue-300',
        label: 'pl-1',
        form: 'w-full space-y-3 flex flex-col items-center relative',
        field: 'flex flex-col space-y-1 w-full',
        form_container: 'shadow-md rounded-lg bg-white py-10 px-8 flex flex-col items-center space-y-5',
        container: 'absolute w-full flex h-full items-center justify-center',
        btn: 'w-full p-2 rounded-lg mt-5 text-white font-semibold'
    }

    return (
        <div className={style.container}>
            <div className={style.form_container}>
                <p className='font-semibold text-2xl'>Register</p>
                <form className={style.form} onSubmit={e => onSubmit(e)}>
                    <div className='flex w-full space-x-20 px-5'>
                        <div className='flex flex-col w-full space-y-5'>
                            <div className={style.field}>
                                <label className={style.label}>Username</label>
                                <input name='id' className={style.input} type="text" placeholder='JohnDoe12' required onChange={e => onChange(e)} />
                                {validation && validation.id &&
                                    <div className='text-red-500'>
                                        {validation.id}
                                    </div>
                                }
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>Full Name</label>
                                <input name='name' className={style.input} type="text" placeholder='John Doe' required onChange={e => onChange(e)} />
                                {validation && validation.name &&
                                    <div className='text-red-500'>
                                        {validation.name}
                                    </div>
                                }
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>Password</label>
                                <input name='password' className={style.input} type="password" placeholder='Password' required onChange={e => onChange(e)} />
                                {validation && validation.password &&
                                    <div className='text-red-500'>
                                        {validation.password}
                                    </div>
                                }
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>Confirm Password</label>
                                <input name='confirmPassword' className={style.input} type="password" required onChange={e => onChange(e)} />
                                {validation && validation.confirmPassword &&
                                    <div className='text-red-500'>
                                        {validation.confirmPassword}
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='flex flex-col w-full space-y-5'>
                            <div className={style.field}>
                                <label className={style.label}>Email</label>
                                <input name='email' className={style.input} type="email" placeholder='john@doe.com' required onChange={e => onChange(e)} />
                                {validation && validation.email &&
                                    <div className='text-red-500'>
                                        {validation.email}
                                    </div>
                                }
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>Contact</label>
                                <input name='phone' className={style.input} type="text" placeholder='+8801875609450' required onChange={e => onChange(e)} />
                                {validation && validation.phone &&
                                    <div className='text-red-500'>
                                        {validation.phone}
                                    </div>
                                }
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>Date of birth</label>
                                <input name='dob' className={style.input} type="date" required onChange={e => onChange(e)} />
                                {validation && validation.dob &&
                                    <div className='text-red-500'>
                                        {validation.dob}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    {error.length > 0 &&
                        <div className='text-red-500 pl-1 w-full text-sm tracking-wide'>
                            {error}
                        </div>
                    }
                    <div className={style.field}>
                        <button disabled={loading} style={{ backgroundColor: (loading ? "rgb(156 163 175)" : "rgb(59 130 246)") }} className={style.btn} type='submit'>Register</button>
                    </div>
                </form>
                <div className='text-sm'>
                    Already have an account??<Link className='ml-2 text-blue-500' to="/login">Log In!</Link>
                </div>
            </div>
        </div>
    )
}

export default RegForm