import apiClient, { withAuth } from './client';
import type { BasketDto } from '@/types/api';

export async function createOrUpdatePaymentIntent(
  basketId: string,
): Promise<BasketDto> {
  const { data } = await apiClient.post<BasketDto>(
    `/payment/${basketId}`,
    {},
    withAuth(),
  );
  return data;
}
