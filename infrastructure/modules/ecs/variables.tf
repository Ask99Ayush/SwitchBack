variable "project_name" {
  type = string
}

variable "private_subnets" {
  type = list(string)
}

variable "ecs_sg_id" {
  type = string
}

variable "ecs_execution_role_arn" {
  type = string
}

variable "ecr_repository_url" {
  type = string
}

variable "aws_region" {
  type = string
}

variable "blue_target_group_arn" {
  type = string
}

variable "green_target_group_arn" {
  type = string
}