resource "aws_sns_topic" "alerts" {

  name = "${var.project_name}-alerts"
}

resource "aws_sns_topic_subscription" "email" {

  topic_arn = aws_sns_topic.alerts.arn

  protocol = "email"

  endpoint = var.notification_email
}


resource "aws_cloudwatch_metric_alarm" "ecs_cpu_high" {

  alarm_name = "${var.project_name}-ecs-high-cpu"

  alarm_description = "Blue ECS service CPU above 70%"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 2

  metric_name = "CPUUtilization"

  namespace = "AWS/ECS"

  period = 300

  statistic = "Average"

  threshold = 70

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.blue_service_name
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}


resource "aws_cloudwatch_metric_alarm" "ecs_memory_high" {

  alarm_name = "${var.project_name}-ecs-high-memory"

  alarm_description = "Blue ECS service memory above 70%"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 2

  metric_name = "MemoryUtilization"

  namespace = "AWS/ECS"

  period = 300

  statistic = "Average"

  threshold = 70

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.blue_service_name
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}


resource "aws_cloudwatch_metric_alarm" "alb_5xx" {

  alarm_name = "${var.project_name}-alb-5xx"

  alarm_description = "ALB returning 5XX errors"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 1

  metric_name = "HTTPCode_Target_5XX_Count"

  namespace = "AWS/ApplicationELB"

  period = 300

  statistic = "Sum"

  threshold = 1

  dimensions = {
    LoadBalancer = var.alb_arn_suffix
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}


resource "aws_cloudwatch_metric_alarm" "alb_latency" {

  alarm_name = "${var.project_name}-alb-latency"

  alarm_description = "ALB response time above 1 second"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 2

  metric_name = "TargetResponseTime"

  namespace = "AWS/ApplicationELB"

  period = 300

  statistic = "Average"

  threshold = 1

  dimensions = {
    LoadBalancer = var.alb_arn_suffix
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}


resource "aws_cloudwatch_metric_alarm" "blue_service_tasks" {

  alarm_name = "${var.project_name}-blue-live-tasks"

  alarm_description = "Blue service task count dropped"

  comparison_operator = "LessThanThreshold"

  evaluation_periods = 1

  metric_name = "LiveTaskCount"

  namespace = "AWS/ECS"

  period = 300

  statistic = "Average"

  threshold = 1

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.blue_service_name
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}


resource "aws_cloudwatch_metric_alarm" "green_service_tasks" {

  alarm_name = "${var.project_name}-green-live-tasks"

  alarm_description = "Green service task count dropped"

  comparison_operator = "LessThanThreshold"

  evaluation_periods = 1

  metric_name = "LiveTaskCount"

  namespace = "AWS/ECS"

  period = 300

  statistic = "Average"

  threshold = 1

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.green_service_name
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}


resource "aws_cloudwatch_metric_alarm" "cloudfront_4xx" {

  alarm_name = "${var.project_name}-cloudfront-4xx"

  alarm_description = "CloudFront 4XX error rate above 5%"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 2

  metric_name = "4xxErrorRate"

  namespace = "AWS/CloudFront"

  period = 300

  statistic = "Average"

  threshold = 5

  dimensions = {
    DistributionId = var.cloudfront_distribution_id
    Region         = "Global"
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}


resource "aws_cloudwatch_metric_alarm" "cloudfront_5xx" {

  alarm_name = "${var.project_name}-cloudfront-5xx"

  alarm_description = "CloudFront 5XX error rate above 1%"

  comparison_operator = "GreaterThanThreshold"

  evaluation_periods = 1

  metric_name = "5xxErrorRate"

  namespace = "AWS/CloudFront"

  period = 300

  statistic = "Average"

  threshold = 1

  dimensions = {
    DistributionId = var.cloudfront_distribution_id
    Region         = "Global"
  }

  alarm_actions = [
    aws_sns_topic.alerts.arn
  ]

  ok_actions = [
    aws_sns_topic.alerts.arn
  ]
}