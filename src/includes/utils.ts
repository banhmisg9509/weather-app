// Get color for air quality index cards
export const getColor = (key: string, value: number) => {
  const PURPLE = 'bg-gradient-to-r from-purple-500 to-purple-400'
  const RED = 'bg-gradient-to-r from-red-500 to-red-400'
  const YELLOW = 'bg-gradient-to-r from-yellow-500 to-yellow-400'
  const GREEN = 'bg-gradient-to-r from-green-500 to-green-400'
  const DEFAULT_COLOR = 'bg-gradient-to-r sky-blue-500 sky-blue-400'

  switch (key) {
    case 'co':
      if (value >= 9000) return PURPLE
      if (value >= 4000) return RED
      if (value >= 1000) return YELLOW
      return GREEN
    case 'o3':
      if (value >= 241) return PURPLE
      if (value >= 161) return RED
      if (value >= 101) return YELLOW
      return GREEN
    case 'no2':
      if (value >= 601) return PURPLE
      if (value >= 401) return RED
      if (value >= 201) return YELLOW
      return GREEN
    case 'so2':
      if (value >= 1065) return PURPLE
      if (value >= 533) return RED
      if (value >= 267) return YELLOW
      return GREEN
    case 'pm2_5':
      if (value >= 71) return PURPLE
      if (value >= 54) return RED
      if (value >= 36) return YELLOW
      return GREEN
    case 'pm10':
      if (value >= 101) return PURPLE
      if (value >= 76) return RED
      if (value >= 51) return YELLOW
      return GREEN
    case 'gb-defra-index':
      if (value >= 10) return PURPLE
      if (value >= 7) return RED
      if (value >= 4) return YELLOW
      return GREEN
    case 'us-epa-index':
      if (value >= 5) return PURPLE
      if (value >= 3) return RED
      if (value >= 2) return YELLOW
      return GREEN
    default:
      return DEFAULT_COLOR
  }
}

export const range = (value: number) =>
  Array(value)
    .fill(0)
    .map((_, i) => i)
