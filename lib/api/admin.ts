import apiClient, { withAuth } from './client';
import type { ProductDto } from '@/types/api';
import type { ProductFormPayload } from '@/types/admin';

export async function createProduct(
  payload: ProductFormPayload,
): Promise<ProductDto> {
  const { data } = await apiClient.post<ProductDto>(
    '/products',
    payload,
    withAuth(),
  );
  return data;
}

export async function updateProduct(
  id: number,
  payload: ProductFormPayload,
): Promise<ProductDto> {
  const { data } = await apiClient.put<ProductDto>(
    `/products/${id}`,
    payload,
    withAuth(),
  );
  return data;
}

export async function deleteProduct(id: number): Promise<void> {
  await apiClient.delete(`/products/${id}`, withAuth());
}

export async function uploadProductImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiClient.post<string>(
    '/admin/upload-image',
    formData,
    withAuth({ headers: { 'Content-Type': 'multipart/form-data' } }),
  );
  return data;
}
