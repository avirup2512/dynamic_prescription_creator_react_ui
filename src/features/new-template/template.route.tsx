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
      <Route path="/edit/:id/:sectionType" element={<CreateTemplate />} >
        <Route path="section/:sectionId/:sectionType/:tab" element={<EditorSheet editorType="section" />} />
        {/* For Editing existing Input */}
        <Route path="inputEdit/:sectionId/:rowId/:columnId/:inputGroupId/:sectionType/:inputId/:inputType/:tab" element={<EditorSheet editorType="input" />} />
        {/* For Adding new Input */}
        <Route path="addInput/:sectionId/:rowId/:columnId/:inputGroupId/:sectionType" element={<EditorSheet editorType="addInput" />} />
        <Route path="inputGroupEdit/:sectionId/:rowId/:columnId/:inputGroupId/:sectionType" element={<EditorSheet editorType="inputGroup" />} />
        <Route path="section/:sectionId/:sectionType/:tab/:entityTypeForStyle/:entityId" element={<EditorSheet editorType="section" />} />
        <Route path="input/:sectionId/:rowId/:columnId/:inputGroupId/:sectionType/:tabType/:inputType" element={<MainInputDialogContainer />} />
        <Route path="input/:sectionId/:rowId/:columnId/:inputGroupId/:sectionType/:tabType/:inputType/:inputId" element={<MainInputDialogContainer />} />
        <Route path="input/:sectionId/:rowId/:columnId/:inputGroupId/:sectionType/:tabType/:inputType/:inputId/:inputCategoryId" element={<MainInputDialogContainer />} />
      </Route>
    </Routes>
  )
}

export default NewTemplateRoute
