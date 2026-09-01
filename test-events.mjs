import { readFileSync } from 'fs'

const env = readFileSync('.env', 'utf8')
env.split('\n').forEach(line => {
  const [k, ...rest] = line.split('=')
  if (k && rest.length) process.env[k.trim()] = rest.join('=').trim()
})

const {
  ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN,
  ZOHO_PORTAL_ID, ZOHO_BRAND_ID, ZOHO_ACCOUNTS_URL,
} = process.env

async function getToken() {
  const res = await fetch(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      refresh_token: ZOHO_REFRESH_TOKEN,
    }),
  })
  const d = await res.json()
  if (!d.access_token) throw new Error(JSON.stringify(d))
  console.log('✓ Access token obtained\n')
  return d.access_token
}

const token = await getToken()

console.log('=== Fetching all events (status=all) ===')
const r = await fetch(
  `https://www.zohoapis.com/backstage/v3/portals/${ZOHO_PORTAL_ID}/events?status=all&brand_id=${ZOHO_BRAND_ID}`,
  { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
)
console.log('HTTP status:', r.status)
const data = await r.json()
const events = data.events ?? []
console.log(`Total events: ${events.length}\n`)

const now = Date.now()
const upcoming = events.filter(e => !e.end_time || new Date(e.end_time).getTime() >= now)
const past     = events.filter(e => e.end_time && new Date(e.end_time).getTime() < now)

console.log(`Upcoming: ${upcoming.length}`)
upcoming.forEach(e => console.log(`  • [${e.start_time?.slice(0,10)}] ${e.name}`))

console.log(`\nPast: ${past.length}`)
past.slice(0, 10).forEach(e => console.log(`  • [${e.start_time?.slice(0,10)}] ${e.name}`))
if (past.length > 10) console.log(`  … and ${past.length - 10} more`)
