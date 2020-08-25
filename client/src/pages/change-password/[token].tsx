import React from 'react'
import { NextPage } from 'next'
import { Wrapper } from '../../components/Wrapper'
import { Formik, Form } from 'formik'
import { InputField } from '../../components/InputField'
import { Button } from '@chakra-ui/core'
import { useChangePasswordMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import { createUrqlClient } from '../../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

const ChangePassword: NextPage = () => {
   const router = useRouter()
   const token = typeof router.query.token === 'string' ? router.query.token : ''
   const [, changePassword] = useChangePasswordMutation()
   return (
      <Wrapper variant="small">
         <Formik
            initialValues={{ newPassword: '' }}
            onSubmit={async (values, { setErrors }) => {
               const res = await changePassword({ input: { newPassword: values.newPassword, token } })
               console.log(res)
               if (res.error) {
                  setErrors({
                     newPassword: res.error.message,
                  })
               } else if (res.data) {
                  router.push('/login')
               }
            }}
         >
            {({ isSubmitting }) => (
               <Form>
                  <InputField name="newPassword" placeholder="new password" label="New Password" type="password" />
                  <Button mt={4} type="submit" variantColor="teal" isLoading={isSubmitting}>
                     change password
                  </Button>
               </Form>
            )}
         </Formik>
      </Wrapper>
   )
}

export default withUrqlClient(createUrqlClient)(ChangePassword)
