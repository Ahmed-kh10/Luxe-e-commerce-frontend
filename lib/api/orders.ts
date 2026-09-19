import apiClient, { withAuth } from './client';
import type { OrderDto, OrderReturnDto, DeliveryMethodDto } from '@/types/api';

export async function createOrder(order: OrderDto): Promise<OrderReturnDto> {
  const { data } = await apiClient.post<OrderReturnDto>(
    '/orders',
    order,
    withAuth(),
  );
  return data;
}

export async function getOrders(): Promise<OrderReturnDto[]> {
  const { data } = await apiClient.get<OrderReturnDto[]>('/orders', withAuth());
  return data;
}

export async function getOrderById(id: number): Promise<OrderReturnDto> {
  const { data } = await apiClient.get<OrderReturnDto>(
    `/orders/${id}`,
    withAuth(),
  );
  return data;
}

export async function getDeliveryMethods(): Promise<DeliveryMethodDto[]> {
  const { data } = await apiClient.get<DeliveryMethodDto[]>(
    '/orders/deliverymethod',
    withAuth(),
  );
  return data;
}
