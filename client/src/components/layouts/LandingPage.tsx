import { Container, ContainerVariant } from '../Container'
import { Footer } from '../Footer'
import { Text } from '@chakra-ui/core'

interface LandingPageLayoutProps {
   title?: string
   height: string
   variant?: ContainerVariant
   minH?: string
}

export const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({
   children,
   variant,
   minH,
}) => {
   return (
      <Container height={'100%'} variant={variant} minH={minH}>
         {children}
         <Footer>
            <Text>© js-quiz</Text>
         </Footer>
      </Container>
   )
}
