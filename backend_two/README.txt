
# to build and run the docker file:


docker build -t movies-deno-app .

docker run -it --rm -v ${PWD}:/app -p 3004:3004 movies-deno-app
