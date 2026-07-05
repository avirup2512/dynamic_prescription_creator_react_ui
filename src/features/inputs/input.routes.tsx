import { Route, Routes } from 'react-router-dom'
import MainInputDialogContainer from './pages/MainInputDialogContainer'


function InputRoute() {
    return (
        <Routes>
            <Route path="/" element={<MainInputDialogContainer />} />
            <Route path="/create" element={<MainInputDialogContainer />} />
            <Route path="/create/:rowId/:columnId/:inputGroupId/:sectionType/:sectionId/:tabType" element={<MainInputDialogContainer />} />
            <Route path="/create/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType" element={<MainInputDialogContainer />} />
            <Route path="/create/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType/:inputId" element={<MainInputDialogContainer />} />
            <Route path="/create/:rowIndex/:columnIndex/:inputGroupIndex/:sectionType/:sectionId/:tabType/:inputType/:inputId/:inputCategoryId" element={<MainInputDialogContainer />} />
            <Route path="/edit" element={<MainInputDialogContainer />} />
            <Route path="/edit/:sectionId" element={<MainInputDialogContainer />} />
            <Route path="/edit/:sectionId/:inputType" element={<MainInputDialogContainer />} />
            <Route path="/edit/:sectionId/:inputType/:inputEntityId" element={<MainInputDialogContainer />} />
            <Route path="/edit/:sectionId/:inputType/:inputEntityId/:optionId" element={<MainInputDialogContainer />} />
        </Routes>
    )
}

export default InputRoute
