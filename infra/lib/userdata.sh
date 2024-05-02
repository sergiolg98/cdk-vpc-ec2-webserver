#!/bin/bash

sudo su
yum update -y
yum install -y httpd

systemctl start httpd
systemctl enable httpd

echo "<h1>Hello from EC2 Instance - CDK</h1>" > /var/www/html/index.html

