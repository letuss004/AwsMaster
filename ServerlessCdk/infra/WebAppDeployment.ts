import {CfnOutput, Stack} from "aws-cdk-lib";
import {Bucket} from "aws-cdk-lib/aws-s3";
import {BucketDeployment, Source} from "aws-cdk-lib/aws-s3-deployment";
import {join} from "path";
import {CloudFrontWebDistribution} from "aws-cdk-lib/aws-cloudfront";

export class WebAppDeployment {

  private stack: Stack;
  private bucketSuffix: string;
  private deploymentBucket: Bucket

  constructor(stack: Stack, bucketSuffix: string) {
    this.stack = stack;
    this.bucketSuffix = bucketSuffix;
    this.initialize();
  }

  private initialize() {
    const bucketName = 'space-app-web' + this.bucketSuffix;
    this.deploymentBucket = new Bucket(
      this.stack,
      'space-app-web-id', {
        bucketName: bucketName,
        publicReadAccess: true,
        websiteIndexDocument: 'index.html'
      }
    );
    new BucketDeployment(
      this.stack,
      'space-app-web-id-deployment', {
        destinationBucket: this.deploymentBucket,
        sources: [
          Source.asset(
            join(__dirname, '..', 'space-finder-frontend-main', 'build')
          )
        ]
      }
    );
    new CfnOutput(this.stack, 'spaceFinderWebAppS3Url', {
      value: this.deploymentBucket.bucketWebsiteUrl
    });

    const cloudFront = new CloudFrontWebDistribution(
      this.stack,
      'space-app-web-destribution', {
        originConfigs: [
          {
            behaviors: [
              {
                isDefaultBehavior: true
              }
            ],
            s3OriginSource: {
              s3BucketSource: this.deploymentBucket
            }
          }
        ]
      }
    );
    new CfnOutput(this.stack, 'spaceFinderWebAppCloudFrontUrl', {
      value: cloudFront.distributionDomainName
    })

  }

}
