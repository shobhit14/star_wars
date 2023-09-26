// Import external libraries
import React from 'react'
import { createRoot } from 'react-dom/client'

// Import internal libraries
import App from './App'
import './assets/css/main.css'

// Initialise root container
const container = document.getElementById('root')
const root = createRoot(container)

// Render app component on root container
root.render(<App />)