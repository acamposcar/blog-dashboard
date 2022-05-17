import React from 'react'
import SidebarItem from './UI/SidebarItem'
import { Box, Divider, Icon } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import classes from './Sidebar.modules.css'
import { AddIcon, EditIcon, CloseIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { MdDashboard } from 'react-icons/md'

const Sidebar = () => {
  return (
    <>
      <Box padding={5} marginTop={2} marginBottom={5} fontSize='4em' textAlign='center'><Icon as={MdDashboard} /></Box>
      <nav className={classes.nav}>
        <NavLink to='/'>
          <SidebarItem page='Posts'>
            <EditIcon />
          </SidebarItem>
        </NavLink>

        <NavLink to='/create'>
          <SidebarItem page='Create post'>
            <AddIcon />
          </SidebarItem>
        </NavLink>

        <Divider marginY={7} />

        <NavLink to='/logout'>
          <SidebarItem page='Logout'>
            <CloseIcon />
          </SidebarItem>
        </NavLink>

        <Divider marginY={7} />
        <Box textAlign='center'>
          <ColorModeSwitcher />
        </Box>
      </nav>
    </>
  )
}

export default Sidebar
