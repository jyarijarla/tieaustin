import { useEffect, useState } from 'react'

// Mailchimp embedded form (TiE list) — submitted via the JSONP endpoint so the
// result shows in the modal instead of opening Mailchimp in a new tab
const MC_URL = 'https://tie.us9.list-manage.com/subscribe/post-json'
const MC_PARAMS = { u: '7f76d417251e9c67a60253ee4', id: '671016483d', f_id: '0076d5e3f0' }
const HONEYPOT = 'b_7f76d417251e9c67a60253ee4_671016483d'

// `full` fields span both columns on wider screens
const FIELDS = [
  { name: 'EMAIL',   label: 'Email address',   type: 'email', required: true, full: true, autoComplete: 'email' },
  { name: 'FNAME',   label: 'First name',      type: 'text',  required: true, autoComplete: 'given-name' },
  { name: 'LNAME',   label: 'Last name',       type: 'text',  autoComplete: 'family-name' },
  { name: 'PHONE',   label: 'Phone',           type: 'tel',   autoComplete: 'tel' },
  { name: 'MMERGE8', label: 'Company',         type: 'text',  autoComplete: 'organization' },
  { name: 'MMERGE6', label: 'Membership type', type: 'text',  full: true },
]

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb = `mc_cb_${Date.now()}`
    const script = document.createElement('script')
    const cleanup = () => { delete window[cb]; script.remove() }
    window[cb] = (data) => { cleanup(); resolve(data) }
    script.onerror = () => { cleanup(); reject(new Error('Network error')) }
    script.src = `${url}&c=${cb}`
    document.body.appendChild(script)
  })
}

// Mailchimp messages can contain HTML (links) and a "0 - " field prefix
function cleanMsg(msg = '') {
  return msg.replace(/<[^>]*>/g, '').replace(/^\d+\s*-\s*/, '')
}

export default function SubscribeModal({ onClose }) {
  const [values, setValues] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    // lock page scroll behind the modal
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const params = new URLSearchParams({ ...MC_PARAMS, ...values, [HONEYPOT]: values[HONEYPOT] ?? '' })
    try {
      const data = await jsonp(`${MC_URL}?${params}`)
      setStatus(data.result === 'success' ? 'success' : 'error')
      setMessage(cleanMsg(data.msg))
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }))

  const inputCls =
    'w-full px-3.5 py-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-md outline-none ' +
    'placeholder-gray-400 focus:bg-white focus:border-[#7D1426] focus:ring-4 focus:ring-[#7D1426]/10 transition'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-title"
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — fixed */}
        <div className="relative shrink-0 px-7 pt-7 pb-5 border-b border-gray-100">
          <div className="absolute inset-x-0 top-0 h-1" style={{ background: '#7D1426' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[#7D1426] text-[11px] font-bold tracking-[0.25em] uppercase mb-1.5">TiE Austin Newsletter</p>
              <h2 id="subscribe-title" className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                Stay in the loop
              </h2>
              <p className="text-sm text-gray-500 mt-1">Event announcements, programs, and chapter news.</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="shrink-0 -mr-2 -mt-1 w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        {status === 'success' ? (
          <div className="px-7 py-12 text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center bg-[#7D1426]/10 text-[#7D1426]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <p className="text-base font-bold text-gray-900">You're subscribed</p>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">{message}</p>
            <button
              onClick={onClose}
              className="mt-7 px-8 py-2.5 text-sm font-semibold text-white rounded-md hover:opacity-90 transition-opacity"
              style={{ background: '#7D1426' }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col min-h-0">
            {/* Fields — the only part that scrolls */}
            <div className="overflow-y-auto px-7 py-6 [scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
                {FIELDS.map((f) => (
                  <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
                    <label htmlFor={`mce-${f.name}`} className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {f.label}
                      {f.required
                        ? <span className="text-[#7D1426] ml-0.5">*</span>
                        : <span className="font-normal text-gray-400 ml-1">(optional)</span>}
                    </label>
                    <input
                      id={`mce-${f.name}`}
                      type={f.type}
                      required={f.required}
                      autoComplete={f.autoComplete}
                      autoFocus={f.name === 'EMAIL'}
                      value={values[f.name] ?? ''}
                      onChange={set(f.name)}
                      className={inputCls}
                    />
                  </div>
                ))}
              </div>

              {/* bot trap — real people never see or fill this */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                <input type="text" tabIndex={-1} value={values[HONEYPOT] ?? ''} onChange={set(HONEYPOT)} />
              </div>

              {status === 'error' && (
                <p className="mt-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">{message}</p>
              )}
            </div>

            {/* Footer — fixed */}
            <div className="shrink-0 px-7 py-5 border-t border-gray-100 bg-gray-50/60">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 text-sm font-semibold text-white rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ background: '#7D1426' }}
              >
                {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
              </button>
              <div className="flex items-center justify-between gap-4 mt-3">
                <p className="text-[11px] text-gray-400">We respect your inbox. Unsubscribe anytime.</p>
                <a href="http://eepurl.com/iYbbto" target="_blank" rel="noopener noreferrer" title="Intuit Mailchimp" className="shrink-0">
                  <img
                    src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                    alt="Intuit Mailchimp"
                    className="h-5 opacity-40 hover:opacity-80 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
