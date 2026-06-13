#!/bin/bash

set -e

echo "Loading Terraform outputs..."

ALB_LISTENER_ARN=$(terraform -chdir=infrastructure/terraform output -raw alb_listener_arn)

BLUE_TARGET_GROUP_ARN=$(terraform -chdir=infrastructure/terraform output -raw blue_target_group_arn)

GREEN_TARGET_GROUP_ARN=$(terraform -chdir=infrastructure/terraform output -raw green_target_group_arn)

export ALB_LISTENER_ARN
export BLUE_TARGET_GROUP_ARN
export GREEN_TARGET_GROUP_ARN

echo "Terraform outputs loaded"