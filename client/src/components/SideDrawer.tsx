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
} from '@chakra-ui/core'
import { IconButton } from '@chakra-ui/core'
import { FaAlignJustify } from 'react-icons/fa'
import { useMeQuery } from '../generated/graphql'

interface SideDrawer {}

export const SideDrawer: React.FC<SideDrawer> = ({}) => {
   const { isOpen, onClose, onOpen } = useDisclosure()
   const [{ data, fetching }] = useMeQuery()

   let body = null
   if (fetching) {
      body = null
   } else if (!data?.me) {
      body = (
         <>
            <NextLink href="/register">
               <Link>register</Link>
            </NextLink>
            <br />
            <NextLink href="/login">
               <Link>login</Link>
            </NextLink>
         </>
      )
   } else {
      body = (
         <Flex>
            <Box mr={3}>{data.me.username}</Box>
            <Button variant="link" variantColor="black">
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
            variantColor="gray"
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
                  <NextLink href="/">
                     <Link>Back Home</Link>
                  </NextLink>
                  <br />
                  {body}
               </DrawerHeader>
               <DrawerBody>
                  <NextLink href="/basics">
                     <Link>Basic questions</Link>
                  </NextLink>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
               </DrawerBody>
               <DrawerFooter />
            </DrawerContent>
         </Drawer>
      </>
   )
}
