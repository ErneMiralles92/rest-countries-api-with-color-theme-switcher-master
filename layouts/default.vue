<template>
  <v-app>
    <TheHeader />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import TheHeader from './TheHeader.vue'
export default {
  components: {
    TheHeader
  },
  data () {
    return {
    }
  }
}
</script>
