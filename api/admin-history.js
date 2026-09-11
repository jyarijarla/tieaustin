import crypto from 'node:crypto'
import { put, list } from '@vercel/blob'
import { appendHistory } from './admin-content.js'

const { ADMIN_SECRET = 'tie-austin-cms-secret' } = process.env
const TOKEN_TTL = 24 * 60 * 60 * 1000
const BLOB_PATH = 'site-content.json'
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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const history = (await readBlob(HISTORY_PATH)) || []
    const summary = history.map(({ id, message, timestamp }) => ({ id, message, timestamp }))
    return res.status(200).json(summary)
  }

  if (req.method === 'POST') {
    const { id, message } = req.body ?? {}
    if (!id) return res.status(400).json({ error: 'Missing id' })
    try {
      const history = (await readBlob(HISTORY_PATH)) || []
      const entry = history.find((e) => e.id === id)
      if (!entry) return res.status(404).json({ error: 'Not found' })

      await put(BLOB_PATH, JSON.stringify(entry.content), {
        access: 'public',
        contentType: 'application/json',
        addRandomSuffix: false,
      })
      await appendHistory({
        message: (message && message.trim()) || `Revert to "${entry.message}"`,
        content: entry.content,
      })

      return res.status(200).json({ content: entry.content })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }

  res.status(405).end()
}
