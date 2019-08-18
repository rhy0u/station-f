import mongoose from 'mongoose'
import config from 'server/config'

export const connect = () => {
  mongoose.connect(config.get('database.url'), { useNewUrlParser: true })
}
