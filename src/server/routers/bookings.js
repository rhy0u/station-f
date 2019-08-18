/* eslint-disable no-underscore-dangle */

import express from 'express'
import Booking from 'server/models/Booking'
import Room from 'server/models/Room'
import moment from 'moment'
import asyncHandler from 'server/middlewares/asyncHandler'

const router = new express.Router()

router.post(
  '/booking',
  asyncHandler(async ({ body: { roomId, date, interval } }, res) => {
    const room = await Room.findById(roomId).exec()
    if (!room) {
      throw new Error('Room not found.')
    }

    const { bookings } = await Room.findById(roomId)
      .populate('bookings', 'date interval -_id')
      .exec()

    const isBooked = bookings.some(booking => {
      return (
        moment(booking.date).isSame(date, 'day') &&
        interval === booking.interval
      )
    })

    if (isBooked) {
      throw new Error('The is already booked.')
    }

    const booking = await Booking.create({
      date,
      interval,
    })

    await Room.updateOne(
      { _id: room.id },
      {
        bookings: [...room.bookings, booking._id],
      },
    ).exec()

    res.send(true)
  }),
)

// router.get('/bookings', async ({ query: { date } }, res) => {
//   const booking = await Booking.find().populate('room', 'name')
//   res.json(booking)
// })

export default router
