import { client } from '@/includes/axiosClient'
import type { SearchLocation, WeatherResponse } from '@/types'

export const getForecast = async (q: string, days: number = 6) => {
  const path = '/forecast.json'
  const { data } = await client.get<WeatherResponse>(path, {
    params: {
      q,
      days,
      aqi: 'yes',
      alerts: 'yes'
    }
  })

  return data
}

export const getLocation = async (q: string) => {
  const path = '/search.json'
  const { data } = await client.get<SearchLocation[]>(path, {
    params: {
      q
    }
  })

  return data
}
