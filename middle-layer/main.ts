// this combines some example code from:
//
// https://docs.deno.com/examples/environment_variables/
// https://docs.deno.com/examples/http_server_routing/

const PORT = Number(Deno.env.get("PORT") || "3005")

const MOVIES_HOST = Deno.env.get("MOVIES_HOST") || "http://localhost:3004"
const BOOKS_HOST = Deno.env.get("BOOKS_HOST") || "http://localhost:3003"

async function handler(req: Request): Response {
  const params = new URL(req.url).searchParams
  const media_type = params.get('media_type')
  const media_id = params.get('media_id')

  console.log('hey!!! - a new request!');

  if (!media_type || !['movies', 'books'].includes(media_type)) {
    return new Response(JSON.stringify({status: `Must provide a media_type value - 'books' or 'movies'`}), {status: 400});
  }
  if (!media_id) {
    return new Response(JSON.stringify({status: `Must provide a media_id value`}), {status: 400});
  }

  const host = media_type === 'books' ? BOOKS_HOST : MOVIES_HOST
  const result = await fetch(`${host}/${media_type}/${media_id}`)
  if (result.status >= 400) {
    return result 
  }
  const data = await result.json()
  return new Response(JSON.stringify({...data, extra: 'COOL', neat: 'oh yes'}, { status: result.status }));
  //return result
}

Deno.serve({ port: PORT}, handler);
