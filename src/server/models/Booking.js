import { Schema, model } from 'mongoose'

const schema = new Schema({
  date: Date,
  interval: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

export default model('Booking', schema)
