import {Route, Routes } from 'react-router-dom'
import PrescriptionList from './pages/PrescriptionList'
import CreatePrescription from './pages/CreatePrescription'

function PrescriptionRoute() {
  return (
      <Routes>
        <Route path="/" element={<PrescriptionList/>} />
        <Route path="/prescription/create/" element={<CreatePrescription />} />
        <Route path="/prescription/edit/:id" element={<CreatePrescription />} />
      </Routes>
  )
}
export default PrescriptionRoute
