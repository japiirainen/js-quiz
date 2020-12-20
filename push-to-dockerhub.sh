#!/bin/bash

echo server tag?
read SERVER_VERSION
echo $SERVER_VERSION


docker build -t japiirainen/js-quiz:$SERVER_VERSION ./server
docker push japiirainen/js-quiz:$SERVER_VERSION

echo client version?
read CLIENT_VERSION
echo $CLIENT_VERSION

docker build -t japiirainen/js-quiz-client:$CLIENT_VERSION ./client
docker push japiirainen/js-quiz-client:$CLIENT_VERSION