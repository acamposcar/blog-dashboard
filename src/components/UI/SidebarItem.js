import React from 'react'
import { HStack, Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const SidebarItem = (props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(props.url, { replace: false })
  }

  return (
    <HStack
      alignItems='center'
      onClick={handleClick}
      padding='0.75em 1.5em'
      _hover={{ backgroundColor: 'teal.500' }}
      gap={2}
    >
      <Box>
        {props.children}
      </Box>
      <Box>
        {props.page}
      </Box>
    </HStack>
  )
}

export default SidebarItem
