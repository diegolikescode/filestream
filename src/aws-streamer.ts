import { S3Client } from '@aws-sdk/client-s3'
import { BodyDataTypes, Upload } from '@aws-sdk/lib-storage'
import { env } from './index'

export class AwsS3Wrapper {
    client: S3Client
    bucket: string

    constructor() {
        this.client = new S3Client({})
        this.bucket = env.s3BucketName
    }

    newUpload(filename: string, body: any): Upload {
        return new Upload({
            client: this.client,
            params: { Bucket: this.bucket, Key: filename, Body: body },
        })
    }
}
