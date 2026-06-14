output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "public_subnet_a_id" {
  description = "Public Subnet A ID"
  value       = module.vpc.public_subnet_a_id
}

output "public_subnet_b_id" {
  description = "Public Subnet B ID"
  value       = module.vpc.public_subnet_b_id
}

output "private_subnet_a_id" {
  description = "Private Subnet A ID"
  value       = module.vpc.private_subnet_a_id
}

output "private_subnet_b_id" {
  description = "Private Subnet B ID"
  value       = module.vpc.private_subnet_b_id
}

output "alb_sg_id" {
  description = "ALB Security Group ID"
  value       = module.security_groups.alb_sg_id
}

output "ecs_sg_id" {
  description = "ECS Security Group ID"
  value       = module.security_groups.ecs_sg_id
}

output "ecs_execution_role_arn" {
  description = "ECS Execution Role ARN"
  value       = module.iam.ecs_execution_role_arn
}

output "ecr_repository_name" {
  description = "ECR Repository Name"
  value       = module.ecr.repository_name
}

output "ecr_repository_url" {
  description = "ECR Repository URL"
  value       = module.ecr.repository_url
}

output "ecs_cluster_name" {
  description = "ECS Cluster Name"
  value       = module.ecs.cluster_name
}

output "blue_service_name" {
  description = "Blue ECS Service Name"
  value       = module.ecs.blue_service_name
}

output "green_service_name" {
  description = "Green ECS Service Name"
  value       = module.ecs.green_service_name
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS Name"
  value       = module.alb.alb_dns_name
}

output "alb_listener_arn" {
  description = "ALB HTTP Listener ARN"
  value       = module.alb.listener_arn
}

output "blue_target_group_arn" {
  description = "Blue Target Group ARN"
  value       = module.alb.blue_target_group_arn
}

output "green_target_group_arn" {
  description = "Green Target Group ARN"
  value       = module.alb.green_target_group_arn
}

output "dashboard_name" {
  value = module.cloudwatch.dashboard_name
}

output "application_log_group" {
  value = module.cloudwatch.log_group_name
}

output "sns_topic_arn" {
  value = module.sns.sns_topic_arn
}

output "cloudfront_url" {
  value = module.cloudfront.cloudfront_domain_name
}

output "cloudfront_distribution_id" {
  value = module.cloudfront.distribution_id
}