import nodemailer from 'nodemailer'
import { EMAIL_PASSWORD, EMAIL_USER } from './constants'

export async function sendEmail(to: string, text: string): Promise<void> {
   const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
         user: EMAIL_USER,
         pass: EMAIL_PASSWORD,
      },
   })

   const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: to,
      subject: 'Reset password',
      html: text,
   })

   console.log('Message sent: %s', info.messageId)
}
