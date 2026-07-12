import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AuthRouter from './features/auth/auth.routes'
import AuthLayout from './layouts/ParentAuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardRoute from './features/dashboard/dashboard.route'
import AuthGuard from './guard/AuthGuard'


function AppRouter() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<Navigate to="auth/" replace />} />
        <Route element={<AuthLayout />}>
          <Route path="auth/*" element={<AuthGuard><AuthRouter /></AuthGuard>} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard/*" element={<AuthGuard><DashboardRoute /></AuthGuard>} />
        </Route>
        <Route path="*" element={<><h1>No Found.</h1></>} />
      </Routes>
    </BrowserRouter>
  )
}
export default AppRouter
