<template>
  <v-app-bar
    fixed
    app
  >
    <v-toolbar-title class="rc-font-weight-medium" v-text="title" />
    <v-spacer />
    <v-toolbar-items>
      <v-btn
        text
        color="text--text"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon class="mr-2">
          {{ $vuetify.theme.dark ? 'mdi-brightness-5': 'mdi-brightness-2' }}
        </v-icon>
        <span class="text-capitalize rc-font-weight-medium subtitle-1">
          {{ $vuetify.theme.dark ? 'Light Mode ': 'Dark Mode' }}
        </span>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      title: 'Where in the world?'
    }
  },
  computed: {
    dark: {
      get () : boolean {
        return this.$store.getters.dark
      },
      set (value : boolean) {
        this.$store.commit('CHANGE_DARK', value)
      }
    }
  },
  created () {
    console.log('created Header')
  }
})
</script>
