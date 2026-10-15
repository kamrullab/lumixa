import type { ImageCandidate } from '../types/image'
import { validateFacebookImageUrl } from './validateUrl'

const THUMBNAIL_CTP = /^(?:s|p)?\d{1,5}x\d{1,5}$/i

export function hasThumbnailParameter(url: URL): boolean {
  const value = url.searchParams.get('ctp')
  return value !== null && THUMBNAIL_CTP.test(value)
}

export function createImageCandidates(originalValue: string): ImageCandidate[] {
  const validation = validateFacebookImageUrl(originalValue)
  if (!validation.valid) return []

  const candidates: ImageCandidate[] = [
    {
      id: 'original',
      label: 'Original URL',
      url: originalValue.trim(),
      kind: 'original',
    },
  ]

  if (hasThumbnailParameter(validation.url)) {
    const withoutThumbnail = new URL(validation.url.toString())
    withoutThumbnail.searchParams.delete('ctp')

    const candidateUrl = withoutThumbnail.toString()
    if (validateFacebookImageUrl(candidateUrl).valid && candidateUrl !== originalValue.trim()) {
      candidates.push({
        id: 'thumbnail-removed',
        label: 'Without thumbnail limit',
        url: candidateUrl,
        kind: 'thumbnail-removed',
      })
    }
  }

  return candidates
}
