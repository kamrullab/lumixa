import { useState } from 'react'
import { CandidateList } from './components/CandidateList'
import { Header } from './components/Header'
import { ImagePreview } from './components/ImagePreview'
import { LoadingState } from './components/LoadingState'
import { LayersIcon, LockIcon, MaximizeIcon, ShieldIcon, SparkleIcon } from './components/Icons'
import { UrlInput } from './components/UrlInput'
import { useImageCandidates } from './hooks/useImageCandidates'

function App() {
  const [url, setUrl] = useState('')
  const { phase, results, error, best, analyze, reset } = useImageCandidates()
  const busy = phase === 'validating' || phase === 'testing' || phase === 'comparing'

  const clear = () => { setUrl(''); reset() }
  const tryAgain = () => { clear(); window.scrollTo({ top: 0, behavior: 'smooth' }) }

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
          <section className="results" aria-label="Image analysis results">
            {best && phase === 'complete' && <ImagePreview best={best} originalUrl={url.trim()} onTryAgain={tryAgain} />}
            <CandidateList results={results} bestId={phase === 'complete' ? best?.id : undefined} />
          </section>
        )}

        <section className="how-section" id="how-it-works">
          <div className="section-intro"><span className="eyebrow">Simple and honest</span><h2>How Lumixa works</h2><p>We test what Facebook makes accessible—without bypassing permissions or promising an unavailable original.</p></div>
          <div className="steps">
            <article><span className="step-icon"><LockIcon /></span><span className="step-number">01</span><h3>Validate safely</h3><p>We accept only HTTPS links from explicitly supported Facebook CDN hostnames.</p></article>
            <article><span className="step-icon"><LayersIcon /></span><span className="step-number">02</span><h3>Test real variants</h3><p>The original loads first. A thumbnail-limited alternative is tested only when it can be generated safely.</p></article>
            <article><span className="step-icon"><MaximizeIcon /></span><span className="step-number">03</span><h3>Compare pixels</h3><p>Successful images are ranked by their measured natural dimensions—not by claims hidden in a URL.</p></article>
          </div>
        </section>

        <section className="about-card" id="about">
          <div className="about-icon"><ShieldIcon /></div>
          <div><h2>Built around privacy and clear limits</h2><p>Lumixa processes URLs in your browser. It does not upload, proxy, or store images, and it never attempts to bypass Facebook authentication. Signed CDN links can expire, and removing a thumbnail parameter does not guarantee a larger result.</p></div>
        </section>
      </main>
      <footer><a className="brand small" href="#top"><span className="brand-mark"><SparkleIcon /></span><span>Lumixa</span></a><p>Reveal More. See Better.</p><p>© {new Date().getFullYear()} Lumixa</p></footer>
    </div>
  )
}

export default App
