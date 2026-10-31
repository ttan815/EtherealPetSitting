// Mounts the React application and loads its global styles.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css' // imported here (not in index.css) so merges can't drop it
import './styles/index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
