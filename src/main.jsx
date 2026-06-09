import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'
import { MenuProvider } from './context/menuContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MenuProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MenuProvider>
  </React.StrictMode>,
)
