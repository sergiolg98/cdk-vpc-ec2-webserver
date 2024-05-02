# CDK Project: AWS EC2 and VPC

This is a simple CDK project to build deploy an EC2 instance with VPC. It covers:
- VPC, Subnets and other VPC components.
- AWS Security Group.
- EC2 instance with User Data.
- EC2 access by SSH (TCP port 22).

## Considerations

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Cloud Architecture

![Architecture](https://i.ibb.co/rm0MgwS/ec2.png)