import { ColorModeScript } from '@chakra-ui/react'
import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './store/auth-context'

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(
  <StrictMode>
    <AuthContextProvider>

      <ColorModeScript />
      <BrowserRouter>

        <App />
      </BrowserRouter>
    </AuthContextProvider>

  </StrictMode>
)
