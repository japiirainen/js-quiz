#!/bin/bash
echo What should the version be?
read VERSION
echo $VERSION

docker build -t japiirainen/js-quiz-client:$VERSION ./client
docker push japiirainen/js-quiz-client:$VERSION
ssh do "docker pull japiirainen/js-quiz-client:$VERSION && docker tag japiirainen/js-quiz-client:$VERSION dokku/js-quiz-client:$VERSION && dokku deploy js-quiz-client $VERSION"
