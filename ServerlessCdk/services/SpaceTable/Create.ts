import {DynamoDB} from "aws-sdk";
import {APIGatewayProxyEvent, APIGatewayProxyResult, Context} from "aws-lambda";
import {v4} from "uuid";

const dbClient = new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent, context: Context):
  Promise<APIGatewayProxyResult> {

  const result: APIGatewayProxyResult = {
    statusCode: 200,
    body: 'Hello from DYnamoDb'
  }
  const body = typeof event.body == 'object'? event.body: JSON.parse(event.body);
  const item = {
    thisIsSpaceTableID: v4(),
    ...body
  }

  try {
    const res = await dbClient.put({
      TableName: 'thisIsSpaceTableName',
      Item: item,
    }).promise()
    console.log(res)
  } catch (error) {
    console.log(error)
    // @ts-ignore
    result.body = error?.message
  }
  result.body = JSON.stringify(`Created item with id: ${item.spaceId}`)

  return result
}
  
export {handler}
