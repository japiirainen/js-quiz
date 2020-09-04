import { NextPage } from 'next'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { ChallengeHomePage } from '../../components/ChallengeHomePage'

const Home: NextPage = () => {
   return (
      <ChallengeHomePage
         description="In this section you will be challenged with conditionals. This is an essential concept in programming so don't just gloss over these!"
         groupName="conditionals"
      />
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Home)
