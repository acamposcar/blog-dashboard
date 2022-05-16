import React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  GridItem
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {
  Routes,
  Route,
} from "react-router-dom";
import Posts from './pages/Posts';
import Comments from './pages/Comments';
import Users from './pages/Users';
import Sidebar from './components/Sidebar';
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid templateColumns='200px 1fr' templateRows='100px 1fr' minH="100vh" >
          <GridItem colSpan={2} borderBottom='solid thin gray'>
            DEV BLOG
            <ColorModeSwitcher justifySelf="flex-end" />
          </GridItem>
          <GridItem backgroundColor='gray.100' boxShadow='inner' borderRight='solid thin gray'>
            <Sidebar />
          </GridItem>
          <GridItem>
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="comments" element={<Comments />} />
              <Route path="users" element={<Users />} />
            </Routes>
          </GridItem>
        </Grid>
      </Box>
    </ChakraProvider >
  );
}

export default App;
