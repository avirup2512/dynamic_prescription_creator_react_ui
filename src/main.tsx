import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux"
import { store } from "./store.ts"
import { GlobalUiProvider } from "./providers/GlobalUiProvider"

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GlobalUiProvider>
      <App />
    </GlobalUiProvider>
  </Provider>,
)
