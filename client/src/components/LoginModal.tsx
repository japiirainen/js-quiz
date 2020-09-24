import { Code, Button } from '@chakra-ui/core'
import {
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
} from '@chakra-ui/core/dist/Modal'
import { useRouter } from 'next/router'
import React from 'react'

interface LoginModalInterface {
   onClose: () => void
   isOpen: boolean
}

export const LoginModal: React.FC<LoginModalInterface> = ({ onClose, isOpen }) => {
   const router = useRouter()
   return (
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
         <ModalOverlay />
         <ModalContent>
            <ModalHeader>Nice job!</ModalHeader>
            <ModalCloseButton color={'red.500'} />
            <ModalBody>
               <Code fontSize={20}>
                  That is correct! 😎 Please login if you would like to have your progress saved.
               </Code>
            </ModalBody>
            <ModalFooter>
               <Button onClick={() => router.push('/login')}>login</Button>
            </ModalFooter>
         </ModalContent>
      </Modal>
   )
}
