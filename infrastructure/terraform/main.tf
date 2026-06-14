module "vpc" {

  source = "../modules/vpc"

  project_name = "cloud-native-cicd"

  vpc_cidr = "10.0.0.0/16"

  public_subnet_a_cidr = "10.0.1.0/24"
  public_subnet_b_cidr = "10.0.2.0/24"

  private_subnet_a_cidr = "10.0.11.0/24"
  private_subnet_b_cidr = "10.0.12.0/24"

  az_a = "ap-south-1a"
  az_b = "ap-south-1b"
}

module "security_groups" {

  source = "../modules/security-groups"

  project_name = "cloud-native-cicd"

  vpc_id = module.vpc.vpc_id
}

module "iam" {

  source = "../modules/iam"

  project_name = "cloud-native-cicd"
}

module "ecr" {

  source = "../modules/ecr"

  project_name = "cloud-native-cicd"
}

module "alb" {

  source = "../modules/alb"

  project_name = "cloud-native-cicd"

  vpc_id = module.vpc.vpc_id

  public_subnets = module.vpc.public_subnets

  alb_sg_id = module.security_groups.alb_sg_id
}

module "ecs" {

  source = "../modules/ecs"

  depends_on = [
    module.alb
  ]

  project_name = "cloud-native-cicd"

  private_subnets = module.vpc.private_subnets

  ecs_sg_id = module.security_groups.ecs_sg_id

  ecs_execution_role_arn = module.iam.ecs_execution_role_arn

  ecr_repository_url = module.ecr.repository_url

  aws_region = var.aws_region

  blue_target_group_arn = module.alb.blue_target_group_arn

  green_target_group_arn = module.alb.green_target_group_arn
}

module "cloudfront" {

  source = "../modules/cloudfront"

  project_name = "cloud-native-cicd"

  alb_dns_name = module.alb.alb_dns_name
}

module "cloudwatch" {

  source = "../modules/cloudwatch"

  project_name = "cloud-native-cicd"

  ecs_cluster_name = module.ecs.cluster_name

  blue_service_name = module.ecs.blue_service_name

  green_service_name = module.ecs.green_service_name

  alb_arn_suffix = module.alb.alb_arn_suffix

  cloudfront_distribution_id = module.cloudfront.distribution_id

  aws_region = var.aws_region
}

module "sns" {

  source = "../modules/sns"

  project_name = "cloud-native-cicd"

  notification_email = var.notification_email

  ecs_cluster_name = module.ecs.cluster_name

  blue_service_name = module.ecs.blue_service_name

  green_service_name = module.ecs.green_service_name

  alb_arn_suffix = module.alb.alb_arn_suffix

  cloudfront_distribution_id = module.cloudfront.distribution_id
}

module "autoscaling" {

  source = "../modules/autoscaling"

  project_name = "cloud-native-cicd"

  ecs_cluster_name = module.ecs.cluster_name

  blue_service_name = module.ecs.blue_service_name

  green_service_name = module.ecs.green_service_name
}

