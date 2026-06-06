import { Navigate, Route, Routes } from 'react-router-dom'
import CreateDropdown from './pages/CreateDropdown'
import CreateInput from './pages/CreateInput'
import CreateTextBox from './pages/CreateTextBox'
import InputEntityTypePage from './pages/InputEntityType'
import CreateQuantity from './pages/CreateQuantity'


function InputEntityTypeRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="input" replace />} />
      <Route path="/input/create" element={<CreateInput />} />
      <Route path="/input/edit/:id" element={<CreateInput />} />
      <Route path="/textbox/create" element={<CreateTextBox />} />
      <Route path="/textbox/edit/:id" element={<CreateTextBox />} />
      <Route path="/dropdown/create" element={<CreateDropdown />} />
      <Route path="/dropdown/edit/:id" element={<CreateDropdown />} />
      <Route path="/quantity/create" element={<CreateQuantity />} />
      <Route path="/quantity/edit/:id" element={<CreateQuantity />} />
      <Route path="/:type" element={<InputEntityTypePage />} />
    </Routes>
  )
}

export default InputEntityTypeRoute
