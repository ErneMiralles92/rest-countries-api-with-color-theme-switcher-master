<template>
  <v-card
    class="mx-auto"
    max-width="300"
    nuxt
    :to="country.alpha2Code"
  >
    <v-img
      height="150"
      :src="country.flag"
    />

    <v-card-title class="subtitle-1 rc-font-weight-medium">
      {{ country.name }}
    </v-card-title>
    <v-card-text>
      <div class="d-flex flex-column mb-6">
        <span v-for="(field, index) in fieldsItems" :key="`countryField${index}`" class="subtitle-2 rc-font-weight-regular mt-1">
          <span class="rc-font-weight-medium">{{ field.text }}: </span>{{ field.key === 'population' ? thousandsSeparator(country[field.key]): country[field.key] }}
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import Country from './country-model'

export default Vue.extend({
  props: {
    country: {
      type: Object,
      required: true
    } as PropOptions<Country>
  },
  data () {
    return {
      fieldsItems: [
        { key: 'population', text: 'Population' },
        { key: 'region', text: 'Region' },
        { key: 'capital', text: 'Capital' }
      ]
    }
  },
  methods: {
    thousandsSeparator (value: number): string {
      const str = `${value}`
      let result = ''
      let counter = 0
      for (let index = str.length - 1; index >= 0; index--) {
        result = str[index] + result
        counter++
        if (counter % 3 === 0 && index !== 0) {
          result = `,${result}`
        }
      }
      return result
    }
  }
})
</script>

<style>

</style>
