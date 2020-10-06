import { Button } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import { useGetRandomProblemQuery } from '../../generated/graphql'

export const RandPrbBtn: React.FC = () => {
   const [{ data }] = useGetRandomProblemQuery({ requestPolicy: 'network-only' })
   const group = data?.getRandomProblem.problemGroup
   const index = data?.getRandomProblem.index
   console.log(data?.getRandomProblem)
   const router = useRouter()
   return (
      <Button
         size="lg"
         variant="outline"
         color="red.300"
         width={['90vw', '90vw', 700, 700]}
         mt={10}
         shadow="md"
         onClick={() => router.push(`${group}/[index]`, `/${group}/${index}`)}
      >
         Go to a random challenge
      </Button>
   )
}
