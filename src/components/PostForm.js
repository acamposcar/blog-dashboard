import React, { useState, useContext } from 'react'
import {
  FormControl,
  FormLabel,
  Switch,
  Input,
  Textarea,
  Button,
  VStack,
  Heading,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import useFetch from '../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../store/auth-context'
const PostForm = (props) => {
  const authCtx = useContext(AuthContext)
  const isEdit = !!props.id

  const [title, setTitle] = useState(props.title ? props.title : '')
  const [summary, setSummary] = useState(props.summary)
  const [content, setContent] = useState(props.content)
  const [published, setPublished] = useState(props.published)
  const [image, setImage] = useState({ preview: props.image, data: props.image })
  const { loading, sendRequest, error } = useFetch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image.data)
    formData.append('title', title)
    formData.append('summary', summary)
    formData.append('content', content)
    formData.append('published', published)

    const method = isEdit ? 'PUT' : 'POST'
    const url = isEdit ? `/api/v1/posts/${props.id}` : '/api/v1/posts/'
    console.log(authCtx.token)
    sendRequest({
      url,
      method,
      body: formData,
      headers: {
        Authorization: `Bearer ${authCtx.token}`
      }
    }, () => {
      navigate('/', { replace: false })
    })
  }
  const handleChange = (e) => {
    if (e.target.name === 'title') setTitle(e.target.value)
    if (e.target.name === 'summary') setSummary(e.target.value)
    if (e.target.name === 'content') setContent(e.target.value)
    if (e.target.name === 'published') setPublished(e.target.checked)
    if (e.target.name === 'image') {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0]
      })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      {error &&
        <Alert status='error' variant='left-accent'>
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>}
      <Heading as='h1' marginBottom={6}>
        {props.heading}
      </Heading>
      <VStack gap={5}>
        <FormControl isRequired>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input id='title' type='text' name='title' value={title} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='summary'>Summary</FormLabel>
          <Textarea
            id='summary'
            size='md'
            resize='vertical'
            name='summary'
            onChange={handleChange}
            value={summary}
          />

        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='content'>Content (markdown syntax)</FormLabel>
          <Textarea
            id='content'
            size='md'
            resize='vertical'
            name='content'
            onChange={handleChange}
            value={content}
            rows={10}
          />

        </FormControl>
        <FormControl isRequired={!isEdit}>
          <HStack gap={3}>
            <FormLabel
              htmlFor='image' cursor='pointer' border='solid teal thin' borderRadius={10} p={1.5}
              _hover={{ background: 'gray.100' }}
            >Select image
            </FormLabel>

            <Input
              accept='.jpg,.png,.jpeg'
              id='image'
              type='file'
              name='image'
              hidden
              onChange={handleChange}
            />

            {image.preview &&
              <Image
                src={image.preview
                  ? image.preview
                  : ''}
                maxW={60}
                maxH={60}
              />}
          </HStack>
        </FormControl>
        <FormControl isRequired>
          <HStack>
            <FormLabel htmlFor='published' mb='0'>
              Published?
            </FormLabel>

            <Switch id='published' defaultChecked={published} name='published' onChange={handleChange} />
          </HStack>
        </FormControl>
        {loading
          ? <Button colorScheme='teal' type='button' disabled>Loading</Button>
          : <Button colorScheme='teal' type='submit' rightIcon={<AddIcon />}>Submit</Button>}
      </VStack>
    </form>

  )
}

export default PostForm
