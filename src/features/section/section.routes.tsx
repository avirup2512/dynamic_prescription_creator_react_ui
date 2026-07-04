import { Route, Routes } from 'react-router-dom'
import SectionList from './pages/SectionList'
import CreateSection from './pages/CreateSection'


function SectionRoute() {
  return (
    <Routes>
      <Route path="/" element={<SectionList />} />
      <Route path="/create/:sectionType" element={<CreateSection />} />
      <Route path="/edit/:id" element={<CreateSection />} />
    </Routes>
  )
}

export default SectionRoute
