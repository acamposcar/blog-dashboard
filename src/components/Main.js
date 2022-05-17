import React from 'react'
import { GridItem, Container } from '@chakra-ui/react'
import {
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Posts from '../pages/Posts'
import NewPost from '../pages/NewPost'
import EditPost from '../pages/EditPost'

const Main = () => {
  return (
    <GridItem>
      <Container maxW='5xl' marginTop={6} marginBottom={10}>
        <Routes>
          <Route path='/' element={<Posts />} />
          <Route path='create' element={<NewPost />} />
          <Route path='posts/:postid' element={<EditPost />} />
          <Route path='/login' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </GridItem>
  )
}

export default Main
