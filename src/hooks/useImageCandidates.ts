import { useCallback, useRef, useState } from 'react'
import { createImageCandidates } from '../lib/imageCandidates'
import { inspectImage, selectBestResult } from '../lib/imageDimensions'
import { validateFacebookImageUrl } from '../lib/validateUrl'
import type { CandidateResult } from '../types/image'

type Phase = 'idle' | 'validating' | 'testing' | 'comparing' | 'complete'

export function useImageCandidates() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [results, setResults] = useState<CandidateResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const runId = useRef(0)

  const reset = useCallback(() => {
    runId.current += 1
    setPhase('idle')
    setResults([])
    setError(null)
  }, [])

  const analyze = useCallback(async (value: string) => {
    const currentRun = runId.current + 1
    runId.current = currentRun
    setResults([])
    setError(null)
    setPhase('validating')

    const validation = validateFacebookImageUrl(value)
    if (!validation.valid) {
      setError(validation.message)
      setPhase('idle')
      return
    }

    const candidates = createImageCandidates(value)
    setPhase('testing')
    setResults(candidates.map((candidate) => ({ ...candidate, status: 'checking' })))

    for (const candidate of candidates) {
      const result = await inspectImage(candidate)
      if (runId.current !== currentRun) return
      setResults((existing) => existing.map((item) => (item.id === result.id ? result : item)))
    }

    if (runId.current !== currentRun) return
    setPhase('comparing')
    await new Promise<void>((resolve) => window.setTimeout(resolve, 250))
    if (runId.current !== currentRun) return

    setPhase('complete')
    setResults((current) => {
      if (!selectBestResult(current)) {
        setError('No accessible image was found. The signed URL may be expired, restricted, or unavailable.')
      }
      return current
    })
  }, [])

  return { phase, results, error, best: selectBestResult(results), analyze, reset }
}
