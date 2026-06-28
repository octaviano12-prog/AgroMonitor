'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Operator } from '@/lib/types';

export function useOperators() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOperators = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/operators');
      setOperators(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar operadores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return { operators, loading, error, refetch: fetchOperators };
}
