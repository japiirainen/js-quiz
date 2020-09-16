import { AccountLayout } from '../../components/layouts/AccountLayout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { UserLevelDisplay } from '../../components/progress/UserLevel'
import { ProgressInAllChallenges } from '../../components/progress/ProgressInAllCategories'
import { NextPage } from 'next'

const Progress: NextPage = () => {
   return (
      <AccountLayout
         bc2Text={'settings'}
         bc2Href={'/profile/settings'}
         bc1Text={'progress'}
         bc1Href={'/profile/progress'}
         fontSize={'4vh'}
         height={'8vh'}
         title={'Profile'}
         variant={'small'}
         minH={'100vh'}
      >
         <UserLevelDisplay />
         <ProgressInAllChallenges />
      </AccountLayout>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Progress)
