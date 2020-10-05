import { Container, ContainerVariant } from '../Container'
import { Footer } from '../Footer'
import { Text } from '@chakra-ui/core'
import Head from 'next/head'
import { AccountPopover } from '../AccountMenu'
import { SideDrawer } from '../SideDrawer'

interface LandingPageLayoutProps {
   title?: string
   variant?: ContainerVariant
   minH?: string
}

export const LandingPageLayout: React.FC<LandingPageLayoutProps> = ({
   children,
   variant,
   minH,
}) => {
   return (
      <Container height={'100%'} variant={variant} minH={minH} mt={0}>
         <Head>
            <title>Js Quiz</title>
            <meta property="og:title" content="Js Quiz" key="title" />
         </Head>
         <AccountPopover />
         {children}
         <SideDrawer />
         <Footer>
            <Text>© js-quiz</Text>
         </Footer>
      </Container>
   )
}
