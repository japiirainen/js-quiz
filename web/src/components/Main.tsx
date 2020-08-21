import { Stack } from '@chakra-ui/core'

interface MainProps {}

export const Main: React.FC<MainProps> = props => (
   <Stack spacing="1.5rem" width="100%" maxWidth="48rem" mt="-45vh" pt="8rem" px="1rem" {...props} />
)
