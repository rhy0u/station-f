import express from 'express'
import Room from 'server/models/Room'
import asyncHandler from 'server/middlewares/asyncHandler'

const router = new express.Router()

router.get(
  '/rooms',
  asyncHandler(async ({ query: { capacity, equipments } }, res) => {
    const query = Room.find()

    if (capacity) query.gt('capacity', capacity)
    if (equipments) query.where('equipements').in(equipments.split(','))
    query.populate('bookings', 'date interval -_id')
    const rooms = await query.exec()
    res.json(rooms)
  }),
)

export default router
