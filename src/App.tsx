import { useEffect, useRef, useState } from 'react'
import { CandidateList } from './components/CandidateList'
import { Footer } from './components/Footer'
import { LegalPage } from './components/LegalPage'
import { Header } from './components/Header'
import { ImagePreview } from './components/ImagePreview'
import { LoadingState } from './components/LoadingState'
import { LayersIcon, LockIcon, MaximizeIcon, ShieldIcon, SparkleIcon } from './components/Icons'
import { UrlInput } from './components/UrlInput'
import { useImageCandidates } from './hooks/useImageCandidates'

function App() {
  const [url, setUrl] = useState('')
  const resultsRef = useRef<HTMLElement>(null)
  const { phase, results, error, best, analyze, reset } = useImageCandidates()
  const busy = phase === 'validating' || phase === 'testing' || phase === 'comparing'
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  const clear = () => { setUrl(''); reset() }
  const tryAgain = () => { clear(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  useEffect(() => {
    if ((phase !== 'testing' && phase !== 'complete') || results.length === 0) return

    const frame = window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      resultsRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [phase, results.length])

  if (currentPath === '/privacy') return <LegalPage kind="privacy" />
  if (currentPath === '/terms') return <LegalPage kind="terms" />


  return (
    <div className="app" id="top">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <Header />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-badge"><SparkleIcon /> Facebook image URL utility</div>
          <h1 id="hero-title">See your Facebook photos<br />in <span>better quality.</span></h1>
          <p>Paste a Facebook image URL to explore accessible versions, compare real dimensions, and open the best result we can verify.</p>
          <UrlInput value={url} onChange={(next) => { setUrl(next); if (error) reset() }} onSubmit={() => analyze(url)} onClear={clear} busy={busy} error={error} />
          <div className="trust-row"><span><ShieldIcon /> HTTPS Facebook CDN URLs only</span><span>•</span><span>No uploads</span><span>•</span><span>No URL storage</span></div>
        </section>

        {busy && <LoadingState phase={phase as 'validating' | 'testing' | 'comparing'} />}

        {results.length > 0 && phase !== 'idle' && (
          <section className="results" ref={resultsRef} aria-label="Image analysis results">
            {best && phase === 'complete' && <ImagePreview best={best} originalUrl={url.trim()} onTryAgain={tryAgain} />}
            <CandidateList results={results} bestId={phase === 'complete' ? best?.id : undefined} />
          </section>
        )}

        <section className="how-section" id="how-it-works">
          <div className="section-intro"><span className="eyebrow">Simple and honest</span><h2>How Lumixa works</h2><p>We check what Facebook makes accessible—without bypassing permissions or promising an unavailable original.</p></div>
          <div className="steps">
            <article><span className="step-icon"><LockIcon /></span><span className="step-number">01</span><h3>Validate safely</h3><p>We accept only HTTPS links from explicitly supported Facebook CDN hostnames.</p></article>
            <article><span className="step-icon"><LayersIcon /></span><span className="step-number">02</span><h3>Check safe variants</h3><p>The original loads first. A thumbnail-limited alternative is checked only when it can be generated safely.</p></article>
            <article><span className="step-icon"><MaximizeIcon /></span><span className="step-number">03</span><h3>Compare pixels</h3><p>Successful images are ranked by their measured natural dimensions—not by claims hidden in a URL.</p></article>
          </div>
        </section>

        <section className="about-card" id="about">
          <div className="about-icon"><ShieldIcon /></div>
          <div><h2>Built around privacy and clear limits</h2><p>Lumixa processes URLs in your browser. It does not upload, proxy, or store images, and it never attempts to bypass Facebook authentication. Signed CDN links can expire, and removing a thumbnail parameter does not guarantee a larger result.</p></div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
