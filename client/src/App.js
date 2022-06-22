import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import './app.style.scss'
import Login from './components/Login/Login'
import Registration from './components/Registration/Registration'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Route>
    </Routes>
  )
}

export default App