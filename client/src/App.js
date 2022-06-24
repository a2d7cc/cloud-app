import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import './app.style.scss'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'
import RequireAuth from './utils/hoc/RequireAuth'
import Disk from './components/Disk/Disk'
import Profile from './components/Profile/Profile'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import UserService from './services/UserService'
import WithoutAuth from './utils/hoc/WithoutAuth'
import Landing from './components/Landing/Landing'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(UserService.refresh())
  }, [])
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/disk" element={<Disk />} />
      </Route>
      <Route element={<WithoutAuth />}>
        <Route path="/" element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Route>
    </Routes>
  )
}

export default App