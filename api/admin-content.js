import crypto from 'node:crypto'
import { put, list } from '@vercel/blob'

const { ADMIN_SECRET = 'tie-austin-cms-secret' } = process.env
const TOKEN_TTL = 24 * 60 * 60 * 1000
const BLOB_PATH = 'site-content.json'

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

async function readContent() {
  try {
    const { blobs } = await list({ prefix: BLOB_PATH })
    const blob = blobs.find((b) => b.pathname === BLOB_PATH)
    if (!blob) return null
    const res = await fetch(`${blob.url}?t=${Date.now()}`) // bust cache
    return res.json()
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method === 'GET') {
    const content = await readContent()
    return res.status(200).json(content)
  }

  if (req.method === 'POST') {
    if (!verifyToken(req.headers.authorization)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    try {
      await put(BLOB_PATH, JSON.stringify(req.body), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      })
      return res.status(200).json({ ok: true })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  res.status(405).end()
}
