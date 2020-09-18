import NextLink from 'next/link'
import { Button, Text } from '@chakra-ui/core'

type ButtonVariant = 'Next' | 'Prev'

interface ButtonProps {
   variant: ButtonVariant
   url: string
}

export const NextOrPrevButton: React.FC<ButtonProps> = ({ url, variant }) => {
   return (
      <NextLink href={url}>
         <Button
            fontSize={['sm', 'md', 'lg', 'xl']}
            size={'md'}
            variant="solid"
            variantColor={variant === 'Next' ? 'blue' : 'pink'}
            ml={variant === 'Next' ? 'auto' : undefined}
            mr={variant === 'Prev' ? 'auto' : undefined}
         >
            <Text mr={2}>{variant === 'Next' ? 'Next challenge ->' : '<- Previous challenge'}</Text>
         </Button>
      </NextLink>
   )
}
