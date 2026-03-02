// app/api/headshot/[playerId]/route.js
// Proxies PGA Tour player headshots to avoid CORS/hotlinking blocks

export async function GET(request, { params }) {
  try {
    const { playerId } = await params;
    const url = `https://pga-tour-res.cloudinary.com/image/upload/c_fill,dpr_2.0,f_auto,g_face:center,h_300,q_auto,w_300/headshots_${playerId}.jpg`;

    const res = await fetch(url, {
      headers: {
        'Referer': 'https://www.pgatour.com/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!res.ok) {
      return new Response('Not found', { status: 404 });
    }

    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // cache for 24 hours
      },
    });

  } catch (err) {
    return new Response('Error', { status: 500 });
  }
}
