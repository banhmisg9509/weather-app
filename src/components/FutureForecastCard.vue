<template>
  <div class="bg-[rgba(0,0,0,0.3)] rounded-2xl col-span-2 p-4 md:p-6 text-white">
    <p>Future Weather</p>
    <div
      class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-2 mt-4"
    >
      <template v-if="isFetching">
        <FuretureForcastDayCardSkelaton v-for="index in [1, 2, 3, 4, 5, 6]" :key="index" />
      </template>
      <template v-else>
        <FuretureForcastDayCard v-for="day in forecastday" :key="day.text" :day="day" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import FuretureForcastDayCard from '@/components/FuretureForcastDayCard.vue'
import FuretureForcastDayCardSkelaton from '@/components/FuretureForcastDayCardSkelaton.vue'
import { useGetForecast } from '@/composables/useGetForecast'
import { useLocationStore } from '@/store/locationStore'
import type { ForcastDay } from '@/types'
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'

const locationStore = useLocationStore()
const q = computed(() => locationStore.currentLocation.name)
const { data, isFetching } = useGetForecast(q)

const forecastday = computed(() => {
  if (!data.value) return []

  return data.value.forecast.forecastday.map((day) => {
    return {
      codition: 'https:' + day.day.condition.icon,
      text: day.day.condition.text,
      date: useDateFormat(new Date(day.date), 'ddd, DD MMM').value,
      maxTemp: day.day.maxtemp_c,
      minTemp: day.day.mintemp_c,
      sunRise: convert12HourTo24Hour(day.astro.sunrise),
      sunSet: convert12HourTo24Hour(day.astro.sunset),
      chanceOfRain: day.day.daily_chance_of_rain,
      moonIllumination: day.astro.moon_illumination,
      moonPhaseIcon: getMoonPhaseIcon[day.astro.moon_phase]
    } as ForcastDay
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
