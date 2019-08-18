<template>
  <div>
    <v-btn @click.stop="dialog = true" v-bind:disabled="disabled">{{interval}}</v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Book this date</v-card-title>

        <v-card-text>Do you want to book the room {{room.name}} {{date.label}} {{interval}} ?</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">No</v-btn>

          <v-btn color="green darken-1" text @click="onClickYes">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['interval', 'date', 'room', 'handleClick'],
  data() {
    return {
      dialog: false,
      disabled: this.room.bookings.some(booking => {
        return (
          moment(booking.date).isSame(this.date.value, 'day') &&
          booking.interval === this.interval
        )
      }),
    }
  },
  methods: {
    onClickYes() {
      const { handleClick, interval, date, room } = this
      handleClick(interval, date.value, room._id)
      this.dialog = false
    },
  },
  watch: {
    date() {
      this.disabled = this.room.bookings.some(booking => {
        return (
          moment(booking.date).isSame(this.date.value, 'day') &&
          booking.interval === this.interval
        )
      })
    },
    room() {
      this.disabled = this.room.bookings.some(booking => {
        return (
          moment(booking.date).isSame(this.date.value, 'day') &&
          booking.interval === this.interval
        )
      })
    },
  },
}
</script>

<style>
button {
  margin: 0 8px;
}
</style>