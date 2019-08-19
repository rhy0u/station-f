import { connect as connectDatabase } from 'server/services/database'
import { truncateAll } from 'server/utils/database'
import { connection } from 'mongoose'
import * as rooms from './data/rooms'

const run = async () => {
  connectDatabase()

  await truncateAll()

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
