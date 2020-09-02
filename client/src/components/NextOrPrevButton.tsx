import NextLink from 'next/link'
import { Button, Text } from '@chakra-ui/core'

type ButtonVariant = 'Next' | 'Prev'

interface ButtonProps {
   problemName: string
   variant: ButtonVariant
   url: string
}

export const NextOrPrevButton: React.FC<ButtonProps> = ({ url, variant, problemName }) => {
   return (
      <NextLink href={url}>
         <Button
            variant="solid"
            variantColor={variant === 'Next' ? 'blue' : 'pink'}
            ml={variant === 'Next' ? 'auto' : undefined}
            mr={variant === 'Prev' ? 'auto' : undefined}
         >
            <Text mr={2}>{variant}:</Text>
            <Text>({problemName})</Text>
         </Button>
      </NextLink>
   )
}
