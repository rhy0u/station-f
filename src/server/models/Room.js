import { Schema, model } from 'mongoose'

const schema = new Schema({
  name: String,
  description: String,
  capacity: Number,
  equipements: [String],
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
})

export default model('Room', schema)
