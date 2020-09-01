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
   Divider,
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
            <MenuItem>
               <Button fontSize={20} mr={2} variant="ghost" onClick={() => router.push('/login')}>
                  Login
               </Button>
               <Button
                  fontSize={20}
                  ml={2}
                  variant="ghost"
                  onClick={() => router.push('/register')}
               >
                  Register
               </Button>
            </MenuItem>
         </Flex>
      )
   } else {
      userStatus = (
         <MenuItem as="button">
            <NextLink href="/profile/progress">
               <Link ml={8} fontSize={20}>
                  Account page ({data.me.username})
               </Link>
            </NextLink>
         </MenuItem>
      )
   }
   return (
      <Menu>
         <Box as={MenuButton} position="fixed" top="1rem" right="1rem">
            <Box as={FaUserCircle} fontSize={25} />
         </Box>
         <MenuList>
            {userStatus}
            <Divider />
            <Flex alignItems="flex-end" mt={3} ml={6}>
               <Text fontSize={20}>Dark mode:</Text>
               <Switch ml={4} color="green" isChecked={isDark} onChange={toggleColorMode} />
            </Flex>
            <Divider />
            {data?.me && (
               <Button
                  isFullWidth
                  fontSize={20}
                  color="red.500"
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
