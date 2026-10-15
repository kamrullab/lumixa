import { SparkleIcon } from './Icons'

export function Footer() {
  return (
    <footer>
      <a className="brand small" href="/" aria-label="Lumixa home"><span className="brand-mark"><SparkleIcon /></span><span>Lumixa</span></a>
      <p>Reveal More. See Better.</p>
      <nav className="footer-links" aria-label="Legal navigation">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </nav>
      <p>© {new Date().getFullYear()} Lumixa</p>
    </footer>
  )
}
