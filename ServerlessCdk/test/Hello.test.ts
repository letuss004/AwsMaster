// import {handler} from "../services/node_lambda/hello";
import {handler} from "../services/DynamoDBTables/SpacesTable/Read";
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

const result = handler(event, {} as any).then((apiResult) => {
  const items = JSON.parse(apiResult.body);
  console.log(123)
});
