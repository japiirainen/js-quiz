import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

interface BreadCrumbsProps {
   bc1Text: string
   bc2Text: string
   bc3Text?: string
   bc1Href: string
   bc2Href: string
   bc3Href?: string
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ bc1Href, bc1Text, bc2Text, bc2Href }) => {
   const router = useRouter()
   const path = router.pathname
   return (
      <Breadcrumb addSeparator={false} position="relative" top="0rem" ml={20}>
         <BreadcrumbItem>
            <NextLink href={bc1Href}>
               <BreadcrumbLink
                  borderBottom={path === bc1Href ? '1px' : undefined}
                  borderBottomColor="tomato"
               >
                  {bc1Text}
               </BreadcrumbLink>
            </NextLink>
            <BreadcrumbSeparator color="tomato" fontSize="10px" fontWeight="bold" />
         </BreadcrumbItem>
         <BreadcrumbItem>
            <NextLink href={bc2Href}>
               <BreadcrumbLink
                  borderBottom={path === bc2Href ? '1px' : undefined}
                  borderBottomColor="tomato"
               >
                  {bc2Text}
               </BreadcrumbLink>
            </NextLink>
            <BreadcrumbSeparator color="tomato" fontSize="10px" fontWeight="bold" />
         </BreadcrumbItem>
      </Breadcrumb>
   )
}
