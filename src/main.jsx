import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import { AppContextProvider } from './context/AppContextProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AppContextProvider>
            <App />
            <Toaster position="top-right"
                reverseOrder={false} />
        </AppContextProvider>
    </BrowserRouter>

)
