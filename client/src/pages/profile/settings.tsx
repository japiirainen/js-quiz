import Head from 'next/head'
import { AccountLayout } from '../../components/layouts/AccountLayout'
import { withUrqlClient } from 'next-urql'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { useMeQuery, useUpdateUserMutation } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { Box, Flex, Button, Heading, Text, Icon } from '@chakra-ui/core'
import { Formik, Form } from 'formik'
import { InputField } from '../../components/InputField'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NextPage } from 'next'

const Settings: NextPage = () => {
   const [submitted, setSubmitted] = useState(false)
   const router = useRouter()
   const [{ data: meData }] = useMeQuery({ pause: isServer() })
   const [{ fetching }, update] = useUpdateUserMutation()

   if (submitted) {
      return (
         <>
            <Head>
               <title>Js Quiz Settings</title>
               <meta property="og:title" content="Js Quiz Settings" key="title" />
            </Head>
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
               <Text fontSize={30}>
                  Account information updated successfully!
                  <Icon name="check" color="blue.500" mx="2px" size={'5'} />
               </Text>
               <Button variantColor="blue" onClick={() => router.push('/')}>
                  Go to homepage
               </Button>
            </AccountLayout>
         </>
      )
   }

   return (
      <>
         <Head>
            <title>Js Quiz Settings</title>
            <meta property="og:title" content="Js Quiz Settings" key="title" />
         </Head>
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
            <Formik
               initialValues={{ username: '', password: '' }}
               onSubmit={async (values, { setErrors }) => {
                  const res = await update({ input: { _id: meData!.me!._id, ...values } })
                  if (res.error) {
                     setErrors({
                        username: 'Username must be at least 2 characters long!',
                        password: 'Password must be at least 2 characters long!',
                     })
                  } else if (res.data) {
                     setSubmitted(true)
                  }
               }}
            >
               {() => (
                  <Form>
                     <Heading mb={10}>Update account information</Heading>
                     <InputField
                        name="username"
                        placeholder="new username"
                        label="Change username"
                     />
                     <Box mt={4}>
                        <InputField
                           name="password"
                           placeholder="new password"
                           label="Change password"
                           type="password"
                        />
                     </Box>
                     <Flex>
                        <Button
                           mr={4}
                           mt={4}
                           type="submit"
                           isLoading={fetching}
                           variantColor="blue"
                        >
                           Confirm
                        </Button>
                        <Flex ml="auto" mt={2}></Flex>
                     </Flex>
                  </Form>
               )}
            </Formik>
         </AccountLayout>
      </>
   )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Settings)
