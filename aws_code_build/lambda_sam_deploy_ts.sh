npm i
npm run build-dev

aws cloudformation package \
  --template-file sam/dev/template.yaml \
  --s3-bucket uni-cloudformation-dev \
  --s3-prefix sam/lambda_sam_deploy_ts/dev/package \
  --output-template-file packaged.yaml

aws cloudformation deploy \
  --template-file packaged.yaml \
  --stack-name lambda-sam-deploy-ts