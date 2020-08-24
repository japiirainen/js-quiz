import * as yup from 'yup'

const userSchema = yup.object().shape({
   username: yup.string().trim().min(2).required(),
   email: yup.string().email(),
   password: yup.string().min(2).max(250).required(),
})

export const validateUser = async (username: string, password: string, email: string) => {
   return await userSchema.validate(
      { username, password, email },
      {
         abortEarly: false,
      }
   )
}
