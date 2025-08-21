/**
 * API client for the Recipe Hub frontend.
 * Uses bearer token from localStorage when available.
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

// PUBLIC_INTERFACE
export function setAuthToken(token) {
  /** Store bearer token and allow subsequent requests to include it. */
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

function getHeaders(auth = false) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// PUBLIC_INTERFACE
export async function apiGet(path, auth = false, params) {
  /** Perform GET request with optional auth and query params. */
  const url = new URL(`${API_BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    if (Array.isArray(v)) v.forEach(val => url.searchParams.append(k, val));
    else url.searchParams.set(k, v);
  });
  const res = await fetch(url.toString(), { headers: getHeaders(auth) });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiPost(path, body, auth = false) {
  /** Perform POST request. */
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: getHeaders(auth),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiPatch(path, body, auth = false) {
  /** Perform PATCH request. */
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: getHeaders(auth),
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// PUBLIC_INTERFACE
export async function apiDelete(path, auth = false) {
  /** Perform DELETE request. */
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: getHeaders(auth)
  });
  if (!res.ok && res.status !== 204) throw new Error(await res.text());
  return res.status === 204 ? null : res.json();
}
