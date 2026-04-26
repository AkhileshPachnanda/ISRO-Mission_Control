const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Generic fetch wrapper with error handling
async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(error.error || `API error ${response.status}`)
  }

  return response.json()
}

// Fetch TLEs for multiple satellites in one request
export async function fetchTLEs(noradIds) {
  const ids = noradIds.join(',')
  const data = await apiFetch(`/api/tle?ids=${ids}`)
  return data.data // { [noradId]: { line1, line2 } }
}

// Fetch AI mission intel for a satellite
export async function fetchMissionIntel(satellite) {
  const data = await apiFetch('/api/groq/intel', {
    method: 'POST',
    body: JSON.stringify(satellite)
  })
  return data.intel
}

// Check backend health
export async function fetchHealth() {
  return apiFetch('/api/health')
}