import {Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'


function AuthRouter() {
  return (
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="create-account" element={<Register />} />
        <Route path="*" element={<><h1>No Login</h1></>} />
      </Routes>
  )
}

export default AuthRouter
