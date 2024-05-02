import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { readFileSync } from 'fs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const VPC = new ec2.Vpc(this, 'vpcLogicalID', {
      vpcName: 'vpc',
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      natGateways: 0, // Vpc creates 1 by default, chaged to avoid costs
    });

    const securityGroup = new ec2.SecurityGroup(this, 'demoSGLogicalId', {
      vpc: VPC,
      securityGroupName: 'AllowTrafficHTTP',
      allowAllOutbound: true, // allow all traffic for all ports and all protocols 
    });

    // Port 80 Traffic HTTP
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(), 
      ec2.Port.tcp(80),
      'Allow HTTP traffic'
    );

    // Port 22 SSH
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(), 
      ec2.Port.SSH,
      'Allow SSH traffic'
    );

    const keyPair = ec2.KeyPair.fromKeyPairName(this, 'KeyPairLogicalId', 'demo_ec2_cdk'); // To use SSH, use the name of a generated KeyPair EC2
    const ec2Instance = new ec2.Instance(this, 'demoEC2InstanceLogicalId', {
      vpc: VPC,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: securityGroup,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      keyPair: keyPair,
    });
    
    const userData: string = readFileSync('./lib/userdata.sh', 'utf-8');
    ec2Instance.addUserData(userData);

  }
}
