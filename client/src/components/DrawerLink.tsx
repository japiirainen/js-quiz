import { Link, ListItem, ListIcon, Text } from '@chakra-ui/core'
import { FaArrowRight } from 'react-icons/fa'
import NextLink from 'next/link'

interface DrawerLinkProps {
   text: string
   href: string
}

export const DrawerLink: React.FC<DrawerLinkProps> = ({ href, text }) => {
   return (
      <NextLink href={href}>
         <Link fontSize={20}>
            <ListItem>
               <Text fontSize={20}>
                  {text}
                  <ListIcon icon={FaArrowRight} size="15px" ml={3} />
               </Text>
            </ListItem>
         </Link>
      </NextLink>
   )
}
