'use client';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Equipment } from '@/lib/types';

export function useEquipments() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/equipment');
      setEquipments(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar equipamentos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  return { equipments, loading, error, refetch: fetchEquipments };
}

export function useEquipment(id: string) {
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/equipment/${id}`);
      setEquipment(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao carregar equipamento');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchEquipment();
  }, [id]);

  return { equipment, loading, error, refetch: fetchEquipment };
}
