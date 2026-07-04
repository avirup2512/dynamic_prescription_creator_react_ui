import { Route, Routes } from 'react-router-dom'
import MainInputDialogContainer from './pages/MainInputDialogContainer'


function InputRoute() {
    return (
        <Routes>
            <Route path="/" element={<MainInputDialogContainer />} />
            <Route path="/create" element={<MainInputDialogContainer />} />
            <Route path="/create/:templateId/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType" element={<MainInputDialogContainer />} />
            <Route path="/create/:templateId/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType" element={<MainInputDialogContainer />} />
            <Route path="/create/:templateId/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType/:inputId" element={<MainInputDialogContainer />} />
            <Route path="/create/:templateId/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType/:inputId/:inputCategoryId" element={<MainInputDialogContainer />} />
            <Route path="/edit/:templateId" element={<MainInputDialogContainer />} />
            <Route path="/edit/:templateId/:sectionId" element={<MainInputDialogContainer />} />
            <Route path="/edit/:templateId/:sectionId/:inputType" element={<MainInputDialogContainer />} />
            <Route path="/edit/:templateId/:sectionId/:inputType/:inputEntityId" element={<MainInputDialogContainer />} />
            <Route path="/edit/:templateId/:sectionId/:inputType/:inputEntityId/:optionId" element={<MainInputDialogContainer />} />
        </Routes>
    )
}

export default InputRoute
