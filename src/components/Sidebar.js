import React from "react";
import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <VStack>
            <Link to="/">Posts</Link>
            <Link to="/comments">Comments</Link>
            <Link to="/users">Users</Link>
        </VStack>
    );
}

export default Sidebar;