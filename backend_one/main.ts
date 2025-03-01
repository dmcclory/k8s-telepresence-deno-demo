// this combines some example code from:
//
// https://docs.deno.com/examples/environment_variables/
// https://docs.deno.com/examples/http_server_routing/

const PORT = Number(Deno.env.get("PORT") || "3003")

const BOOKS: {[key: string]: {title: string}} = {
  "1": { title: "The Count of Monte Cristo" },
  "2": { title: "Intermezzo" },
  "3": { title: "Time and it's Adversaries in the Seleucid Empire" },
  "4": { title: "A Distant Mirror" },
  "5": { title: "The Librarianist" },
}

const BOOK_ROUTE = new URLPattern({ pathname: "/books/:id" });

function handler(req: Request): Response {
  const match = BOOK_ROUTE.exec(req.url);
  if (match) {
    const id: string | undefined = match.pathname.groups.id;
    if (id && BOOKS[id]) {
      return new Response(JSON.stringify({status: "Success", data: BOOKS[id]}), { status: 200});
    }
    else {
      return new Response(JSON.stringify({status: `No book found with ${id}`}), {status: 404});
    }
  }
  return new Response("Not found (try /books/1)", {
    status: 404,
  });
}

Deno.serve({ port: PORT}, handler);

