import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/core'
import { useRouter } from 'next/router'

interface BreadCrumbsProps {
   bc1Text: string
   bc2Text: string
   bc3Text?: string
   bc1Href: string
   bc2Href: string
   bc3Href?: string
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
   bc1Href,
   bc1Text,
   bc2Text,
   bc3Text,
   bc2Href,
   bc3Href,
}) => {
   const router = useRouter()
   const path = router.pathname
   return (
      <Breadcrumb addSeparator={false} position="fixed" top="0rem">
         <BreadcrumbItem>
            <BreadcrumbLink
               borderBottom={path === bc1Href ? '1px' : undefined}
               borderBottomColor="tomato"
               href={bc1Href}
            >
               {bc1Text}
            </BreadcrumbLink>
            <BreadcrumbSeparator color="tomato" fontSize="10px" fontWeight="bold" />
         </BreadcrumbItem>
         <BreadcrumbItem>
            <BreadcrumbLink
               borderBottom={path === bc2Href ? '1px' : undefined}
               borderBottomColor="tomato"
               href={bc2Href}
            >
               {bc2Text}
            </BreadcrumbLink>
            <BreadcrumbSeparator color="tomato" fontSize="10px" fontWeight="bold" />
         </BreadcrumbItem>
         <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
               borderBottom={path === bc2Href ? '1px' : undefined}
               borderBottomColor="tomato"
               href={bc3Href}
            >
               {bc3Text}
            </BreadcrumbLink>
         </BreadcrumbItem>
      </Breadcrumb>
   )
}
