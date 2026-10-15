import type { FormEvent } from 'react'
import { ArrowIcon, LinkIcon } from './Icons'

interface UrlInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  onClear: () => void
  busy: boolean
  error?: string | null
}

export function UrlInput({ value, onChange, onSubmit, onClear, busy, error }: UrlInputProps) {
  const submit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="input-card" onSubmit={submit} noValidate>
      <label htmlFor="image-url">Facebook image URL</label>
      <div className={`input-shell ${error ? 'has-error' : ''}`}>
        <LinkIcon />
        <input
          id="image-url"
          type="url"
          inputMode="url"
          autoComplete="url"
          spellCheck={false}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://scontent...fbcdn.net/..."
          aria-describedby={error ? 'url-error url-hint' : 'url-hint'}
          aria-invalid={Boolean(error)}
          disabled={busy}
        />
        {value && !busy && <button className="text-button inline-clear" type="button" onClick={onClear}>Clear</button>}
      </div>
      {error && <p id="url-error" className="field-error" role="alert">{error}</p>}
      <div className="form-footer">
        <p id="url-hint">Your URL stays in this browser and is never stored by Lumixa.</p>
        <button className="primary-button" type="submit" disabled={busy || !value.trim()}>
          {busy ? 'Checking images…' : 'Reveal image'}
          {!busy && <ArrowIcon />}
        </button>
      </div>
    </form>
  )
}
