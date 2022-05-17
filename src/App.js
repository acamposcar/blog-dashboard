import React, { useContext } from 'react'
import {
  ChakraProvider,
  Box,
  Grid
} from '@chakra-ui/react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import AuthContext from './store/auth-context'
import theme from './theme/theme'
import Main from './components/Main'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const App = () => {
  const authCtx = useContext(AuthContext)

  return (
    <ChakraProvider theme={theme}>
      {!authCtx.isAdmin &&
        <Routes>
          <Route path='/dashboard/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/dashboard/login' />} />
        </Routes>}

      {authCtx.isAdmin &&
        <Box fontSize='md'>
          <Grid templateColumns='200px 1fr' minH='100vh'>
            <Sidebar />
            <Main />
          </Grid>
        </Box>}
    </ChakraProvider>
  )
}

export default App
