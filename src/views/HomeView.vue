<template>
  <div class="flex-1">
    <section class="mt-2 p-2 grid md:grid-cols-[1fr_2fr_1fr] gap-2 lg:container lg:mx-auto">
      <CurrentWeatherCard />
      <HourlyForecastCard />
      <AirQualityCard />
      <FutureForecastCard />
    </section>
  </div>
</template>

<script setup lang="ts">
import CurrentWeatherCard from '@/components/CurrentWeatherCard.vue'
import HourlyForecastCard from '@/components/HourlyForecastCard.vue'
import AirQualityCard from '@/components/AirQualityCard.vue'
import FutureForecastCard from '@/components/FutureForecastCard.vue'
</script>
