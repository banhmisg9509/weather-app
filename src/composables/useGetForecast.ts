import { getForecast } from '@/includes/weatherAPI'
import { useQuery } from '@tanstack/vue-query'
import { computed, type Ref } from 'vue'

export const useGetForecast = (q: Ref<string>, days?: Ref<number>) => {
  return useQuery({
    queryKey: ['forecast', q, days],
    queryFn: () => getForecast(q.value, days?.value),
    enabled: computed(() => q.value !== ''),
    placeholderData: (previousData) => previousData
  })
}
