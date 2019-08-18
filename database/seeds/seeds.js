import { connect as connectDatabase } from 'server/services/database'
import { connection } from 'mongoose'
import * as rooms from './data/rooms'

const run = async () => {
  connectDatabase()

  await rooms.truncate()

  await rooms.generate()
}

run()
  .then(() => {
    connection.close()
  })
  .catch(err => {
    setTimeout(() => {
      throw err
    })
  })
