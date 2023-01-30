import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login } from './components/login/Login'
import { Navigation } from './components/navigation/Navigation'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navigation/>
  </React.StrictMode>,
)