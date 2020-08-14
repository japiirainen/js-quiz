import { theme } from '@chakra-ui/core'

// Let's say you want to add custom colors
export const Theme = {
   ...theme,
   colors: {
      ...theme.colors,
   },
   fonts: {
      body: 'Fira Code, sans-serif',
      heading: 'Gentium Basic, serif',
      mono: 'Menlo, monospace',
   },
}
