#!/bin/bash

set -e

APP_NAME="cloud-native-cicd-app"
AWS_REGION="ap-south-1"

IMAGE_TAG=$(git rev-parse --short HEAD)

echo "Starting Build Stage"
echo "Application: ${APP_NAME}"
echo "Image Tag: ${IMAGE_TAG}"

ACCOUNT_ID=$(aws sts get-caller-identity 
--query Account 
--output text)

ECR_URI=${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${APP_NAME}

echo "Building Docker image..."

docker build 
-t ${APP_NAME}:${IMAGE_TAG} 
app/

echo "Running Trivy security scan..."

trivy image 
--severity HIGH,CRITICAL 
--exit-code 1 
${APP_NAME}:${IMAGE_TAG}

echo "Logging into Amazon ECR..."

aws ecr get-login-password | docker login 
--username AWS 
--password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

echo "Tagging images..."

docker tag 
${APP_NAME}:${IMAGE_TAG} 
${ECR_URI}:${IMAGE_TAG}

docker tag 
${APP_NAME}:${IMAGE_TAG} 
${ECR_URI}

echo "Pushing image tag ${IMAGE_TAG}..."

docker push ${ECR_URI}:${IMAGE_TAG}

echo "Pushing image tag latest..."

docker push ${ECR_URI}

echo "${IMAGE_TAG}" > image-tag.txt

echo "Cleaning local Docker images..."

docker rmi 
${APP_NAME}:${IMAGE_TAG} 
${ECR_URI}:${IMAGE_TAG} 
${ECR_URI} || true

docker image prune -f || true

echo "Build completed successfully"
echo "Image URI: ${ECR_URI}:${IMAGE_TAG}"
