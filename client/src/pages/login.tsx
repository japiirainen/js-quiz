import Head from 'next/head'
import { Box, Button, Link, Flex, useToast } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { useLoginMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import NextLink from 'next/link'
import { Layout } from '../components/layouts/Layout'

const Login: React.FC = () => {
   const toast = useToast()
   const router = useRouter()
   const [{ fetching }, login] = useLoginMutation()
   return (
      <Layout fontSize={'4vh'} height={'8vh'} title={'Login'} variant={'small'} minH={'100vh'}>
         <Head>
            <title>Js Quiz Login</title>
            <meta property="og:title" content="Js Quiz Login" key="title" />
         </Head>
         <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
               const res = await login({ input: values })
               if (res.error) {
                  setErrors({
                     username: 'Wrong username or password!',
                     password: 'Wrong username or password!',
                  })
               } else if (res.data) {
                  if (typeof router.query.next === 'string') {
                     router.push(router.query.next)
                  } else {
                     router.push('/')
                     return toast({
                        title: `Logged in as ${res.data.login.username}!`,
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                     })
                  }
               }
            }}
         >
            {() => (
               <Form>
                  <InputField name="username" placeholder="username" label="Username" />
                  <Box mt={4}>
                     <InputField
                        name="password"
                        placeholder="password"
                        label="Password"
                        type="password"
                     />
                  </Box>
                  <Flex>
                     <Button mr={4} mt={4} type="submit" isLoading={fetching} variantColor="blue">
                        login
                     </Button>
                     <Flex direction="column-reverse" ml="auto" mt={4}>
                        <NextLink href="/forgot-password">
                           <Link ml="auto">forgot password?</Link>
                        </NextLink>
                        <NextLink href="/register">
                           <Link ml="auto">go to register?</Link>
                        </NextLink>
                     </Flex>
                  </Flex>
               </Form>
            )}
         </Formik>
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient)(Login)
