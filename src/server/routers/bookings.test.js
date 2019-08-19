import request from 'supertest'
import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import bookings from 'server/routers/bookings'
import useDatabase from 'server/test/useDatabase'
import Room from 'server/models/Room'

useDatabase()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bookings)

describe('bookings', () => {
  test('it should get all rooms', async () => {
    const room = await Room.create({
      name: 'Salle #1',
      description: 'Salle #1',
      capacity: 5,
      createdAt: '2016-12-07T12:39:29.812Z',
      updatedAt: '2016-12-08T17:31:39.489Z',
    })
    const response = await request(app)
      .post('/booking')
      .send({
        date: moment().format('YYYY-MM-DD'),
        interval: '10h-12h',
        roomId: room._id,
      })

    const editedRoom = await Room.findById(room._id)
      .populate('bookings', 'interval date -_id')
      .exec()
    expect(response.status).toBe(200)
    expect(editedRoom.bookings).toHaveLength(1)
    expect(editedRoom.bookings[0].interval).toBe('10h-12h')
  })
  test('it should send an error if the interval is already booked', async () => {
    const room = await Room.create({
      name: 'Salle #1',
      description: 'Salle #1',
      capacity: 5,
      createdAt: '2016-12-07T12:39:29.812Z',
      updatedAt: '2016-12-08T17:31:39.489Z',
    })
    await request(app)
      .post('/booking')
      .send({
        date: moment().format('YYYY-MM-DD'),
        interval: '10h-12h',
        roomId: room._id,
      })
    const response = await request(app)
      .post('/booking')
      .send({
        date: moment().format('YYYY-MM-DD'),
        interval: '10h-12h',
        roomId: room._id,
      })

    expect(response.status).toBe(500)
    expect(response.text).toBe('error: The room is already booked.')
  })
})
