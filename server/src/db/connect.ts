import { DB_URL } from '../utils/constants'
import mongoose from 'mongoose'

const url = DB_URL

export const connect = () => {
   return new Promise((_, __) => {
      mongoose.connect(url || 'mongodb://localhost:27017/js-quiz', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false,
      })
      let db = mongoose.connection
      db.on('error', err => {
         console.log(err)
      })
      db.once('connected', () => {
         console.log('Mongo connected')
      })
      db.on('reconnected', () => {
         console.log('Mongo re-connected')
      })
      db.on('disconnected', () => {
         console.log('Mongo disconnected')
      })
   })
}
