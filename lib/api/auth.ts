import apiClient, { withAuth } from './client';
import type { LoginDto, RegisterDto, UserDto, AddressDto } from '@/types/api';

export async function login(payload: LoginDto): Promise<UserDto> {
  const { data } = await apiClient.post<UserDto>(
    '/authentication/login',
    payload,
  );
  return data;
}

export async function register(payload: RegisterDto): Promise<UserDto> {
  const { data } = await apiClient.post<UserDto>(
    '/authentication/register',
    payload,
  );
  return data;
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const { data } = await apiClient.get<boolean>('/authentication/emailexists', {
    params: { email },
  });
  return data;
}

export async function getCurrentUser(): Promise<UserDto> {
  const { data } = await apiClient.get<UserDto>(
    '/authentication/currentuser',
    withAuth(),
  );
  return data;
}

export async function saveAddress(address: AddressDto): Promise<AddressDto> {
  const { data } = await apiClient.post<AddressDto>(
    '/authentication/address',
    address,
    withAuth(),
  );
  return data;
}

export async function updateAddress(address: AddressDto): Promise<AddressDto> {
  const { data } = await apiClient.put<AddressDto>(
    '/authentication/address',
    address,
    withAuth(),
  );
  return data;
}
