import request from 'supertest'
import express from 'express'
import rooms from 'server/routers/rooms'
import useDatabase from 'server/test/useDatabase'
import Room from 'server/models/Room'

useDatabase()

const app = express()

app.use(rooms)

describe('rooms', () => {
  test('it should get all rooms', async () => {
    await Room.create([
      {
        name: 'Salle #1',
        description: 'Salle #1',
        capacity: 5,
        createdAt: '2016-12-07T12:39:29.812Z',
        updatedAt: '2016-12-08T17:31:39.489Z',
      },
    ])

    const res = await request(app)
      .get('/rooms')
      .expect('Content-Type', /json/)
    expect(res.body).toHaveLength(1)
    expect(res.statusCode).toBe(200)
  })

  test('it should get all rooms with a capacity over 10', async () => {
    await Room.create([
      {
        name: 'Salle #1',
        description: 'Salle #1',
        capacity: 5,
        createdAt: '2016-12-07T12:39:29.812Z',
        updatedAt: '2016-12-08T17:31:39.489Z',
      },
      {
        name: 'Salle nulle',
        description: 'Salle nulle',
        capacity: 26,
        createdAt: '2016-12-09T16:45:49.096Z',
        updatedAt: '2016-12-09T16:45:49.096Z',
      },
    ])

    const res = await request(app)
      .get('/rooms?capacity=10')
      .expect('Content-Type', /json/)

    expect(res.body).toHaveLength(1)
    expect(res.statusCode).toBe(200)
  })
})
