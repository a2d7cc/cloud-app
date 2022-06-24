import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './loader.style.scss'


const RequireAuth = () => {
    const location = useLocation()
    const isAuth = useSelector(state => state.user.isAuth)
    const loader = useSelector(state => state.app.loader)


    if(loader) {
        return <div className="lds-ripple"><div></div><div></div></div>
    }

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return (
        <>
            <Navbar />
            <div className="wrap">
                <Outlet />
            </div>
        </>
    )

}

export default RequireAuth

