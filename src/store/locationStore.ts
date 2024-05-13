import type { SearchLocation } from '@/types'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useLocationStore = defineStore('locationStore', () => {
  const currentLocation = useLocalStorage('current-location', {
    country: 'Vietnam',
    name: 'Saigon',
    region: '',
    id: 2729258,
    lat: 10.75,
    lon: 106.67
  })

  const selectedLocations = useLocalStorage<SearchLocation[]>('location', [
    {
      ...currentLocation.value
    }
  ])

  const setLocation = (value: SearchLocation) => {
    if (value.name === currentLocation.value.name) return
    currentLocation.value = value
  }

  const addSelectedLocation = (value: SearchLocation) => {
    if (selectedLocations.value.findIndex((location) => location.id === value.id) === -1) {
      selectedLocations.value.push(value)
    }
  }

  const removeSelectedLocation = (value: SearchLocation) => {
    if (value.id === currentLocation.value.id) return

    selectedLocations.value = selectedLocations.value.filter((location) => location.id !== value.id)
  }

  return {
    currentLocation,
    setLocation,
    selectedLocations,
    removeSelectedLocation,
    addSelectedLocation
  }
})
