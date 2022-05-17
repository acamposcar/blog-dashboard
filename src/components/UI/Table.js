import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'
const TableElement = (props) => {
  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {props.head.map(element => {
              return <Th key={element.id} isNumeric={element.numeric}>{element.text}</Th>
            })}
          </Tr>
        </Thead>
        <Tbody>
          {props.posts.map(post => {
            return (
              <Tr key={post.id}>
                <Td>{post.title}</Td>
                <Td>{post.author}</Td>
                <Td isNumeric>{post.date.toString()}</Td>
                <Td isNumeric>{post.date.toString()}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableElement
