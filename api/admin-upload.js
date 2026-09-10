import crypto from 'node:crypto'
import { put } from '@vercel/blob'

const { ADMIN_SECRET = 'tie-austin-cms-secret' } = process.env
const TOKEN_TTL = 24 * 60 * 60 * 1000

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

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  if (!verifyToken(req.headers.authorization)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { filename, dataUrl } = req.body
    const base64 = dataUrl.split(',')[1]
    const buffer = Buffer.from(base64, 'base64')
    const ext = filename.split('.').pop().toLowerCase()
    const uniqueName = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const blob = await put(uniqueName, buffer, {
      access: 'public',
      contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
    })

    res.status(200).json({ url: blob.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
