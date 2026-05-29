const BASE = import.meta.env.API_URL ?? 'http://localhost:3000';

export const uploadsUrl = (file: string) => `${BASE}/uploads/${file}`;

async function request(
  method: string,
  path: string,
  token?: string,
  body?: unknown,
): Promise<Response> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const init: RequestInit = { method, headers };

  if (body instanceof FormData) {
    init.body = body;
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }

  return fetch(`${BASE}${path}`, init);
}

export const api = {
  get: (path: string, token: string) => request('GET', path, token),
  post: (path: string, body: unknown, token?: string) => request('POST', path, token, body),
  put: (path: string, body: unknown, token: string) => request('PUT', path, token, body),
  patch: (path: string, body: unknown, token: string) => request('PATCH', path, token, body),
  del: (path: string, token: string) => request('DELETE', path, token),
};
