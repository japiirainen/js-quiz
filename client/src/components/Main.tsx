import { Stack } from '@chakra-ui/core'

interface MainProps {
   marginTop: string
}

export const Main: React.FC<MainProps> = props => (
   <Stack
      spacing="1.5rem"
      width="100%"
      maxWidth="48rem"
      mt={props.marginTop}
      pt="8rem"
      px="1rem"
      {...props}
   />
)
