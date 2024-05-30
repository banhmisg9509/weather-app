import { fetchWithParams } from '@/includes/httpClient'
import type { SearchLocation, WeatherResponse } from '@/types'

export const getForecast = async (q: string, days: number = 6): Promise<WeatherResponse> => {
  const path = '/forecast.json'
  const params = {
    q,
    days,
    aqi: 'yes',
    alerts: 'yes'
  }

  return await fetchWithParams<WeatherResponse>(path, params)
}

export const getLocation = async (q: string): Promise<SearchLocation[]> => {
  const path = '/search.json'
  const params = { q }

  return await fetchWithParams<SearchLocation[]>(path, params)
}
