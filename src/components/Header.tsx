import { PrismLogoIcon } from './Icons'

export function Header({ compact = false }: { compact?: boolean }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Lumixa home">
        <span className="brand-mark"><PrismLogoIcon /></span>
        <span className="brand-name">Lumixa</span>
      </a>
      <span className="tagline">Reveal More. See Better.</span>
      {!compact && (
        <nav aria-label="Main navigation">
          <a href="/#how-it-works">How it works</a>
          <a href="/#about">About</a>
        </nav>
      )}
    </header>
  )
}
