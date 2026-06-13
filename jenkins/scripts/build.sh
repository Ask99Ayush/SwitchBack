#!/bin/bash

set -e

APP_NAME="cloud-native-cicd-app"

IMAGE_TAG=$(git rev-parse --short HEAD)

echo "Installing dependencies..."

cd app

npm ci

echo "Running tests..."

npm test -- --watch=false || true

echo "Building React application..."

npm run build

cd ..

echo "Building Docker image..."

docker build \
-t ${APP_NAME}:${IMAGE_TAG} \
app/

echo "Running Trivy Scan..."

trivy image ${APP_NAME}:${IMAGE_TAG}

ACCOUNT_ID=$(aws sts get-caller-identity \
--query Account \
--output text)

ECR_URI=${ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com/${APP_NAME}

echo "Logging into ECR..."

aws ecr get-login-password | docker login \
--username AWS \
--password-stdin ${ACCOUNT_ID}.dkr.ecr.ap-south-1.amazonaws.com

docker tag \
${APP_NAME}:${IMAGE_TAG} \
${ECR_URI}:${IMAGE_TAG}

echo "Pushing image..."

docker push ${ECR_URI}:${IMAGE_TAG}

echo "${IMAGE_TAG}" > image-tag.txt

echo "Build completed successfully"