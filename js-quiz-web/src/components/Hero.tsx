import { Flex, Heading } from '@chakra-ui/core'

export const Hero = ({ title }) => (
   <Flex justifyContent="center" alignContent="center" height="50vh">
      <Heading fontSize={'8vh'}>{title}</Heading>
   </Flex>
)

Hero.defaultProps = {
   title: 'Js-quiz',
}
