import Box from '@chakra-ui/core/dist/Box'

type anyProps = any

export const Feature: React.FC<anyProps> = ({ children, ...rest }) => {
   return (
      <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md" {...rest}>
         {children}
      </Box>
   )
}
