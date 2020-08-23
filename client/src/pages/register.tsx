import { Box, Button } from '@chakra-ui/core'
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useRegisterMutation } from '../generated/graphql'
import { useRouter } from 'next/router'

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
   const router = useRouter()
   const [, register] = useRegisterMutation()
   return (
      <Wrapper variant="small">
         <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setErrors }) => {
               const res = await register({ input: values })
               if (res.error) {
                  setErrors({
                     username: res.error.message,
                     password: res.error.message,
                  })
               } else {
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
                     register
                  </Button>
               </Form>
            )}
         </Formik>
      </Wrapper>
   )
}

export default Register
