import Room from 'server/models/Room'
import Booking from 'server/models/Booking'

export const truncateAll = async () => {
  await Room.deleteMany().exec()
  await Booking.deleteMany().exec()
}
