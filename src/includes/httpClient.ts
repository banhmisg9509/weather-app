const KEY = '71977e40e527461090513435240405'
const BASE_URL = 'https://api.weatherapi.com/v1'

export const fetchWithParams = async <T>(path: string, params: Record<string, any>): Promise<T> => {
  const url = new URL(`${BASE_URL}${path}`)
  params['key'] = KEY

  Object.keys(params).forEach((key) => {
    url.searchParams.append(key, params[key])
  })

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`)
  }

  const data: T = await response.json()
  return data
}
