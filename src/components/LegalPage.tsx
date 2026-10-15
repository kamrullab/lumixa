import { useEffect } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { ShieldIcon } from './Icons'

type LegalKind = 'privacy' | 'terms'

const content = {
  privacy: {
    title: 'Privacy Policy',
    description: 'How Lumixa handles image URLs, browser processing, and your privacy.',
  },
  terms: {
    title: 'Terms of Use',
    description: 'The rules and limitations that apply when using Lumixa.',
  },
}

export function LegalPage({ kind }: { kind: LegalKind }) {
  const page = content[kind]

  useEffect(() => {
    document.title = `${page.title} | Lumixa`
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = page.description
  }, [page])

  return (
    <div className="app legal-app" id="top">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <Header compact />
      <main className="legal-main">
        <a className="back-link" href="/">← Back to Lumixa</a>
        <header className="legal-hero">
          <span className="legal-icon"><ShieldIcon /></span>
          <span className="eyebrow">Lumixa legal</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <span className="effective-date">Effective October 15, 2026</span>
        </header>

        {kind === 'privacy' ? <PrivacyContent /> : <TermsContent />}
      </main>
      <Footer />
    </div>
  )
}

function PrivacyContent() {
  return (
    <article className="legal-content">
      <section><h2>Privacy at a glance</h2><p>Lumixa is designed to process submitted image URLs in your browser. We do not require an account, upload images to a Lumixa server, or intentionally store the URLs you enter.</p></section>
      <section><h2>Information you provide</h2><p>When you paste a Facebook CDN image URL, the URL stays in the current browser session. Your browser sends image requests directly to the hostname in that URL so it can determine whether the image loads and, when available, read its natural dimensions.</p></section>
      <section><h2>Information Lumixa does not collect</h2><ul><li>No user accounts or profile information</li><li>No uploaded image files</li><li>No database of submitted URLs</li><li>No advertising or cross-site tracking cookies</li><li>No sale or sharing of personal information</li></ul></section>
      <section><h2>Third-party requests</h2><p>Loading an image contacts Facebook's CDN directly. Facebook may receive technical information normally included in a web request, such as your IP address and browser details. Facebook's own terms and privacy practices apply to those requests.</p></section>
      <section><h2>Local browser features</h2><p>Copying a URL uses your browser's clipboard API. Downloading or opening an image uses the browser's native controls. Lumixa does not receive the clipboard contents or downloaded image.</p></section>
      <section><h2>Hosting and technical logs</h2><p>The hosting provider may process short-lived security and access logs needed to deliver the website. Lumixa does not use these logs to build user profiles.</p></section>
      <section><h2>Children's privacy</h2><p>Lumixa is a general-purpose utility and is not directed to children under 13. We do not knowingly collect personal information from children.</p></section>
      <section><h2>Changes and questions</h2><p>Material policy changes will be posted on this page with a revised effective date. Questions can be raised through the Lumixa GitHub repository; do not include private or signed image URLs in public issues.</p></section>
    </article>
  )
}

function TermsContent() {
  return (
    <article className="legal-content">
      <section><h2>Acceptance of these terms</h2><p>By using Lumixa, you agree to these terms. If you do not agree, do not use the service.</p></section>
      <section><h2>Permitted use</h2><p>Use Lumixa only with image URLs you are authorized to access. You must follow applicable laws, Facebook's terms, and the rights of image owners.</p></section>
      <section><h2>Prohibited use</h2><ul><li>Do not attempt to bypass authentication, permissions, signatures, or access controls.</li><li>Do not use Lumixa to infringe copyright, privacy, or other rights.</li><li>Do not interfere with the service or use automated traffic that harms availability.</li><li>Do not misrepresent an accessible image as an original or higher-resolution upload without evidence.</li></ul></section>
      <section><h2>How results work</h2><p>Lumixa tests a limited set of safe URL variants and ranks images that actually load by measurable pixel dimensions. Results depend on what Facebook's CDN makes accessible. A larger or original image is never guaranteed.</p></section>
      <section><h2>Availability and changes</h2><p>The service is provided on an “as is” and “as available” basis. Signed URLs may expire, CDN behavior may change, and features may be modified or discontinued without notice.</p></section>
      <section><h2>Intellectual property</h2><p>Lumixa's interface, branding, and original code are protected by applicable laws and the repository's license. Images processed through the utility remain subject to their owners' rights.</p></section>
      <section><h2>Disclaimer and liability</h2><p>To the fullest extent permitted by law, Lumixa makes no warranties about availability, accuracy, fitness for a particular purpose, or access to any image. Lumixa is not liable for indirect, incidental, or consequential losses arising from use of the service.</p></section>
      <section><h2>Changes and contact</h2><p>Updated terms will be posted here with a revised effective date. Questions can be raised through the Lumixa GitHub repository without including private or signed image URLs.</p></section>
    </article>
  )
}
