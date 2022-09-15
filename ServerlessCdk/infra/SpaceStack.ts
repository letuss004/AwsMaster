import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs'
import {Function as LambdaFunction} from 'aws-cdk-lib/aws-lambda';
import {Code, Runtime} from "aws-cdk-lib/aws-lambda";
import {join} from 'path';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway';
import {GenericTable} from "./GenericTable";
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs'

export class SpaceStack extends Stack {
  private api = new RestApi(this, 'SpaceApi')
  private spaceTable = new GenericTable('thisIsSpaceTableName', 'thisIsSpaceTableID', this);

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const hellolambda = new LambdaFunction(this, 'helloLambda', {
      handler: "hello.main",
      runtime: Runtime.NODEJS_16_X,
      code: Code.fromAsset(join(__dirname, '..', 'services', 'hello'))
    })

    const helloLambdaNodejs = new NodejsFunction(this, 'thisIsNodejsLambdatFunctionID', {
      entry: join(__dirname, '..', 'services', 'node_lambda', 'hello.ts'),
      handler: 'handler',
    })

    // Hello api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(hellolambda);
    const helloLambdaResourse = this.api.root.addResource('hello');
    helloLambdaResourse.addMethod('GET', helloLambdaIntegration);
  }


}
