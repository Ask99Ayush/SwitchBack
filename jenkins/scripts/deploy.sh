#!/bin/bash

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: deploy.sh blue|green"
    exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity \
--query Account \
--output text)

AWS_REGION="ap-south-1"

IMAGE_TAG=$(cat image-tag.txt)

IMAGE_URI="${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/cloud-native-cicd-app:${IMAGE_TAG}"

echo "Deploying image:"
echo "${IMAGE_URI}"

TASK_DEF=$(aws ecs describe-task-definition \
--task-definition cloud-native-cicd-task)

NEW_TASK_DEF=$(echo "${TASK_DEF}" | jq \
--arg IMAGE "${IMAGE_URI}" \
'.taskDefinition
| .containerDefinitions[0].image=$IMAGE
| del(
.taskDefinitionArn,
.revision,
.status,
.requiresAttributes,
.compatibilities,
.registeredAt,
.registeredBy
)')

echo "${NEW_TASK_DEF}" > task-definition.json

NEW_TASK_DEF_ARN=$(aws ecs register-task-definition \
--cli-input-json file://task-definition.json \
--query 'taskDefinition.taskDefinitionArn' \
--output text)

echo "New task definition:"
echo "${NEW_TASK_DEF_ARN}"

aws ecs update-service \
--cluster cloud-native-cicd-cluster \
--service cloud-native-cicd-${ENVIRONMENT} \
--task-definition "${NEW_TASK_DEF_ARN}"

echo "${ENVIRONMENT} deployment completed"