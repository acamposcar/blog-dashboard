import React from 'react'
import { Flex } from '@chakra-ui/react'

const Card = (props) => {
  return (
    <Flex alignItems='center' margin={2} padding={3} gap={5} boxShadow='md' border='solid thin grey'>
      {props.children}
    </Flex>
  )
}

export default Card
