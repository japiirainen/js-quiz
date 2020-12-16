declare module 'express' {
   export interface Request {
      session: {
         userId: any
      }
   }
}
