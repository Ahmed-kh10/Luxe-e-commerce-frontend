// ============ Products ============
export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productBrand: string;
  productType: string;
  brandId?: number;
  categoryId?: number;
}

export interface PaginatedResult<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[];
}

export interface ProductBrandDto {
  id: number;
  name: string;
}

export interface ProductTypeDto {
  id: number;
  name: string;
}

export interface ProductParams {
  brandId?: number;
  typeId?: number;
  searchValue?: string;
  sort?: string;
  pageSize?: number;
  pageIndex?: number;
}

// ============ Basket ============
export interface BasketItemDto {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export interface BasketDto {
  id: string;
  items: BasketItemDto[];
  deliveryMethodId?: number;
  shippingPrice?: number;
}

// ============ Auth ============
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  displayName: string;
  email: string;
  password: string;
}

export interface UserDto {
  email: string;
  displayName: string;
  token: string;
}

export interface AddressDto {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// ============ Orders ============
export interface OrderItemDto {
  productId: number;
  productName: string;
  pictureUrl: string;
  price: number;
  quantity: number;
}

export interface DeliveryMethodDto {
  id: number;
  shortName: string;
  deliveryTime: string;
  description: string;
  cost: number;
}

export interface OrderDto {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: AddressDto;
}

export interface OrderReturnDto {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: AddressDto;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: OrderItemDto[];
  subtotal: number;
  total: number;
  status: string;
}

// ============ Payment ============
export interface PaymentResultDto {
  clientSecret: string;
  publishableKey: string;
}

// ============ Errors ============
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  errors?: string[];
}
