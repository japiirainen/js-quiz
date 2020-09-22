import Head from 'next/head'
import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import { InputField } from '../components/InputField'
import { Layout } from '../components/layouts/Layout'
import { useRegisterMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Register: React.FC = () => {
   const router = useRouter()
   const [{ fetching }, register] = useRegisterMutation()
   return (
      <Layout fontSize={'4vh'} height={'8vh'} title={'Register'} variant={'small'} minH={'100vh'}>
         <Head>
            <title>Js Quiz Register</title>
            <meta property="og:title" content="Js Quiz Register" key="title" />
         </Head>
         <Formik
            initialValues={{ username: '', password: '', email: '' }}
            onSubmit={async (values, { setErrors }) => {
               const res = await register({ input: values })
               if (res.error) {
                  setErrors({
                     email: 'Must be a valid email',
                     username: 'username must be at least 2 characters long',
                     password: 'password must be at least 2 characters long',
                  })
               } else {
                  router.push('/')
               }
            }}
         >
            {() => (
               <Form>
                  <InputField name="email" placeholder="email" label="Email" />
                  <Box mt={4}>
                     <InputField name="username" placeholder="username" label="Username" />
                  </Box>
                  <Box mt={4}>
                     <InputField
                        name="password"
                        placeholder="password"
                        label="Password"
                        type="password"
                     />
                  </Box>
                  <Button mt={4} type="submit" isLoading={fetching} variantColor="blue">
                     register
                  </Button>
               </Form>
            )}
         </Formik>
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient)(Register)
