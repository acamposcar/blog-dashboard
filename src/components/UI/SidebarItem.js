import React from 'react'
import { HStack, Box } from '@chakra-ui/react'

const SidebarItem = (props) => {
  return (
    <HStack
      alignItems='center'
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
