output "cluster_name" {
  description = "Name of the ECS Cluster"

  value = aws_ecs_cluster.main.name
}

output "cluster_id" {
  description = "ARN/ID of the ECS Cluster"

  value = aws_ecs_cluster.main.id
}

output "blue_service_name" {
  description = "Blue ECS Service Name"

  value = aws_ecs_service.blue.name
}

output "green_service_name" {
  description = "Green ECS Service Name"

  value = aws_ecs_service.green.name
}