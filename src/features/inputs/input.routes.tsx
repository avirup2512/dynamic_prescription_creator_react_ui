import { Route, Routes } from 'react-router-dom'
import MainInputDialogContainer from './pages/MainInputDialogContainer'


function InputRoute() {
    return (
        <Routes>
            <Route path="/" element={<MainInputDialogContainer />} />
            <Route path="/:templateId" element={<MainInputDialogContainer />} />
            <Route path="/:templateId/:inputType" element={<MainInputDialogContainer />} />
            <Route path="/:templateId/:inputType/:inputEntityId" element={<MainInputDialogContainer />} />
            <Route path="/:templateId/:inputType/:inputEntityId/:optionId" element={<MainInputDialogContainer />} />
        </Routes>
    )
}

export default InputRoute
