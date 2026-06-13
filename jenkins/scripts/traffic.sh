#!/bin/bash

set -e

TARGET=$1

if [ -z "$ALB_LISTENER_ARN" ]; then
    echo "ALB_LISTENER_ARN not set"
    exit 1
fi

if [ -z "$BLUE_TARGET_GROUP_ARN" ]; then
    echo "BLUE_TARGET_GROUP_ARN not set"
    exit 1
fi

if [ -z "$GREEN_TARGET_GROUP_ARN" ]; then
    echo "GREEN_TARGET_GROUP_ARN not set"
    exit 1
fi

if [ "$TARGET" = "green" ]; then

    aws elbv2 modify-listener \
    --listener-arn "${ALB_LISTENER_ARN}" \
    --default-actions Type=forward,ForwardConfig='{
      "TargetGroups":[
        {
          "TargetGroupArn":"'"${BLUE_TARGET_GROUP_ARN}"'",
          "Weight":0
        },
        {
          "TargetGroupArn":"'"${GREEN_TARGET_GROUP_ARN}"'",
          "Weight":100
        }
      ]
    }'

    echo "Traffic switched to GREEN"

elif [ "$TARGET" = "blue" ]; then

    aws elbv2 modify-listener \
    --listener-arn "${ALB_LISTENER_ARN}" \
    --default-actions Type=forward,ForwardConfig='{
      "TargetGroups":[
        {
          "TargetGroupArn":"'"${BLUE_TARGET_GROUP_ARN}"'",
          "Weight":100
        },
        {
          "TargetGroupArn":"'"${GREEN_TARGET_GROUP_ARN}"'",
          "Weight":0
        }
      ]
    }'

    echo "Traffic switched to BLUE"

else

    echo "Usage: traffic.sh blue|green"
    exit 1

fi