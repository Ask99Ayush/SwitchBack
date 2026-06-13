resource "aws_cloudwatch_log_group" "ecs" {

  name = "/ecs/${var.project_name}"

  retention_in_days = 30
}

resource "aws_ecs_cluster" "main" {

  name = "${var.project_name}-cluster"
}

resource "aws_ecs_task_definition" "app" {

  family = "${var.project_name}-task"

  requires_compatibilities = [
    "FARGATE"
  ]

  network_mode = "awsvpc"

  cpu    = 256
  memory = 512

  execution_role_arn = var.ecs_execution_role_arn

  container_definitions = jsonencode([
    {
      name      = "react-app"
      image     = "${var.ecr_repository_url}:v1"
      essential = true

      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"

        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs.name
          awslogs-region        = var.aws_region
          awslogs-stream-prefix = "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "blue" {

  name = "${var.project_name}-blue"

  cluster = aws_ecs_cluster.main.id

  task_definition = aws_ecs_task_definition.app.arn

  desired_count = 1

  launch_type = "FARGATE"

  network_configuration {

    subnets = var.private_subnets

    security_groups = [
      var.ecs_sg_id
    ]

    assign_public_ip = false
  }

  load_balancer {

    target_group_arn = var.blue_target_group_arn

    container_name = "react-app"

    container_port = 80
  }

  depends_on = [
    aws_ecs_task_definition.app
  ]
}

resource "aws_ecs_service" "green" {

  name = "${var.project_name}-green"

  cluster = aws_ecs_cluster.main.id

  task_definition = aws_ecs_task_definition.app.arn

  desired_count = 0

  launch_type = "FARGATE"

  network_configuration {

    subnets = var.private_subnets

    security_groups = [
      var.ecs_sg_id
    ]

    assign_public_ip = false
  }

  load_balancer {

    target_group_arn = var.green_target_group_arn

    container_name = "react-app"

    container_port = 80
  }

  depends_on = [
    aws_ecs_task_definition.app
  ]
}