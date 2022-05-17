import React, { useState, useEffect, useContext } from 'react'
import {
  Alert, AlertIcon, AlertTitle, Spinner, IconButton, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import AuthContext from '../store/auth-context'
import AlertError from '../components/AlertError'
const Posts = () => {
  const [posts, setPosts] = useState([])
  const { loading: loadingPosts, sendRequest: getRequest, error: errorPosts } = useFetch()
  const { loading: loadingDelete, sendRequest: deleteRequest, error: errorDelete } = useFetch()
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    const transformPosts = (postObj) => {
      const postsArray = []
      for (const post of postObj.data) {
        postsArray.push({
          id: post._id,
          title: post.title,
          content: post.content,
          date: new Date(post.date),
          author: post.author.name,
          published: post.published === 'true',
          image: post.image,
          summary: post.summary
        })
      }
      setPosts(postsArray)
    }

    getRequest({ url: '/api/v1/posts' }, transformPosts)
  }, [getRequest])

  const handleDelete = (id) => {
    deleteRequest({
      url: `/api/v1/posts/${id}/`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${authCtx.token}`
      }
    }, () => {
      setPosts(prevPosts => prevPosts.filter(post => post.id !== id))
    })
  }
  if (loadingPosts) return <Spinner size='xl' />

  if (errorPosts) {
    return (
      <AlertError error={errorPosts} />
    )
  }

  if (posts.length === 0) {
    return (
      <Alert marginY={6} status='warning' variant='left-accent'>
        <AlertIcon />
        <AlertTitle>No posts found</AlertTitle>
      </Alert>
    )
  }

  return (
    <>
      <Heading size='xl' fontWeight='400' as='h1' marginY={10}>Posts</Heading>
      {loadingDelete && <Spinner />}
      {errorDelete && <AlertError error={errorDelete} />}

      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Date</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map(post => {
              return (
                <Tr key={post.id}>
                  <Td>{post.title.slice(0, 40)}</Td>
                  <Td>{post.author}</Td>
                  <Td>{format(post.date, 'PPP')}</Td>
                  <Td>
                    <Link to={`/posts/${post.id}`}>
                      <IconButton
                        aria-label='Edit post'
                        colorScheme='teal'
                        icon={<EditIcon />}
                      />
                    </Link>
                  </Td>
                  <Td>
                    <IconButton
                      aria-label='Delete post'
                      colorScheme='red'
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(post.id)}
                    />
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

    </>
  )
}

export default Posts
