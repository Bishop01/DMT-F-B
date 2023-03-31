import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

const IsAdmin = () => {

    const { currentUser } = useAuth()

    return (
        currentUser.role == 1 ? <Outlet /> : <Navigate to={"/"} />
    )
}

export default IsAdmin