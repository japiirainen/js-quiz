import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { InputField } from '../components/InputField'
import { Button, Text, Icon } from '@chakra-ui/core'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { useForgotPasswordMutation } from '../generated/graphql'
import { Layout } from '../components/Layout'

const ForgotPassword = () => {
   const [complete, setComplete] = useState(false)
   const [, forgotPassword] = useForgotPasswordMutation()

   if (complete)
      return (
         <Layout fontSize={'4vh'} height={'8vh'} variant={'small'} minH={'100vh'}>
            <Text fontSize={30}>
               Password reset link has been sent to provided email address!
               <Icon name="check-circle" color="green.500" mx="2px" />
            </Text>
         </Layout>
      )

   return (
      <Layout fontSize={'3vh'} height={'8vh'} title={'Forgot password?'} variant={'small'} minH={'100vh'}>
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
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
