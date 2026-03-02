// app/api/pga/route.js
// Server-side proxy for PGA Tour GraphQL API
// Keeps the API key off the client and solves CORS

const PGA_API = 'https://orchestrator.pgatour.com/graphql';
const PGA_KEY = 'da2-gsrx5bibzbb4njvhl7t37wqyl4';

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(PGA_API, {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-key':       PGA_KEY,
        'x-pgat-platform': 'web',
        'Origin':          'https://www.pgatour.com',
        'Referer':         'https://www.pgatour.com/',
        'User-Agent':      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data);

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
