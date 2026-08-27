import { readFileSync } from 'fs'

const env = readFileSync('.env', 'utf8')
env.split('\n').forEach(line => {
  const [k, ...rest] = line.split('=')
  if (k && rest.length) process.env[k.trim()] = rest.join('=').trim()
})

const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_ACCOUNTS_URL } = process.env

async function getAccessToken() {
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
  const data = await res.json()
  if (!data.access_token) throw new Error(`Token error: ${JSON.stringify(data)}`)
  console.log('✓ Got access token\n')
  return data.access_token
}

const token = await getAccessToken()

// Step 1: list portals to find the correct portal identifier
console.log('=== Fetching portals ===')
const portalsRes = await fetch('https://backstage.zoho.com/api/v1/portals', {
  headers: { Authorization: `Zoho-oauthtoken ${token}` }
})
console.log('Status:', portalsRes.status)
const portalsText = await portalsRes.text()
try {
  console.log(JSON.stringify(JSON.parse(portalsText), null, 2))
} catch {
  console.log(portalsText.slice(0, 500))
}
