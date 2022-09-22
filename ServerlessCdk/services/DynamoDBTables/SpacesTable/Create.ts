import {DynamoDB} from 'aws-sdk';
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from 'aws-lambda';
import {v4} from 'uuid'
import {MissingFieldError, validateAsSpaceEntry} from "../../Shared/InputValidater";
import {addCorsHeader} from "../../../utils/Utils";


const TABLE_NAME = process.env.TABLE_NAME
const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {

  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from DYnamoDb'
  }
  addCorsHeader(result)
  try {
    const item = typeof event.body == 'object' ? event.body : JSON.parse(event.body);
    item.spaceId = v4();
    validateAsSpaceEntry(item);
    await dbClient.put({
      TableName: TABLE_NAME!,
      Item: item
    }).promise()
    result.body = JSON.stringify({
      id: item.spaceId
    })
  } catch (error) {
    if (error instanceof MissingFieldError) {
      result.statusCode = 403;
    } else {
      result.statusCode = 500;
    }
    result.body = error.message;
  }
  return result
}

export {handler}
