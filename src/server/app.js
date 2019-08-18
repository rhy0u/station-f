/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import config from 'server/config'
import { connect as connectDatabase } from 'server/services/database'
import rooms from 'server/routers/rooms'
import bookings from 'server/routers/bookings'

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.use(express.static(path.resolve(__dirname, '../../public/dist')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(rooms)
app.use(bookings)

app.listen(config.get('server.port'), () => {
  connectDatabase()

  console.log(
    `🔥 server is listening on port http://localhost:${config.get(
      'server.port',
    )}
        NODE_ENV is ${config.get('env')}`,
  )
})
