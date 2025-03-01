# this is from:
# https://docs.deno.com/runtime/reference/docker/
FROM denoland/deno:latest

WORKDIR /app

COPY . .

RUN deno cache main.ts

CMD ["deno", "run", "--allow-net", "--allow-env", "main.ts"]
