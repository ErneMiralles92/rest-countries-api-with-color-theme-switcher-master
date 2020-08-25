import Currency from './currency-model'

export default interface Country {
  name: string,
  topLevelDomain: Array<string>,
  alpha2Code: string,
  capital: string,
  region: string,
  subregion: string,
  population: number,
  borders: Array<string>,
  nativeName: string,
  currencies: Array<Object>,
  languages: Array<Object>,
  flag: string,
}
