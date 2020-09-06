import React, { useState } from 'react'
import { NextPage } from 'next'
import { Formik, Form } from 'formik'
import { InputField } from '../../components/InputField'
import { Button, Text, Icon } from '@chakra-ui/core'
import { useChangePasswordMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'
import { Layout } from '../../components/layouts/Layout'

const ChangePassword: NextPage = () => {
   const [submitted, setSubmitted] = useState(false)
   const router = useRouter()
   const token = typeof router.query.token === 'string' ? router.query.token : ''
   const [, changePassword] = useChangePasswordMutation()

   if (submitted) {
      return (
         <Layout fontSize={'3vh'} height={'8vh'} variant={'small'} minH={'100vh'}>
            <Text fontSize={30}>
               Password reset was successful!
               <Icon name="check" color="blue.500" mx="2px" size={'5'} />
            </Text>
            <Button variantColor="blue" onClick={() => router.push('/login')}>
               go to login
            </Button>
         </Layout>
      )
   }

   return (
      <Layout
         fontSize={'3vh'}
         height={'8vh'}
         title={'Reset password'}
         variant={'small'}
         minH={'100vh'}
      >
         <Formik
            initialValues={{ newPassword: '' }}
            onSubmit={async (values, { setErrors }) => {
               const res = await changePassword({
                  input: { newPassword: values.newPassword, token },
               })
               console.log(res)
               if (res.error) {
                  setErrors({
                     newPassword: res.error.message,
                  })
               } else if (res.data) {
                  setSubmitted(true)
               }
            }}
         >
            {({ isSubmitting }) => (
               <Form>
                  <InputField
                     name="newPassword"
                     placeholder="new password"
                     label="New Password"
                     type="password"
                  />
                  <Button mt={4} type="submit" variantColor="blue" isLoading={isSubmitting}>
                     confirm
                  </Button>
               </Form>
            )}
         </Formik>
      </Layout>
   )
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
