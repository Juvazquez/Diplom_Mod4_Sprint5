import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CountriesProvider } from './contexts/CountriesContext.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
        <BrowserRouter>
          <StrictMode>
            <CountriesProvider>
              <App />
            </CountriesProvider>
          </StrictMode>
        </BrowserRouter>
)
