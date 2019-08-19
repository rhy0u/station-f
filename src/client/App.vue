<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Station F</span>
        <span class="font-weight-light">Salles de reunion</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <RoomList />
    </v-content>
  </v-app>
</template>

<script>
import RoomList from 'client/components/RoomList.vue'

export default {
  name: 'App',
  components: {
    RoomList,
  },
}
</script>
