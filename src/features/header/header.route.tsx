import {Route, Routes } from 'react-router-dom'
import CreateHeader from './pages/CreateHeader'
import CreateSavedHeader from './pages/CreateHeaderTemplate'
import HeaderList from './pages/HeaderList'


function HeaderRoute() {
  return (
      <Routes>
        <Route path="/:type" element={<HeaderList/>} />
        {/* <Route path="/header_template/create" element={<CreateHeader />} />
        <Route path="/saved_header/create" element={<CreateSavedHeader />} />
        <Route path="/header_template/edit/:id" element={<CreateHeader />} />
        <Route path="/saved_header/edit/:id" element={<CreateSavedHeader />} /> */}
      </Routes>
  )
}

export default HeaderRoute
