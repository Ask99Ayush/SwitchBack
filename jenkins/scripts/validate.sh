#!/bin/bash

set -e

ENVIRONMENT=$1

if [ -z "$ENVIRONMENT" ]; then
    echo "Usage: validate.sh blue|green"
    exit 1
fi

echo "Validating ${ENVIRONMENT} deployment"

aws ecs wait services-stable \
    --cluster cloud-native-cicd-cluster \
    --services cloud-native-cicd-${ENVIRONMENT}

echo "ECS service is stable"

if [ "$ENVIRONMENT" = "blue" ]; then
    TARGET_GROUP_ARN=$BLUE_TARGET_GROUP_ARN
else
    TARGET_GROUP_ARN=$GREEN_TARGET_GROUP_ARN
fi

echo "Checking target health..."

aws elbv2 describe-target-health \
    --target-group-arn "${TARGET_GROUP_ARN}"

ALB_DNS=$(aws elbv2 describe-load-balancers \
    --names cloud-native-cicd-alb \
    --query 'LoadBalancers[0].DNSName' \
    --output text)

echo "ALB DNS: ${ALB_DNS}"

for i in {1..10}
do
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://${ALB_DNS}")

    if [ "$STATUS" = "200" ]; then
        echo "Application validation successful"
        exit 0
    fi
  
    echo "Attempt ${i}/10 failed (HTTP ${STATUS})"

    sleep 15
done

echo "Application validation failed"

exit 1