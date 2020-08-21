import React from 'react'
import {
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   DrawerContent,
   useDisclosure,
} from '@chakra-ui/core'
import { IconButton } from '@chakra-ui/core'
import { FaAlignJustify } from 'react-icons/fa'

interface SideDrawer {}

export const SideDrawer: React.FC<SideDrawer> = ({}) => {
   const { isOpen, onClose, onOpen } = useDisclosure()
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
               <DrawerHeader borderBottomWidth="1px">Lorem Ipsum</DrawerHeader>
               <DrawerBody>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
               </DrawerBody>
               <DrawerFooter />
            </DrawerContent>
         </Drawer>
      </>
   )
}
