import crypto from 'node:crypto'
import { list } from '@vercel/blob'

const { ADMIN_SECRET = 'tie-austin-cms-secret' } = process.env
const TOKEN_TTL = 24 * 60 * 60 * 1000
const HISTORY_PATH = 'site-content-history.json'

function verifyToken(authHeader) {
  if (!authHeader?.startsWith('Bearer ')) return false
  try {
    const { ts, sig } = JSON.parse(Buffer.from(authHeader.slice(7), 'base64url').toString())
    if (Date.now() - Number(ts) > TOKEN_TTL) return false
    const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(ts).digest('hex')
    return sig === expected
  } catch {
    return false
  }
}

async function readBlob(pathname) {
  try {
    const { blobs } = await list({ prefix: pathname })
    const blob = blobs.find((b) => b.pathname === pathname)
    if (!blob) return null
    const res = await fetch(`${blob.url}?t=${Date.now()}`)
    return res.json()
  } catch {
    return null
  }
}

// Read-only: returns the change list, or a single snapshot's full content
// (via ?id=) so the client can load it into the local draft. Nothing is
// written here — publishing (POST /api/admin-content) is what persists.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const history = (await readBlob(HISTORY_PATH)) || []
  const { id } = req.query

  if (id) {
    const entry = history.find((e) => e.id === id)
    if (!entry) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(entry)
  }

  const summary = history.map(({ id: entryId, message, timestamp }) => ({ id: entryId, message, timestamp }))
  return res.status(200).json(summary)
}
