import {Route, Routes } from 'react-router-dom'
import CreateFooter from './pages/CreateFooter'
import CreateSavedFooter from './pages/CreateSavedFooter'
import FooterList from './pages/FooterList'


function FooterRoute() {
  return (
      <Routes>
        <Route path="/:type" element={<FooterList/>} />
        <Route path="/footer_template/create" element={<CreateFooter />} />
        <Route path="/saved_footer/create" element={<CreateSavedFooter />} />
      </Routes>
  )
}

export default FooterRoute
