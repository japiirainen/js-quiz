import React, { useState } from 'react'
import { Wrapper } from '../components/Wrapper'
import { Formik, Form } from 'formik'
import { InputField } from '../components/InputField'
import { Button, Heading } from '@chakra-ui/core'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { useForgotPasswordMutation } from '../generated/graphql'

const ForgotPassword = () => {
   const [complete, setComplete] = useState(false)
   const [, forgotPassword] = useForgotPasswordMutation()

   if (complete)
      return (
         <Wrapper variant="small">
            <Heading>Password reset link has been sent to provided email address!</Heading>
         </Wrapper>
      )

   return (
      <Wrapper variant="small">
         <Formik
            initialValues={{ email: '' }}
            onSubmit={async values => {
               await forgotPassword({ input: values })
               setComplete(true)
            }}
         >
            {({ isSubmitting }) => (
               <Form>
                  <InputField name="email" placeholder="email" label="Email" type="email" />
                  <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>
                     submit
                  </Button>
               </Form>
            )}
         </Formik>
      </Wrapper>
   )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
