#!/bin/sh

if [ $# < 1 ]; then
  echo "[ERROR!] one or more arguments are required"
  exit -1
fi

STAGE=$1

npm i
npm run build-${STAGE}

aws cloudformation package \
  --template-file aws/sam/${STAGE}/template.yaml \
  --s3-bucket uni-cloudformation-artifact-${STAGE} \
  --s3-prefix sam/lambda_sam_deploy_ts/${STAGE}/package \
  --output-template-file packaged.yaml

aws cloudformation deploy \
  --template-file packaged.yaml \
  --stack-name lambda-sam-deploy-ts