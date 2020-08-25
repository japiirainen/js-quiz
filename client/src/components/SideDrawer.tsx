import React from 'react'
import NextLink from 'next/link'
import {
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   useDisclosure,
   Link,
   Button,
   Box,
   Flex,
   useToast,
   Divider,
   Text,
   ListItem,
   ListIcon,
   List,
} from '@chakra-ui/core'
import { IconButton } from '@chakra-ui/core'
import { FaAlignJustify, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useMeQuery, useLogoutMutation } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'

interface SideDrawerProps {}

export const SideDrawer: React.FC<SideDrawerProps> = ({}) => {
   const router = useRouter()
   const toast = useToast()
   const { isOpen, onClose, onOpen, onToggle } = useDisclosure()
   const [{ data, fetching: loginFetching }] = useMeQuery({ pause: isServer() })
   const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
   let userStatus = null
   if (loginFetching) {
      userStatus = null
   } else if (!data?.me) {
      userStatus = (
         <Flex>
            <Button fontSize={20} mr={2} variant="link" variantColor="gray" onClick={() => router.push('/login')}>
               Login
            </Button>

            <Button fontSize={20} ml={2} variant="link" variantColor="gray" onClick={() => router.push('/register')}>
               Register
            </Button>
         </Flex>
      )
   } else {
      userStatus = (
         <Flex align="center">
            <Box>
               <Text> Logged in as:</Text>
               <Text as="ins" fontSize={30}>
                  {data.me.username}
               </Text>
            </Box>
            <Button
               ml={'auto'}
               isLoading={logoutFetching}
               variant="outline"
               variantColor="blue"
               onClick={() => {
                  logout()
                  onToggle()
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
         </Flex>
      )
   }
   const btnRef = React.useRef()
   return (
      <>
         <IconButton
            position="fixed"
            top="1rem"
            left="1rem"
            variant="ghost"
            aria-label="Call Sage"
            fontSize="20px"
            icon={FaAlignJustify}
            onClick={onOpen}
            ref={btnRef}
         />
         <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
               <DrawerHeader borderBottomWidth="1px">
                  {userStatus}
                  {router.pathname !== '/' && (
                     <>
                        <Divider mt={6} />
                        <List spacing={3} my={0}>
                           <ListItem>
                              <ListIcon icon={FaArrowLeft} size="15px" ml={3} />
                              <NextLink href="/">
                                 <Link>Back Home</Link>
                              </NextLink>
                           </ListItem>
                        </List>
                     </>
                  )}
                  <br />
               </DrawerHeader>
               <DrawerBody>
                  <List spacing={3} my={0}>
                     <NextLink href="/basics">
                        <Link fontSize={20}>
                           <ListItem>
                              <Text fontSize={20}>
                                 JavaScript basics
                                 <ListIcon icon={FaArrowRight} size="15px" ml={3} />
                              </Text>
                           </ListItem>
                        </Link>
                     </NextLink>
                  </List>
               </DrawerBody>
               <DrawerFooter>
                  <Text>© js-quiz</Text>
               </DrawerFooter>
            </DrawerContent>
         </Drawer>
      </>
   )
}
