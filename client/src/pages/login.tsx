import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
   const router = useRouter()
   const [, login] = useLoginMutation()
   return (
      <Wrapper variant="small">
         <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
               const res = await login({ input: values })
               if (res.error) {
                  setErrors({
                     username: res.error.message,
                     password: res.error.message,
                  })
               } else if (res.data) {
                  router.push('/')
               }
            }}
         >
            {({ isSubmitting }) => (
               <Form>
                  <InputField name="username" placeholder="username" label="Username" />
                  <Box mt={4}>
                     <InputField name="password" placeholder="password" label="Password" type="password" />
                  </Box>
                  <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
                     login
                  </Button>
               </Form>
            )}
         </Formik>
      </Wrapper>
   )
}

export default withUrqlClient(createUrqlClient)(Login)
