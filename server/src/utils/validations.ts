import * as yup from 'yup'

const userSchema = yup.object().shape({
   username: yup.string().trim().min(2).required(),
   password: yup.string().min(2).max(250).required(),
})

export const validateUser = async (username: string, password: string) => {
   return await userSchema.validate(
      { username, password },
      {
         abortEarly: false,
      }
   )
}
