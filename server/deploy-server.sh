#!/bin/bash

echo What should the version be?
read VERSION
echo $VERSION

docker build -t japiirainen/js-quiz:$VERSION . 
docker push japiirainen/js-quiz:$VERSION
ssh personal "docker pull japiirainen/js-quiz:$VERSION && docker tag japiirainen/js-quiz:$VERSION dokku/js-quiz-server:$VERSION && dokku deploy js-quiz-server $VERSION"
