import {CfnOutput, Fn, Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs'
import {join} from 'path';
import {AuthorizationType, LambdaIntegration, MethodOptions, RestApi} from 'aws-cdk-lib/aws-apigateway';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'
import {PolicyStatement} from 'aws-cdk-lib/aws-iam';
import {GenericLambdasTable} from "./GenericLambdasTable";
import {Authorizer} from "./Auth/Authorizer";
import {Bucket, HttpMethods} from "aws-cdk-lib/aws-s3";

export class SpaceStack extends Stack {
  private api = new RestApi(this, 'SpaceApi')
  private authorizer: Authorizer;
  private suffix: string;
  private spacesPhotosBucket: Bucket;
  /**
   * */
  private spacesTable = new GenericLambdasTable(this, {
    tableName: 'SpacesTable',
    primaryKey: 'spaceId',
    createLambdaPath: 'Create',
    readLambdaPath: 'Read',
    secondaryIndexes: ['location'],
    updateLambdaPath: 'Update',
    deleteLambdaPath: 'Delete',
  });

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this.initializeSuffix();
    this.initializeSpacesPhotosBucket();
    this.authorizer = new Authorizer(
      this,
      this.api,
      this.spacesPhotosBucket.bucketArn + '/*'
    );
    const optionsWithAuthorizer: MethodOptions = {
      authorizationType: AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: this.authorizer.authorizer.authorizerId
      }
    }

    // const hellolambda = new LambdaFunction(this, 'helloLambda', {
    //   handler: "hello.main",
    //   runtime: Runtime.NODEJS_16_X,
    //   code: Code.fromAsset(join(__dirname, '..', 'services', 'hello'))
    // })

    const helloLambdaNodejs = new NodejsFunction(this, 'thisIsNodejsLambdatFunctionID', {
      entry: join(__dirname, '..', 'services', 'node_lambda', 'hello.ts'),
      handler: 'handler',
    })

    const s3ListPolicy = new PolicyStatement();
    s3ListPolicy.addActions('s3:ListAllMyBuckets');
    s3ListPolicy.addResources('*')
    helloLambdaNodejs.addToRolePolicy(s3ListPolicy);

    // Hello api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodejs);
    const helloLambdaResourse = this.api.root.addResource('hello');
    helloLambdaResourse.addMethod('GET', helloLambdaIntegration, optionsWithAuthorizer);

    //Spaces API integrations:
    const spaceResource = this.api.root.addResource('spaces');
    spaceResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
    spaceResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
    spaceResource.addMethod('PUT', this.spacesTable.updateLambdaIntegration);
    spaceResource.addMethod('DELETE', this.spacesTable.deleteLambdaIntegration);
  }

  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
    this.suffix = Fn.select(4, Fn.split('-', shortStackId));
  }

  private initializeSpacesPhotosBucket() {
    this.spacesPhotosBucket = new Bucket(this, 'spaces-photos', {
      bucketName: 'spaces-photos-' + this.suffix,
      cors: [{
        allowedMethods: [
          HttpMethods.HEAD,
          HttpMethods.GET,
          HttpMethods.PUT
        ],
        allowedOrigins: ['*'],
        allowedHeaders: ['*']
      }]
    });
    new CfnOutput(this, 'spaces-photos-bucket-name', {
      value: this.spacesPhotosBucket.bucketName
    })
  }
}
