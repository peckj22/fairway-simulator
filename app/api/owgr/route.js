// app/api/owgr/route.js
// Server-side proxy for OWGR rankings API
// Solves CORS — OWGR only allows requests from owgr.com

const OWGR_BASE = 'https://apiweb.owgr.com/api/owgr';

export async function GET(request) {
  try {
    // Forward all query params from the client to OWGR
    const { searchParams } = new URL(request.url);
    const owgrUrl = `${OWGR_BASE}/rankings/getRankings?${searchParams.toString()}`;

    const res = await fetch(owgrUrl, {
      headers: {
        'Origin':  'https://www.owgr.com',
        'Referer': 'https://www.owgr.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const data = await res.json();
    return Response.json(data);

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
