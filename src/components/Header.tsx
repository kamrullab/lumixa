import { SparkleIcon } from './Icons'

export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Lumixa home">
        <span className="brand-mark"><SparkleIcon /></span>
        <span>Lumixa</span>
      </a>
      <span className="tagline">Reveal More. See Better.</span>
      <nav aria-label="Main navigation">
        <a href="#how-it-works">How it works</a>
        <a href="#about">About</a>
      </nav>
    </header>
  )
}
