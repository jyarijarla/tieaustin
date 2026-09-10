import crypto from 'node:crypto'

const { ADMIN_PASSWORD, ADMIN_SECRET = 'tie-austin-cms-secret' } = process.env

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body ?? {}
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  const ts = Date.now().toString()
  const sig = crypto.createHmac('sha256', ADMIN_SECRET).update(`${ts}`).digest('hex')
  const token = Buffer.from(JSON.stringify({ ts, sig })).toString('base64url')

  res.status(200).json({ token })
}
