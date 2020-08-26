<template>
  <div>
    <v-row no-gutters>
      <div class="ma-2 ml-0">
        <v-btn to="/" nuxt>
          <v-icon class="mr-2">
            mdi-arrow-left
          </v-icon>
          <span class="text-capitalize">Back</span>
        </v-btn>
      </div>
    </v-row>
    <v-row class="mt-6">
      <v-col cols="12" md="6">
        <v-img
          max-width="500"
          max-height="350"
          :src="countryData.flag"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <span class="rc-font-weight-bold title">{{ countryData.name }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-row no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Native Name' }}: </span>{{ countryData.nativeName }}
              </span>
            </v-row>
            <v-row no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Population' }}: </span>{{ thousandsSeparator(countryData.population) }}
              </span>
            </v-row>
            <v-row no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Region' }}: </span>{{ countryData.region }}
              </span>
            </v-row>
            <v-row no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Sub Region' }}: </span>{{ countryData.subregion }}
              </span>
            </v-row>
            <v-row no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Capital' }}: </span>{{ countryData.capital }}
              </span>
            </v-row>
          </v-col>
          <v-col cols="12" sm="6">
            <v-row v-if="countryData.topLevelDomain && countryData.topLevelDomain.length > 0" no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Top Level Domain' }}: </span>{{ separateWithComma(countryData.topLevelDomain) }}
              </span>
            </v-row>
            <v-row v-if="countryData.currencies && countryData.currencies.length > 0" no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Currencies' }}: </span>{{ separateWithComma(countryData.currencies.map(curr => curr.name)) }}
              </span>
            </v-row>
            <v-row v-if="countryData.languages && countryData.languages.length > 0" no-gutters>
              <span class="subtitle-2 rc-font-weight-regular mt-1">
                <span class="rc-font-weight-medium">{{ 'Languages' }}: </span>{{ separateWithComma(countryData.languages.map(lang => lang.name)) }}
              </span>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="subtitle-2 rc-font-weight-regular mt-6">
          <span class="rc-font-weight-medium pa-3 mt-2">{{ 'Border Countries' }}: </span>
          <span v-if="borderCountries.length === 0" class="subtitle-2 rc-font-weight-regular">None</span>
          <v-col cols="12" md="8" class="pl-sm-0">
            <v-btn
              v-for="(border, index) in borderCountries"
              :key="`border${index}`"
              class="ma-1 "
              small
              :to="border.alpha2Code"
              nuxt
            >
              <span class="text-capitalize">
                {{ border.name }}
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import countryTestData from '../components/country/countryTestData'

export default Vue.extend({
  async asyncData (context) {
    // console.log('country component asyncData context', context)
    if (context.payload) {
      return {
        countryData: context.payload.countryData
      }
    }
    const data = await context.app.$axios.$get(`https://restcountries.eu/rest/v2/alpha?codes=${context.params.countryCode}`)
    let borders = ''
    let borderCountries = []
    if (data[0].borders.length > 0) {
      borders = data[0].borders.reduce((acc: string, current: string) => {
        return `${acc};${current}`
      })
      borderCountries = await context.app.$axios.$get(`https://restcountries.eu/rest/v2/alpha?codes=${borders}&fields=name;alpha2Code;`)
    }
    return {
      countryData: data[0],
      borderCountries
    }
  },
  data () {
    return {
    }
  },
  methods: {
    separateWithComma (array: string []): string {
      if (!array) { return '' }
      const result = array.reduce((acc, current) => {
        return `${acc}, ${current}`
      })
      // console.log({ result })

      return result
    },
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
