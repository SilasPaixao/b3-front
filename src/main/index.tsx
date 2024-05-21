import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from '@/presentation/components'
import '@/presentation/styles/global.scss'

const container = document.getElementById('main')
const root = ReactDOM.createRoot(container)

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
