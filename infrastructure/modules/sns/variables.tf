variable "project_name" {
  type = string
}

variable "notification_email" {
  type = string
}

variable "ecs_cluster_name" {
  type = string
}

variable "blue_service_name" {
  type = string
}

variable "green_service_name" {
  type = string
}

variable "alb_arn_suffix" {
  type = string
}

variable "cloudfront_distribution_id" {
  type = string
}