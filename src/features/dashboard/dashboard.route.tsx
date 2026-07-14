import { Navigate, Route, Routes } from 'react-router-dom'
import TemplateRoute from '../template/template.route'
import HeaderRoute from '../header/header.route'
import FooterRoute from '../footer/footer.route'
import BodyRoute from '../body/body.route'
import InputEntityTypeRoute from '../inputEntityType/inputentitytype.route'
import PrescriptionRoute from '../prescription/prescription.route'
import SectionRoute from '../section/section.routes'
import NewTemplateRoute from '../new-template/template.route'
import InputRoute from '../inputs/input.routes'


function DashboardRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="new-template" replace />} />
      <Route path="/template/*" element={<TemplateRoute />} />
      <Route path="/new-template/*" element={<NewTemplateRoute />} />
      <Route path="/section/*" element={<SectionRoute />} />
      {/* <Route path="/header/*" element={<HeaderRoute/>} />
        <Route path="/footer/*" element={<FooterRoute/>} />
        <Route path="/body/*" element={<BodyRoute/>} /> */}
      <Route path="/inputEntity/*" element={<InputEntityTypeRoute />} />
      <Route path="/prescription/*" element={<PrescriptionRoute />} />
      <Route path="input/*" element={<InputRoute />} />
    </Routes>
  )
}

export default DashboardRoute
