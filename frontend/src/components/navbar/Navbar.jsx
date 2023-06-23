import React from "react";

import { NavLink } from "react-router-dom";
import "./Navbar.css";

import {
  Box,
  Flex,
  Button,
  Menu,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";


const Links = [

  { url: "", title: "Home" },

];

let Auth = true;

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("#DADBDD", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <NavLink to="/">
              <Box mr={100}>
           
              <h1 className="logo">Gold Stone Tech</h1>
                
              </Box>
            </NavLink>

            <HStack
              as={"nav"}
              spacing={30}
              display={{ base: "none", md: "flex" }}
              // border='1px' borderColor='gray.200'
              ml={50}
            >
          

 

            

            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Button mr={4} onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <MoonIcon className="icon" />
              ) : (
                <SunIcon className="icon" />
              )}
            </Button>
            <Menu>
             
            </Menu>
          </Flex>
        </Flex>

        

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink
                  key={link.url}
                  to={`/${link.url}`}
                  onClick={() => {
                    onClose();
                  }}
                >
                  {link.title}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar;