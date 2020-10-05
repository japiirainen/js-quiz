import Box from '@chakra-ui/core/dist/Box'
import { AnimatePresence } from 'framer-motion'

type anyProps = any

export const Feature: React.FC<anyProps> = ({ children, ...rest }) => {
   return (
      <AnimatePresence>
         <Box shadow="md" flex="1" rounded="md" border={'1px dashed gray'} {...rest}>
            {children}
         </Box>
      </AnimatePresence>
   )
}
