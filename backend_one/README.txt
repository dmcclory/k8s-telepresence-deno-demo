
# to build and run the docker file:


docker build -t test-deno-app .

docker run -it --rm -v ${PWD}:/app -p 3003:3003 test-deno-app
