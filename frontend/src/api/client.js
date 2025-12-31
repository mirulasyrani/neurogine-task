const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080'

export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  })
  if (!res.ok) throw new Error(await res.text())
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : null
}
