import axios from 'axios'

const KEY = '71977e40e527461090513435240405'

export const client = axios.create({
  baseURL: 'https://api.weatherapi.com/v1'
})

client.interceptors.request.use((config) => {
  config.params['key'] = KEY
  return config
})
