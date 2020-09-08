#!/bin/bash

echo What should the version be?
read VERSION
echo $VERSION

docker build -t japiirainen/js-quiz:$VERSION . 
docker push japiirainen/js-quiz:$VERSION
ssh root@138.68.70.41 "docker pull japiirainen/js-quiz:$VERSION && docker tag japiirainen/js-quiz:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
