import { Container, ContainerVariant } from './Container'
import { Main } from './Main'
import { Footer } from './Footer'
import { Text } from '@chakra-ui/core'
import { SideDrawer } from './SideDrawer'
import { AccountPopover } from './AccountMenu'
import { BreadCrumbs } from './BreadCrumbs'

interface AccountLayoutProps {
   title?: string
   fontSize: string
   height: string
   variant?: ContainerVariant
   minH?: string
   bc1Text: string
   bc2Text: string
   bc3Text?: string
   bc1Href: string
   bc2Href: string
   bc3Href?: string
}

export const AccountLayout: React.FC<AccountLayoutProps> = ({
   children,
   variant,
   minH,
   bc1Text,
   bc1Href,
   bc2Text,
   bc3Text,
   bc2Href,
   bc3Href,
}) => {
   return (
      <Container height={'100%'} variant={variant} minH={minH}>
         <BreadCrumbs
            bc1Href={bc1Href}
            bc1Text={bc1Text}
            bc2Text={bc2Text}
            bc3Text={bc3Text}
            bc2Href={bc2Href}
            bc3Href={bc3Href}
         />
         <Main marginTop={'0'}>{children}</Main>
         <SideDrawer />
         <AccountPopover />
         <Footer>
            <Text>© js-quiz</Text>
         </Footer>
      </Container>
   )
}
