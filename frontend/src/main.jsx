import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './todoapp.css'
import App from './Todoapp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
