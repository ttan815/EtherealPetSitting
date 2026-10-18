import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css' // imported here (not in index.css) so merges can't drop it
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
