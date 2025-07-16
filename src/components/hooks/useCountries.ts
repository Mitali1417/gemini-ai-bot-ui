import { useQuery } from '@tanstack/react-query';
import { fetchCountries } from '../services/api';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
} 