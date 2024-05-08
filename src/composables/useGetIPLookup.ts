import { getIPLookup } from '@/includes/weatherAPI'
import { useQuery } from '@tanstack/vue-query'

export const useGetIPLookup = () => {
  return useQuery({
    queryKey: ['ip-look-up'],
    queryFn: () => getIPLookup()
  })
}
