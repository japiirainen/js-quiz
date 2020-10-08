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
   Text,
   ListItem,
   ListIcon,
   List,
} from '@chakra-ui/core'
import { IconButton } from '@chakra-ui/core'
import { FaAlignJustify, FaArrowLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { DrawerLink } from './DrawerLink'

export const SideDrawer: React.FC = () => {
   const router = useRouter()
   const { isOpen, onClose, onOpen } = useDisclosure()

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
                  {router.pathname !== '/' && (
                     <>
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
                     <DrawerLink href={'/basics/home'} text={'Javascript Basics'} />
                     <DrawerLink href={'/conditionals/home'} text={'Javascript Conditionals'} />
                     <DrawerLink href={'/loops/home'} text={'Javascript Loops'} />
                     <DrawerLink href={'/ramda/home'} text={'Ramda Utilities'} />
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
