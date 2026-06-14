resource "aws_lb" "main" {

  name = "${var.project_name}-alb"

  load_balancer_type = "application"

  internal = false

  security_groups = [
    var.alb_sg_id
  ]

  subnets = var.public_subnets
}

resource "aws_lb_target_group" "blue" {

  name = "${var.project_name}-blue"

  port = 80

  protocol = "HTTP"

  target_type = "ip"

  vpc_id = var.vpc_id

  health_check {

    path = "/"

    protocol = "HTTP"

    matcher = "200"

    healthy_threshold = 2

    unhealthy_threshold = 2

    interval = 30
  }
}

resource "aws_lb_target_group" "green" {

  name = "${var.project_name}-green"

  port = 80

  protocol = "HTTP"

  target_type = "ip"

  vpc_id = var.vpc_id

  health_check {

    path = "/"

    protocol = "HTTP"

    matcher = "200"

    healthy_threshold = 2

    unhealthy_threshold = 2

    interval = 30
  }
}

resource "aws_lb_listener" "http" {

  load_balancer_arn = aws_lb.main.arn

  port = 80

  protocol = "HTTP"

  default_action {

    type = "forward"

    forward {

      target_group {

        arn = aws_lb_target_group.blue.arn

        weight = 100
      }

      target_group {

        arn = aws_lb_target_group.green.arn

        weight = 0
      }
    }
  }

  lifecycle {
    ignore_changes = [
      default_action
    ]
  }
}