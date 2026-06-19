import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPasswordPage from './pages/ForgottPassword'


function AuthRouter() {
  return (
      <Routes>
      <Route path="/" element={<Navigate to="login" replace />}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<><h1>No Login</h1></>} />
      </Routes>
  )
}

export default AuthRouter
