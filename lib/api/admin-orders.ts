import apiClient, { withAuth } from './client';
import type { OrderReturnDto } from '@/types/api';

export async function getAllOrdersAdmin(): Promise<OrderReturnDto[]> {
  const { data } = await apiClient.get<OrderReturnDto[]>(
    '/orders/admin/all',
    withAuth(),
  );
  return data;
}

export async function updateOrderStatus(
  id: string,
  status: string,
): Promise<OrderReturnDto> {
  const { data } = await apiClient.put<OrderReturnDto>(
    `/orders/admin/${id}/status`,
    JSON.stringify(status),
    withAuth({ headers: { 'Content-Type': 'application/json' } }),
  );
  return data;
}
