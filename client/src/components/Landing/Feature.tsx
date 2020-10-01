import Box from '@chakra-ui/core/dist/Box'
import { AnimatePresence } from 'framer-motion'

type anyProps = any

export const Feature: React.FC<anyProps> = ({ children, ...rest }) => {
   return (
      <AnimatePresence>
         <Box
            width={['100%', 700]}
            maxWidth="100%"
            p={5}
            height={['auto', 300]}
            shadow="md"
            borderWidth="1px"
            flex="1"
            rounded="md"
            {...rest}
         >
            {children}
         </Box>
      </AnimatePresence>
   )
}
