import React from 'react'
import ReactDOM from 'react-dom/client'
import { Login } from './components/login/Login'
import {LoginRK} from './components/login/LoginRK'
import { Programas } from './components/programas/Programas'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Programas/>
  </React.StrictMode>,
)