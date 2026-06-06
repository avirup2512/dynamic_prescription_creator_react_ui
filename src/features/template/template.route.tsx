import {Route, Routes } from 'react-router-dom'
import TemplateList from './pages/TemplateList'
import CreateTemplate from './pages/CreateTemplate'


function TemplateRoute() {
  return (
      <Routes>
        <Route path="/" element={<TemplateList/>} />
        <Route path="/create" element={<CreateTemplate />} />
        <Route path="/edit/:id" element={<CreateTemplate />} />
      </Routes>
  )
}

export default TemplateRoute
