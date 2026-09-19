import apiClient from './client';
import type { BasketDto } from '@/types/api';

export async function getBasket(id: string): Promise<BasketDto> {
  const { data } = await apiClient.get<BasketDto>(`/Baskets/${id}`);
  return data;
}

export async function saveBasket(basket: BasketDto): Promise<BasketDto> {
  const { data } = await apiClient.post<BasketDto>('/Baskets', basket);
  return data;
}

export async function deleteBasket(id: string): Promise<void> {
  await apiClient.delete(`/Baskets/${id}`);
}
