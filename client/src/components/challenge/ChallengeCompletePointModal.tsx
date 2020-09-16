import {
   Button,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalCloseButton,
   ModalBody,
   ModalFooter,
} from '@chakra-ui/core'

export interface ModalProps {
   onClose: any
   isOpen: boolean | undefined
}

export const ChallengeCompletePointsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
   return (
      <>
         <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Modal Title</ModalHeader>
               <ModalCloseButton />
               <ModalBody>lol</ModalBody>
               <ModalFooter>
                  <Button>Close</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}
