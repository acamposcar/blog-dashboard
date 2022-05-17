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
          <Route path='/dashboard/' element={<Posts />} />
          <Route path='/dashboard/create' element={<NewPost />} />
          <Route path='/dashboard/posts/:postid' element={<EditPost />} />
          <Route path='/dashboard/login' element={<Navigate to='/dashboard' />} />
        </Routes>
      </Container>
    </GridItem>
  )
}

export default Main
