import {handler} from "../services/node_lambda/hello";
// import {handler} from "../services/DynamoDBTables/SpacesTable/Create";
import {APIGatewayProxyEvent} from "aws-lambda";

const event: APIGatewayProxyEvent = {
  body: "",
  headers: undefined,
  httpMethod: "",
  isBase64Encoded: false,
  multiValueHeaders: undefined,
  multiValueQueryStringParameters: undefined,
  path: "",
  pathParameters: undefined, 
  requestContext: undefined,
  resource: "",
  stageVariables: undefined,
  queryStringParameters: {
    spaceId: '00cadca8-e00d-47f5-b0b0-fe47648ae6bb'
  }
}

const event2: APIGatewayProxyEvent = {
    body:{
        name: 'someName'
    }
} as any;

const result = handler({} as any, {} as any).then((apiResult) => {
    console.log(apiResult)
  const items = apiResult.body;
  console.log('End debug!!!')
});
