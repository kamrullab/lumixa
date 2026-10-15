import type { CandidateKind, ImageCandidate } from '../types/image'
import { validateFacebookImageUrl } from './validateUrl'

const THUMBNAIL_CTP = /^(?:s|p)?\d{1,5}x\d{1,5}$/i
const MAX_SIZE_CSTP = /^mx\d{1,5}x\d{1,5}$/i

export function hasThumbnailParameter(url: URL): boolean {
  const value = url.searchParams.get('ctp')
  return value !== null && THUMBNAIL_CTP.test(value)
}

function hasMaxSizeParameter(url: URL): boolean {
  const value = url.searchParams.get('cstp')
  return value !== null && MAX_SIZE_CSTP.test(value)
}

export function createImageCandidates(originalValue: string): ImageCandidate[] {
  const validation = validateFacebookImageUrl(originalValue)
  if (!validation.valid) return []

  const originalUrl = originalValue.trim()
  const candidates: ImageCandidate[] = [
    {
      id: 'original',
      label: 'Original URL',
      url: originalUrl,
      kind: 'original',
    },
  ]

  const addCandidate = (id: string, label: string, url: URL, kind: CandidateKind) => {
    const candidateUrl = url.toString()
    const isDuplicate = candidates.some((candidate) => candidate.url === candidateUrl)
    if (validateFacebookImageUrl(candidateUrl).valid && candidateUrl !== originalUrl && !isDuplicate) {
      candidates.push({ id, label, url: candidateUrl, kind })
    }
  }

  const lessRestricted = new URL(validation.url.toString())

  if (hasThumbnailParameter(validation.url)) {
    lessRestricted.searchParams.delete('ctp')
    addCandidate('thumbnail-removed', 'Without thumbnail limit', lessRestricted, 'thumbnail-removed')
  }

  if (hasMaxSizeParameter(validation.url)) {
    lessRestricted.searchParams.delete('cstp')
    addCandidate('size-limit-removed', 'Without maximum-size transform', lessRestricted, 'size-limit-removed')
  }

  return candidates
}
