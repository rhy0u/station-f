<template>
  <v-container>
    <v-layout wrap>
      <div class="wrapper">
        <div class="filters">
          <v-select
            v-model="date"
            :items="dates"
            label="Date"
            item-text="label"
            item-value="value"
            return-object
          />
          <v-checkbox
            v-for="equipment in equipments"
            v-bind:key="equipment"
            v-model="selectedEquipments"
            v-bind:label="equipment"
            v-bind:value="equipment"
          />
        </div>
        <v-card class="mx-auto" tile>
          <v-list-item v-for="room in rooms" v-bind:key="room._id">
            <v-list-item-content>
              <div class="room">
                <span>{{ room.name }}</span>
                <div class="roomBookingButtons">
                  <BookingButtonModal
                    v-for="n in 4"
                    v-bind:key="`${room._id}-${n}`"
                    v-bind:interval="`${n * 2 + 8}h-${n * 2 + 10}h`"
                    v-bind:date="date"
                    v-bind:room="room"
                    v-bind:handleClick="book"
                  />
                </div>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-console */

import axios from 'axios'
import moment from 'moment'
import BookingButtonModal from './BookingButton'

export default {
  components: { BookingButtonModal },
  data: () => {
    return {
      rooms: [],
      equipments: [],
      dates: [
        ...Array.from({ length: 5 }).map((_, index) => {
          return {
            value: moment()
              .add(index, 'days')
              .format('YYYY-MM-DD'),
            label: moment()
              .add(index, 'days')
              .format('dddd, MMMM Do'),
          }
        }),
      ],
      selectedEquipments: [],
      date: {
        value: moment().format('YYYY-MM-DD'),
        label: moment().format('dddd, MMMM Do'),
      },
    }
  },
  mounted() {
    this.getRooms()
  },
  methods: {
    getRooms() {
      axios.get('/rooms').then(({ data }) => {
        this.rooms = data
        this.equipments = data.reduce((acc, cur) => {
          return [...acc, ...cur.equipements.filter(v => acc.indexOf(v) === -1)]
        }, [])
      })
    },
    book(interval, date, roomId) {
      axios({
        method: 'post',
        url: '/booking',
        data: { interval, date, roomId },
      }).then(() => {
        this.getRooms()
      })
    },
  },
  watch: {
    selectedEquipments: function(selectedEquipments) {
      axios
        .get('/rooms', {
          params: { equipments: selectedEquipments.join(',') },
        })
        .then(({ data }) => {
          this.rooms = [...data]
        })
    },
  },
}
</script>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.filters {
  display: flex;
}
.room {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.roomBookingButtons {
  display: flex;
}

span {
  padding-right: 16px;
}
</style>