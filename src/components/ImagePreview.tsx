import { useState } from 'react'
import type { CandidateResult } from '../types/image'
import { CheckIcon, CopyIcon, DownloadIcon, ExternalIcon, ImageIcon, RotateIcon } from './Icons'

interface ImagePreviewProps {
  best: CandidateResult
  originalUrl: string
  onTryAgain: () => void
}

const openSafely = (url: string) => {
  const opened = window.open(url, '_blank', 'noopener,noreferrer')
  if (opened) opened.opener = null
}

export function ImagePreview({ best, originalUrl, onTryAgain }: ImagePreviewProps) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(best.url)
      setCopyError(false)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
      setCopyError(true)
    }
  }

  return (
    <div className="result-card">
      <div className="preview-frame">
        <img src={best.url} alt="Best accessible Facebook image result" referrerPolicy="no-referrer" />
        <span className="verified-pill"><CheckIcon /> Best accessible result</span>
      </div>
      <div className="result-details">
        <span className="eyebrow">Verified by actual image load</span>
        <h2>Best accessible image</h2>
        <div className="dimension-block">
          <ImageIcon />
          <div><span>Resolution</span><strong>{best.width && best.height ? `${best.width.toLocaleString()} × ${best.height.toLocaleString()}` : 'Unknown'}</strong></div>
          {best.width && best.height && <span className="megapixels">{((best.width * best.height) / 1_000_000).toFixed(1)} MP</span>}
        </div>
        <p className="result-note">This is the largest version Lumixa could verify from the safe candidates tested. It may not be the original upload.</p>
        <div className="action-stack">
          <button className="primary-button wide" onClick={() => openSafely(best.url)}>Open best image <ExternalIcon /></button>
          <div className="secondary-actions">
            <a className="secondary-button" href={best.url} download="lumixa-image" target="_blank" rel="noopener noreferrer" aria-label="Download the best accessible image"><DownloadIcon /> Download image</a>
            <button className="secondary-button" onClick={copyUrl}>{copied ? <CheckIcon /> : <CopyIcon />}{copied ? 'Copied' : 'Copy image URL'}</button>
            <button className="secondary-button" onClick={() => openSafely(originalUrl)}><ExternalIcon /> Open original URL</button>
          </div>
          {copyError && <p className="copy-error" role="alert">Clipboard access was blocked. Open the image and copy its URL from the address bar.</p>}
          <p className="download-note">If the CDN prevents direct downloads, your browser will open the image so you can save it manually.</p>
          <button className="text-button retry" onClick={onTryAgain}><RotateIcon /> Try another URL</button>
        </div>
      </div>
    </div>
  )
}
