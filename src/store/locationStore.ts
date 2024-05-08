import type { SearchLocation } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocationStore = defineStore('locationStore', () => {
  const currentLocation = ref<SearchLocation>({
    country: 'Vietnam',
    name: 'Saigon',
    region: '',
    id: 2729258,
    lat: 10.75,
    lon: 106.67
  })

  const setLocation = (value: SearchLocation) => {
    currentLocation.value = value
  }

  return {
    currentLocation,
    setLocation
  }
})
