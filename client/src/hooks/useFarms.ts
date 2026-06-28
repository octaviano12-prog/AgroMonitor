'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Farm } from '@/lib/types';

export function useFarms() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFarms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/farms');
      setFarms(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar fazendas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  return { farms, loading, error, refetch: fetchFarms };
}
