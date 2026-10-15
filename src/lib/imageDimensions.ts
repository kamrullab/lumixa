import type { ImageCandidate, CandidateResult } from '../types/image'

const LOAD_TIMEOUT_MS = 15_000

export function inspectImage(candidate: ImageCandidate): Promise<CandidateResult> {
  return new Promise((resolve) => {
    const image = new Image()
    let settled = false

    const finish = (result: CandidateResult) => {
      if (settled) return
      settled = true
      window.clearTimeout(timeout)
      image.onload = null
      image.onerror = null
      resolve(result)
    }

    const timeout = window.setTimeout(() => {
      finish({ ...candidate, status: 'error', error: 'The image request timed out.' })
    }, LOAD_TIMEOUT_MS)

    image.onload = () => {
      const width = image.naturalWidth || undefined
      const height = image.naturalHeight || undefined
      finish({ ...candidate, status: 'success', width, height })
    }

    image.onerror = () => {
      finish({
        ...candidate,
        status: 'error',
        error: 'Could not load this version. The link may be expired, restricted, or rejected by the CDN.',
      })
    }

    image.referrerPolicy = 'no-referrer'
    image.src = candidate.url
  })
}

export function selectBestResult(results: CandidateResult[]): CandidateResult | undefined {
  return results
    .filter((result) => result.status === 'success')
    .sort((a, b) => {
      const aPixels = (a.width ?? 0) * (a.height ?? 0)
      const bPixels = (b.width ?? 0) * (b.height ?? 0)
      return bPixels - aPixels
    })[0]
}
