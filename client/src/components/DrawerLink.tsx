import { Link, ListItem, ListIcon, Text, Button, useToast } from '@chakra-ui/core'
import { FaArrowRight } from 'react-icons/fa'
import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { useRouter } from 'next/router'

interface DrawerLinkProps {
   text: string
   href: string
}

export const DrawerLink: React.FC<DrawerLinkProps> = ({ href, text }) => {
   const router = useRouter()
   const toast = useToast()
   const [{ data: meData }] = useMeQuery({ pause: isServer() })

   const authCheck = () => {
      if (!meData?.me?.username) {
         toast({
            title: 'Must be logged in',
            status: 'error',
            duration: 4000,
            isClosable: true,
         })
         router.push(`/login?next=${href}`)
      } else {
         router.push(href)
      }
   }
   return (
      <Button as={Link} variant="unstyled" onClick={authCheck} fontSize={20} p={1}>
         <ListItem>
            <Text fontSize={20}>
               {text}
               <ListIcon icon={FaArrowRight} size="15px" ml={3} />
            </Text>
         </ListItem>
      </Button>
   )
}
