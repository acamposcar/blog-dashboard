import React, { useContext } from 'react'
import SidebarItem from './UI/SidebarItem'
import {
  Box, Divider, Icon, GridItem, useColorModeValue
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import classes from './Sidebar.modules.css'
import { AddIcon, EditIcon, CloseIcon, ViewIcon } from '@chakra-ui/icons'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { MdDashboard } from 'react-icons/md'
import AuthContext from '../store/auth-context'
const Sidebar = () => {
  const authCtx = useContext(AuthContext)
  const sidebarBg = useColorModeValue('teal.700', 'teal.900')

  const logoutHandler = () => {
    authCtx.logout()
  }
  return (
    <GridItem textAlign='left' bg={sidebarBg} color='white' boxShadow='inner'>

      <Box padding={5} marginTop={2} marginBottom={5} fontSize='4em' textAlign='center'><Icon as={MdDashboard} /></Box>
      <nav className={classes.nav}>
        <NavLink to='/dashboard/'>
          <SidebarItem page='Posts'>
            <EditIcon />
          </SidebarItem>
        </NavLink>

        <NavLink to='/dashboard/create'>
          <SidebarItem page='Create post'>
            <AddIcon />
          </SidebarItem>
        </NavLink>

        <Divider marginY={7} />

        <a href='/'>
          <SidebarItem page='View blog'>
            <ViewIcon />
          </SidebarItem>
        </a>

        <NavLink to='/dashboard/logout' onClick={logoutHandler}>
          <SidebarItem page='Logout'>
            <CloseIcon />
          </SidebarItem>
        </NavLink>

        <Divider marginY={7} />
        <Box textAlign='center'>
          <ColorModeSwitcher />
        </Box>
      </nav>
    </GridItem>
  )
}

export default Sidebar
