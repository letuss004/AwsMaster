import {v4} from 'uuid'
import {S3} from 'aws-sdk';

const s3Client = new S3();

async function handler(event: any, context: any) {
  console.log('hander function -> logggg')
  return {
    statusCode: 200,
    body: 'Hello from lambda!' + v4()
  }
}

export {handler}
