import { Route, Routes } from 'react-router-dom'
import MainInputDialogContainer from './pages/MainInputDialogContainer'


function InputRoute() {
    return (
        <Routes>
            <Route path="/" element={<MainInputDialogContainer />} />
        </Routes>
    )
}

export default InputRoute
