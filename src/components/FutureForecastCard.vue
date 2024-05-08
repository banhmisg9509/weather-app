<template>
  <div class="bg-[rgba(0,0,0,0.3)] rounded-2xl col-span-2 p-4 md:p-6 text-white">
    <p>Future Weather</p>
    <div
      class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-2 mt-4"
    >
      <div
        v-for="day in forecastday"
        :key="day.date"
        class="bg-[rgba(0,0,0,0.2)] flex flex-col items-center rounded-xl p-4"
      >
        <p>{{ day.date }}</p>
        <img :src="day.codition" alt="weather condition" />
        <p class="text-sm my-2">{{ day.text }}</p>
        <div
          class="rounded-full bg-gradient-to-r from-orange-500 to-green-400 w-full h-[1px]"
        ></div>
        <div class="grid grid-cols-2 gap-2 mt-2 w-full">
          <div>
            <v-icon name="la-temperature-high-solid" color="orange" />
            <span class="text-sm text-orange-300">{{ day.maxTemp }}&#176;C</span>
          </div>
          <div>
            <v-icon name="la-temperature-low-solid" color="lime" />
            <span class="text-sm text-lime-400">{{ day.minTemp }}&#176;C</span>
          </div>
          <div>
            <v-icon name="gi-sunrise" />
            <span class="text-sm"> {{ day.sunRise }}</span>
          </div>
          <div>
            <v-icon name="gi-sunset" />
            <span class="text-sm"> {{ day.sunSet }}</span>
          </div>
          <div>
            <v-icon name="gi-raining"></v-icon>
            <span class="text-sm">{{ day.chanceOfRain }}%</span>
          </div>
          <div>
            <v-icon :name="day.moonPhaseIcon"></v-icon>
            <span class="text-sm">{{ day.moonIllumination }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetForecast } from '@/composables/useGetForecast'
import { useLocationStore } from '@/store/locationStore'
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data } = useGetForecast(q)

const forecastday = computed(() => {
  if (!data.value) return []

  return data.value.forecast.forecastday.map((day) => {
    return {
      codition: 'https://' + day.day.condition.icon,
      text: day.day.condition.text,
      date: useDateFormat(new Date(day.date), 'ddd, DD MMM').value,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      sunRise: convert12HourTo24Hour(day.astro.sunrise),
      sunSet: convert12HourTo24Hour(day.astro.sunset),
      chanceOfRain: day.day.daily_chance_of_rain,
      moonIllumination: day.astro.moon_illumination,
      moonPhaseIcon: getMoonPhaseIcon[day.astro.moon_phase]
    }
  })
})

const getMoonPhaseIcon: Record<string, string> = {
  'New Moon': 'wi-moon-alt-new',
  'Waxing Crescent': 'wi-moon-alt-waxing-crescent-1',
  'First Quarter': 'wi-moon-alt-first-quarter',
  'Waxing Gibbous': 'wi-moon-alt-waxing-gibbous-1',
  'Full Moon': 'wi-moon-alt-full',
  'Waning Gibbous': 'wi-moon-alt-waning-gibbous-1',
  'Last Quarter': 'wi-moon-alt-third-quarter',
  'Waning Crescent': 'wi-moon-alt-waning-crescent-1'
}

const convert12HourTo24Hour = (time12h: string) => {
  const [time, period] = time12h.split(' ')
  const [hours, minutes] = time
    .split(':')
    .map((num, index) =>
      index === 0
        ? (parseInt(num) + (period.toUpperCase() === 'PM' && parseInt(num) !== 12 ? 12 : 0))
            .toString()
            .padStart(2, '0')
        : num
    )
  return `${hours}:${minutes}`
}
</script>
