import apiClient from './client';
import type {
  ProductDto,
  PaginatedResult,
  ProductParams,
  ProductBrandDto,
  ProductTypeDto,
} from '@/types/api';

export async function getProducts(
  params: ProductParams,
  signal?: AbortSignal,
): Promise<PaginatedResult<ProductDto>> {
  const { data } = await apiClient.get<PaginatedResult<ProductDto>>(
    '/products',
    {
      params: {
        BrandId: params.brandId,
        TypeId: params.typeId,
        SearchValue: params.searchValue,
        Sort: params.sort,
        PageSize: params.pageSize ?? 12,
        PageIndex: params.pageIndex ?? 1,
      },
      signal,
    },
  );
  return data;
}

export async function getProductById(id: number): Promise<ProductDto> {
  const { data } = await apiClient.get<ProductDto>(`/products/${id}`);
  return data;
}

export async function getProductBrands(): Promise<ProductBrandDto[]> {
  const { data } = await apiClient.get<ProductBrandDto[]>('/products/brands');
  return data;
}

export async function getProductTypes(): Promise<ProductTypeDto[]> {
  const { data } = await apiClient.get<ProductTypeDto[]>('/products/types');
  return data;
}
