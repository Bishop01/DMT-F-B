import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../Auth/AuthContext'
import Sidebar from "./Sidebar/Sidebar"
import Topbar from "./Topbar/Topbar"
import LoaderAnim from "../common/LoaderAnim"
import Loader from '../common/Loader'
import { InitializeToken } from '../../Auth/AxiosInstance'

const Layout = () => {

    const style = {
        container: "flex w-screen divide-x max-h-screen h-screen "
    }

    const { currentUser, setCredentials, } = useAuth()
    const [loading, setLoading] = useState(true)

    const load = async e => {
        await setCredentials()
        InitializeToken()
        setLoading(false)
    }

    useEffect(() => {
        load()
    }, [])

    return (
        loading ?
            <Loader /> :
            (currentUser ?
                <div className={style.container}>

                    <div className="w-[15%]">
                        <Sidebar />
                    </div>

                    <div className="flex flex-col w-full h-screen">
                        <div className="p-5 w-full border-b">
                            <Topbar />
                        </div>
                        <div className="relative h-full">
                            <Outlet />
                        </div>
                    </div>

                </div> : <Navigate to="/login" />)
    )
}

export default Layout