interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

interface Condition {
  text: string
  icon: string
  code: number
}

interface Current {
  temp_c: number
  condition: Condition
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  humidity: number
  cloud: number
  feelslike_c: number
  vis_km: number
  uv: number
  gust_kph: number
  air_quality: {
    co: number
    no2: number
    o3: number
    so2: number
    pm2_5: number
    pm10: number
    'us-epa-index': number
    'gb-defra-index': number
  }
}

interface DayForecast {
  maxtemp_c: number
  mintemp_c: number
  avgtemp_c: number
  maxwind_kph: number
  totalprecip_mm: number
  totalsnow_cm: number
  avgvis_km: number
  avghumidity: number
  daily_will_it_rain: number
  daily_chance_of_rain: number
  condition: Condition
  uv: number
}

interface HourlyForecast {
  time: string
  temp_c: number
  condition: Condition
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  precip_mm: number
  humidity: number
  cloud: number
  feelslike_c: number
  windchill_c?: number
  heatindex_c?: number
  dewpoint_c?: number
  will_it_rain: number
  chance_of_rain: number
  vis_km: number
  gust_kph: number
  uv: number
}

interface ForecastDay {
  date: string
  day: DayForecast
  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: number
  }
  hour: HourlyForecast[]
}

interface Forecast {
  forecastday: ForecastDay[]
}

export interface WeatherResponse {
  location: Location
  current: Current
  forecast: Forecast
}

export interface SearchLocation {
  id: number
  name: string
  region: string
  country: string
  lat: number
  lon: number
}

export interface ForcastDay {
  codition: string
  text: string
  date: string
  maxTemp: number
  minTemp: number
  sunRise: string
  sunSet: string
  chanceOfRain: number
  moonIllumination: number
  moonPhaseIcon: string
}
