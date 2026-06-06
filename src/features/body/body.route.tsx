import {Route, Routes } from 'react-router-dom'
import CreateBody from './pages/CreateBody'
import CreateSavedBody from './pages/CreateSavedBody'
import BodyList from './pages/BodyList'


function BodyRoute() {
  return (
      <Routes>
        <Route path="/:type" element={<BodyList/>} />
        <Route path="/body_template/create" element={<CreateBody />} />
        <Route path="/saved_body/create" element={<CreateSavedBody />} />
        <Route path="/body_template/edit/:id" element={<CreateBody />} />
        <Route path="/saved_body/edit/:id" element={<CreateSavedBody />} />
      </Routes>
  )
}

export default BodyRoute
