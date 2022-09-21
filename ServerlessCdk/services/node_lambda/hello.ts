import {v4} from 'uuid'
import {S3} from 'aws-sdk';

const s3Client = new S3();

async function handler(event: any, context: any) {
  console.log('hander function -> logggg || event', event)
  const buckets = await s3Client.listBuckets().promise();

  const result = {
    statusCode: 200,
    body: 'Hello from lambda!' + v4() + '+++' + JSON.stringify(buckets.Buckets)
  };

  return {
    statusCode: 200,
    body: 'Hello from lambda!' + v4() + '+++' + JSON.stringify(buckets.Buckets)
  }
}

export {handler}
