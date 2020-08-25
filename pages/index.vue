<template>
  <div>
    <v-row>
      <v-col cols="12" sm="5">
        <v-text-field v-model="searchByName" solo label="Search for country..." prepend-inner-icon="mdi-magnify" clearable />
      </v-col>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
      <v-col cols="7" sm="3">
        <v-select
          v-model="region"
          :items="regionItems"
          label="Filter by Region"
          solo
          clearable
          :menu-props="{ offsetY: true }"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-progress-linear v-show="loadingCountries" :indeterminate="true" />
    </v-row>
    <v-row>
      <v-col v-for="(country, index) in filteredCountries" :key="`countryCard${index}`" cols="12" sm="3">
        <CountryCard :country="country" class="mb-8" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import countries from '../static/countries'
import CountryCard from '../components/country/CountryCard.vue'
import Country from '../components/country/country-model'

export default Vue.extend({
  components: {
    CountryCard
  },
  data () {
    return {
      searchByName: '',
      region: '',
      countries: [],
      allCountries: [],
      loadingCountries: false
    }
  },
  computed: {
    regionItems (): {value: string, text: string}[] {
      return [
        { text: 'Africa', value: 'Africa' },
        { text: 'America', value: 'Americas' },
        { text: 'Asia', value: 'Asia' },
        { text: 'Europe', value: 'Europe' },
        { text: 'Oceania', value: 'Oceania' }
      ]
    },
    filteredCountries (): Array<Country> {
      if (!this.searchByName) { return this.countries }
      return this.countries.filter((countryData: Country): boolean => countryData.name.toLowerCase().includes(this.searchByName.toLowerCase()))
    }
  },
  watch: {
    region (newRegion: string): void {
      if (!newRegion) {
        this.countries = [...this.allCountries]
        return
      }
      this.getCountriesByRegion(newRegion)
      // console.log('Get from ', newRegion)
    }
  },
  created () {
    this.getAllCountries()
  },
  methods: {
    async getAllCountries () {
      this.loadingCountries = true
      try {
        this.allCountries = await this.$axios.$get('https://restcountries.eu/rest/v2/all')
        // console.log({ allCountries: this.allCountries })
      } catch (error) {
        console.log('getAllCountries error ', error)
        this.allCountries = []
      }
      this.countries = [...this.allCountries]
      this.loadingCountries = false
    },
    async getCountriesByRegion (region: string) {
      this.loadingCountries = true
      try {
        this.countries = await this.$axios.$get(`https://restcountries.eu/rest/v2/region/${region}`)
        // console.log({ allCountries: this.allCountries })
      } catch (error) {
        console.log('getCountriesByRegion error ', error)
      }
      this.loadingCountries = false
    }

  }
})
</script>
