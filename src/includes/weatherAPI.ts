import { client } from '@/includes/axiosClient'
import type { IPLookupResponse, SearchLocation, WeatherResponse } from '@/types'

export const getForecast = async (q: string, days: number = 6) => {
  const path = '/forecast.json'
  const { data } = await client.get<WeatherResponse>(path, {
    params: {
      q,
      days,
      aqi: 'yes'
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

export const getIPLookup = async () => {
  const path = '/ip.json'
  const { data } = await client.get<IPLookupResponse>(path, {
    params: {
      q: 'auto:ip'
    }
  })

  return data
}
