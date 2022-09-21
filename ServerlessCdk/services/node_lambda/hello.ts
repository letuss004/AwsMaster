import {S3} from 'aws-sdk';

const s3Client = new S3();

async function handler(event: any, context: any) {
  console.log('hander function -> logggg || event', event)
  const buckets = await s3Client.listBuckets().promise();

  return {
    statusCode: 200,
    body: JSON.stringify(event)
  }
}

export {handler}
