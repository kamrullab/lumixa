import type { CandidateResult } from '../types/image'
import { CheckIcon } from './Icons'

export function CandidateList({ results, bestId }: { results: CandidateResult[]; bestId?: string }) {
  return (
    <div className="candidate-panel">
      <div className="section-heading"><div><span className="eyebrow">Transparency first</span><h3>Tested versions</h3></div><span>{results.length} candidate{results.length === 1 ? '' : 's'}</span></div>
      <ul className="candidate-list">
        {results.map((result) => (
          <li key={result.id}>
            <span className={`status-dot ${result.status}`} aria-hidden="true">{result.status === 'success' && <CheckIcon />}</span>
            <div className="candidate-copy">
              <div><strong>{result.label}</strong>{result.id === bestId && <span className="best-badge">Best verified</span>}</div>
              <p>{result.status === 'checking' ? 'Testing accessibility…' : result.status === 'success' ? (result.width && result.height ? `${result.width.toLocaleString()} × ${result.height.toLocaleString()} pixels` : 'Accessible · resolution unknown') : result.error}</p>
              <span className="candidate-url" title={result.url}>{result.url}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
