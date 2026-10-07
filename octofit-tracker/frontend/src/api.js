const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items
  }

  if (Array.isArray(payload?.data?.docs)) {
    return payload.data.docs
  }

  return []
}