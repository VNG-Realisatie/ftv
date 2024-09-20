#!/bin/bash

# clone FSC repo
cd fsc
git clone --depth 1 https://gitlab.com/commonground/nlx/fsc-nlx.git

cp fsc-nlx/outway/authorization-interface.yaml auth/oas-auth.yaml

cd auth
oapi-codegen -config cfg-auth.yaml oas-auth.yaml
cd ..

# remove FSC repo
rm -Rf fsc-nlx
cd ..
