import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, clearToken } from '@/lib/auth/token-storage';
import type { ApiErrorResponse } from '@/types/api';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== Request Interceptor: attach token ONLY when needed =====
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const requiresAuth = config.headers?.['X-Requires-Auth'] === 'true';

  if (requiresAuth) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    delete config.headers['X-Requires-Auth'];
  }

  return config;
});

// ===== Response Interceptor: normalize errors + handle 401 =====
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Dev-only diagnostic logging.
    // AxiosError has circular/non-serializable internals, so passing the raw
    // error object to console.error breaks Next.js's server->browser log
    // forwarding (it shows up as an empty {}). error.toJSON() is Axios's own
    // safe, serializable representation — built exactly for this problem.
    if (process.env.NODE_ENV === 'development') {
      const safeDetails =
        typeof error.toJSON === 'function'
          ? error.toJSON()
          : { message: error.message };

      console.error(
        `[apiClient] Request failed: ${error.code ?? 'UNKNOWN'} — ${error.message}`,
        JSON.stringify(safeDetails, null, 2),
      );

      // The response body (e.g. FluentValidation errors) isn't included in
      // toJSON() — log it as a single pre-stringified message so Next.js's
      // server->browser log forwarding doesn't choke on nested objects.
      if (error.response?.data) {
        let bodyText: string;
        try {
          bodyText = JSON.stringify(error.response.data, null, 2);
        } catch {
          bodyText = String(error.response.data);
        }
        console.error('[apiClient] Response body: ' + bodyText);
      }
    }

    if (error.response?.status === 401) {
      clearToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';

    return Promise.reject(new Error(message));
  },
);

// Helper: mark a request as requiring authentication
export function withAuth(config: Record<string, unknown> = {}) {
  return {
    ...config,
    headers: {
      ...((config.headers as Record<string, string>) ?? {}),
      'X-Requires-Auth': 'true',
    },
  };
}

export default apiClient;
