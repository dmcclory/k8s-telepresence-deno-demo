// this combines some example code from:
//
// https://docs.deno.com/examples/environment_variables/
// https://docs.deno.com/examples/http_server_routing/

const PORT = Number(Deno.env.get("PORT") || "3006")

const MIDDLE_HOST = Deno.env.get("MIDDLE_HOST") || "http://localhost:3005"

const randomInt = () => {
  return Math.floor(Math.random() * 10)
}

const randomMediaType = () => {
  return randomInt() % 2 === 0 ? 'movies' : 'books'
}

const randomMediaId = () => {
  return (randomInt() % 5) + 1
}

async function handler(req: Request): Promise<Response> {
  const media_type = randomMediaType()
  const media_id = randomMediaId()
  console.log("we have???", {media_id, media_type})
  const result = await fetch(`${MIDDLE_HOST}?media_type=${media_type}&media_id=${media_id}`)
  return result
}

Deno.serve({ port: PORT}, handler);
