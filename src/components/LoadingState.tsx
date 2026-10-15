interface LoadingStateProps { phase: 'validating' | 'testing' | 'comparing' }

const phaseText = {
  validating: ['Validating URL', 'Checking protocol and Facebook CDN hostname'],
  testing: ['Checking available image versions', 'Loading each safe candidate independently'],
  comparing: ['Comparing image dimensions', 'Selecting the largest verified result'],
}

export function LoadingState({ phase }: LoadingStateProps) {
  const [title, detail] = phaseText[phase]
  return (
    <section className="status-card" aria-live="polite" aria-busy="true">
      <span className="loader" aria-hidden="true" />
      <div><strong>{title}</strong><p>{detail}</p></div>
    </section>
  )
}
