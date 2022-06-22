import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'

const Layout = () => {
    return (
        <>
            <Navbar /> 
            <div className="wrap">
                <Outlet />
            </div>
        </>
    )
}

export default Layout