import {Stack, StackProps, App} from 'aws-cdk-lib';
import {Construct} from 'constructs'
import {SpaceStack} from "./SpaceStack";

const app = new App();
new SpaceStack(app, 'Space-finder', {
  stackName: 'SpaceFinder'
});

