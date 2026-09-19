interface DecodedToken {
  exp?: number;
  [key: string]: unknown;
}

/**
 * Decodes a JWT's payload without verifying its signature.
 * This is safe for reading claims like expiry/role client-side — the
 * backend is always the one that verifies the signature on every real
 * request, so this is purely for UX (showing/hiding UI), never security.
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;

  const nowInSeconds = Date.now() / 1000;
  return decoded.exp < nowInSeconds;
}

/** Milliseconds remaining until the token expires (0 if already expired). */
export function getTokenTimeRemaining(token: string): number {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return 0;

  const remainingMs = decoded.exp * 1000 - Date.now();
  return Math.max(0, remainingMs);
}

// ASP.NET Identity issues the role claim under this specific key —
// confirmed directly from this project's own JWT payload.
const ROLE_CLAIM_KEY =
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

/** Reads the role claim from a JWT. */
export function getTokenRole(token: string): string | null {
  const decoded = decodeToken(token);
  if (!decoded) return null;

  const value = decoded[ROLE_CLAIM_KEY];
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && typeof value[0] === 'string') return value[0];
  return null;
}
