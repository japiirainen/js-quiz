import React from 'react'
import {
   Menu,
   MenuList,
   MenuItem,
   Box,
   useColorMode,
   Switch,
   MenuButton,
   Flex,
   Text,
   Link,
   Button,
   useToast,
} from '@chakra-ui/core'
import { FaUserCircle } from 'react-icons/fa'
import NextLink from 'next/link'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'

interface AccountPopoverProps {}

export const AccountPopover: React.FC<AccountPopoverProps> = () => {
   const router = useRouter()
   const toast = useToast()
   const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
   const [{ data, fetching }] = useMeQuery({ pause: isServer() })
   const { colorMode, toggleColorMode } = useColorMode()
   const isDark = colorMode === 'dark'
   let userStatus = null
   if (fetching) {
      userStatus = null
   } else if (!data?.me) {
      userStatus = (
         <Flex>
            <Button fontSize={20} mr={2} variant="ghost" onClick={() => router.push('/login')}>
               Login
            </Button>
            <Button fontSize={20} ml={2} variant="ghost" onClick={() => router.push('/register')}>
               Register
            </Button>
         </Flex>
      )
   } else {
      userStatus = (
         <Box ml={4}>
            <Text fontSize={20}> Logged in as {data.me.username}</Text>
            <NextLink href="/account">
               <Link ml={8} fontSize={20}>
                  Account page
               </Link>
            </NextLink>
         </Box>
      )
   }
   return (
      <Menu>
         <Box as={MenuButton} position="fixed" top="1rem" right="1rem">
            <Box as={FaUserCircle} fontSize={25} />
         </Box>
         <MenuList>
            <MenuItem>{userStatus}</MenuItem>
            <Flex>
               <Text fontSize={20} ml={8}>
                  color mode:
               </Text>
               <Switch ml={4} color="green" isChecked={isDark} onChange={toggleColorMode} />
            </Flex>
            {data?.me && (
               <Button
                  ml={4}
                  isLoading={logoutFetching}
                  variant="ghost"
                  onClick={() => {
                     logout()
                     toast({
                        title: 'logged out',
                        status: 'info',
                        duration: 4000,
                        isClosable: true,
                     })
                  }}
               >
                  logout
               </Button>
            )}
         </MenuList>
      </Menu>
   )
}
