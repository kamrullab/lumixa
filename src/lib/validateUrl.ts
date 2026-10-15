export type ValidationResult =
  | { valid: true; url: URL }
  | { valid: false; message: string }

const isSupportedFacebookCdnHost = (hostname: string): boolean => {
  const normalized = hostname.toLowerCase().replace(/\.$/, '')
  return normalized === 'fbcdn.net' || normalized.endsWith('.fbcdn.net')
}

export function validateFacebookImageUrl(value: string): ValidationResult {
  const trimmed = value.trim()

  if (!trimmed) {
    return { valid: false, message: 'Paste a Facebook image URL to continue.' }
  }

  let url: URL
  try {
    url = new URL(trimmed)
  } catch {
    return { valid: false, message: 'Enter a complete, valid URL.' }
  }

  if (url.protocol !== 'https:') {
    return { valid: false, message: 'For your safety, Lumixa accepts HTTPS URLs only.' }
  }

  if (url.port && url.port !== '443') {
    return { valid: false, message: 'Facebook image URLs must use the standard HTTPS port.' }
  }

  if (url.username || url.password) {
    return { valid: false, message: 'URLs containing embedded credentials are not supported.' }
  }

  if (!isSupportedFacebookCdnHost(url.hostname)) {
    return {
      valid: false,
      message: 'This hostname is not a supported Facebook image CDN. Use an HTTPS URL ending in fbcdn.net.',
    }
  }

  return { valid: true, url }
}
