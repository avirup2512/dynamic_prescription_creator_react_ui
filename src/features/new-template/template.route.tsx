import { Route, Routes } from 'react-router-dom'
import TemplateList from './pages/TemplateList'
import CreateTemplate from './pages/CreateTemplate'
import EditorSheet from './components/editor/EditorSheet'
import MainInputDialogContainer from '../inputs/pages/MainInputDialogContainer'

function NewTemplateRoute() {
  return (
    <Routes>
      <Route path="/" element={<TemplateList />} />
      <Route path="/" element={<CreateTemplate />}>
        <Route path="section/:sectionType/:sectionTab" element={<EditorSheet editorType="section" />} />
      </Route>
      <Route path="/edit/:id" element={<CreateTemplate />} >
        <Route path="section/:sectionId/:sectionType" element={<EditorSheet editorType="section" />} />
        <Route path="input/:templateId/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType" element={<MainInputDialogContainer />} />
        <Route path="input/:templateId/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType/:inputId" element={<MainInputDialogContainer />} />
        <Route path="input/:templateId/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType/:inputId/:inputCategoryId" element={<MainInputDialogContainer />} />
      </Route>
    </Routes>
  )
}

export default NewTemplateRoute
