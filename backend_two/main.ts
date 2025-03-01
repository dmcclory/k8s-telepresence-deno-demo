// this combines some example code from:
//
// https://docs.deno.com/examples/environment_variables/
// https://docs.deno.com/examples/http_server_routing/

const PORT = Number(Deno.env.get("PORT") || "3004")

const MOVIES: {[key: string]: {title: string}} = {
  "1": { title: "When Harry Met Sally" },
  "2": { title: "Nickel Boys" },
  "3": { title: "Attack the Block" },
  "4": { title: "Police Story 3: Supercop" },
  "5": { title: "Roman Holiday" },
}

const MOVIE_ROUTE = new URLPattern({ pathname: "/movies/:id" });

function handler(req: Request): Response {
  const match = MOVIE_ROUTE.exec(req.url);
  if (match) {
    const id: string | undefined = match.pathname.groups.id;
    if (id && MOVIES[id]) {
      return new Response(JSON.stringify({status: "Success", data: MOVIES[id]}), { status: 200});
    }
    else {
      return new Response(JSON.stringify({status: `No movie found with ${id}`}), {status: 404});
    }
  }
  return new Response("Not found (try /movies/1)", {
    status: 404,
  });
}

Deno.serve({ port: PORT}, handler);

