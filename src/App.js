import React from 'react'
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem,
  Container
} from '@chakra-ui/react'
import {
  Routes,
  Route
} from 'react-router-dom'
import Posts from './pages/Posts'
import Sidebar from './components/Sidebar'
import NewPost from './pages/NewPost'
import EditPost from './pages/EditPost'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box fontSize='md'>
        <Grid templateColumns='200px 1fr' minH='100vh'>
          <GridItem textAlign='left' backgroundColor='teal.700' color='white' boxShadow='inner'>
            <Sidebar />
          </GridItem>
          <GridItem>
            <Container maxW='5xl' marginTop={6} marginBottom={10}>
              <Routes>
                <Route path='/' element={<Posts />} />
                <Route path='create' element={<NewPost />} />
                <Route path='posts/:postid' element={<EditPost />} />
              </Routes>
            </Container>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default App
