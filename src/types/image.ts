export type CandidateKind = 'original' | 'thumbnail-removed' | 'size-limit-removed'

export interface ImageCandidate {
  id: string
  label: string
  url: string
  kind: CandidateKind
}

export type CandidateStatus = 'checking' | 'success' | 'error'

export interface CandidateResult extends ImageCandidate {
  status: CandidateStatus
  width?: number
  height?: number
  error?: string
}
