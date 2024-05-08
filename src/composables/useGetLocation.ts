import { getLocation } from '@/includes/weatherAPI'
import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'

export const useGetLocation = (q: Ref<string>) => {
  return useQuery({
    queryKey: ['search-location', q],
    queryFn: () => getLocation(q.value),
    enabled: computed(() => q.value !== '')
  })
}
