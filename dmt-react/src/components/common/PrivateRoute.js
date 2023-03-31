import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../../Auth/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}>
            {currentUser ? Component : <Navigate to="login" />}
        </Route>
    )
}
