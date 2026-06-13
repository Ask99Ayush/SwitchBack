output "alb_arn" {
  description = "ARN of the Application Load Balancer"

  value = aws_lb.main.arn
}

output "alb_dns_name" {
  description = "Public DNS name of the Application Load Balancer"

  value = aws_lb.main.dns_name
}

output "listener_arn" {
  description = "HTTP Listener ARN used for Blue-Green traffic switching"

  value = aws_lb_listener.http.arn
}

output "blue_target_group_arn" {
  description = "Target Group ARN for the Blue ECS service"

  value = aws_lb_target_group.blue.arn
}

output "green_target_group_arn" {
  description = "Target Group ARN for the Green ECS service"

  value = aws_lb_target_group.green.arn
}