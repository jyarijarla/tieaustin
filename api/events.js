// Zoho Backstage → TiE Austin events proxy
// Set these in Vercel dashboard → Project → Settings → Environment Variables:
//   ZOHO_CLIENT_ID
//   ZOHO_CLIENT_SECRET
//   ZOHO_REFRESH_TOKEN
//   ZOHO_PORTAL_ID       (from your Backstage portal URL)
//   ZOHO_BRAND_ID        (from your Backstage brand URL)
//   ZOHO_ACCOUNTS_URL    (default: https://accounts.zoho.com — change for .eu/.in regions)

const {
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN,
  ZOHO_PORTAL_ID,
  ZOHO_BRAND_ID,
  ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.com',
} = process.env

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
  if (!data.access_token) throw new Error('Failed to get Zoho access token')
  return data.access_token
}

function parseDate(dateStr) {
  if (!dateStr) return { day: '—', month: '—', year: '—', iso: null }
  const d = new Date(dateStr)
  return {
    day: d.getDate().toString(),
    month: d.toLocaleString('en-US', { month: 'short' }),
    year: d.getFullYear().toString(),
    iso: d.toISOString(),
  }
}

export default async function handler(req, res) {
  try {
    const token = await getAccessToken()

    const zohoRes = await fetch(
      `https://www.zohoapis.com/backstage/v3/portals/${ZOHO_PORTAL_ID}/events?status=all&brand_id=${ZOHO_BRAND_ID}`,
      { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
    )

    if (!zohoRes.ok) {
      const text = await zohoRes.text()
      throw new Error(`Zoho API error ${zohoRes.status}: ${text}`)
    }

    const data = await zohoRes.json()
    const now = Date.now()

    const events = (data.events ?? []).map((e) => {
      const startMs = e.start_time ? new Date(e.start_time).getTime() : null
      const endMs = e.end_time ? new Date(e.end_time).getTime() : startMs
      return {
        id: e.id,
        title: e.name,
        location: e.venues?.[0]
          ? [e.venues[0].name, e.venues[0].city].filter(Boolean).join(' · ')
          : '',
        desc: e.summary ?? e.description ?? '',
        date: parseDate(e.start_time),
        url: e.website_url ?? null,
        isPast: endMs !== null ? endMs < now : false,
      }
    })

    // upcoming: soonest first; past: most recent first
    const upcoming = events
      .filter((e) => !e.isPast)
      .sort((a, b) => new Date(a.date.iso) - new Date(b.date.iso))

    const past = events
      .filter((e) => e.isPast)
      .sort((a, b) => new Date(b.date.iso) - new Date(a.date.iso))

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate')
    res.status(200).json({ upcoming, past })
  } catch (err) {
    console.error('events handler error:', err)
    res.status(500).json({ error: err.message })
  }
}
