import React, { useState, useEffect } from 'react'
import PostForm from '../components/PostForm'
import {
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'
import useFetch from '../hooks/useFetch'
import { useParams } from 'react-router-dom'

const EditPost = () => {
  const { postid } = useParams()

  const { loading, sendRequest, error } = useFetch()
  const [post, setPost] = useState()

  useEffect(() => {
    const transformPost = (postObj) => {
      setPost({
        id: postObj.data._id,
        title: postObj.data.title,
        content: postObj.data.content,
        published: postObj.data.published,
        image: postObj.data.image,
        summary: postObj.data.summary
      })
    }

    sendRequest({ url: `/api/v1/posts/${postid}` }, transformPost)
  }, [sendRequest, postid])

  if (loading) return <Spinner size='xl' />

  if (error) {
    return (
      <Alert marginY={6} status='error' variant='left-accent'>
        <AlertIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!post) {
    return (
      <Alert marginY={6} status='warning' variant='left-accent'>
        <AlertIcon />
        <AlertTitle>No post found</AlertTitle>
      </Alert>
    )
  }

  return (

    <PostForm
      heading='Edit Post'
      title={post.title}
      content={post.content}
      summary={post.summary}
      published={post.published}
      image={`/uploads/${post.image}`}
      id={post.id}
    />

  )
}

export default EditPost
