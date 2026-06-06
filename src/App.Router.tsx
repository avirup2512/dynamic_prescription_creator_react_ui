import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthRouter from './features/auth/auth.routes'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardRoute from './features/dashboard/dashboard.route'


function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout/>}>
            <Route path="auth/*" element={<AuthRouter/>}/>
        </Route>
        <Route element={<DashboardLayout/>}>
            <Route path="dashboard/*" element={<DashboardRoute/>}/>
        </Route>
        <Route path="*" element={<><h1>No Found.</h1></>} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRouter
