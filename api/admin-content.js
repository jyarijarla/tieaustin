import crypto from 'node:crypto'
import { put, list } from '@vercel/blob'

const { ADMIN_SECRET = 'tie-austin-cms-secret' } = process.env
const TOKEN_TTL = 24 * 60 * 60 * 1000
const BLOB_PATH = 'site-content.json'
const HISTORY_PATH = 'site-content-history.json'
const HISTORY_LIMIT = 30

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
    const res = await fetch(`${blob.url}?t=${Date.now()}`) // bust cache
    return res.json()
  } catch {
    return null
  }
}

async function readContent() {
  return readBlob(BLOB_PATH)
}

export async function appendHistory({ message, content }) {
  const history = (await readBlob(HISTORY_PATH)) || []
  const entry = { id: crypto.randomUUID(), message, timestamp: Date.now(), content }
  const next = [entry, ...history].slice(0, HISTORY_LIMIT)
  await put(HISTORY_PATH, JSON.stringify(next), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
  return entry
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
    const { content, message } = req.body ?? {}
    if (!content || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Missing content or commit message' })
    }
    try {
      await put(BLOB_PATH, JSON.stringify(content), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
        allowOverwrite: true,
      })
      await appendHistory({ message: message.trim(), content })
      return res.status(200).json({ ok: true })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  res.status(405).end()
}
