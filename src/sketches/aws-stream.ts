import fs, { ReadStream } from 'fs'
import { S3Client, MultipartUpload } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

type StreamingData = {
    upload: Upload
    stream: ReadStream
}

const env = {
    key: process.env.KEY,
    shiesh: process.env.SHIESH,
    s3BucketName: process.env.S3_BUCKET_NAME,
    awsRegion: process.env.AWS_REGION,
}

const makeUploadStream = (
    cli: S3Client,
    filePath: string,
    filename: string
): StreamingData => {
    const fileStream = fs.createReadStream(filePath, { encoding: 'utf-8' })

    return {
        upload: new Upload({
            client: cli,
            params: {
                Bucket: env.s3BucketName,
                Key: filename,
                Body: fileStream,
                ContentType: 'text/plain',
            },
        }),
        stream: fileStream,
    } as StreamingData
}

async function main() {
    const arr = [] as StreamingData[]

    const cli = new S3Client({})
    for (let i = 0; i < 10; i++) {
        const fileDestiny = `example/bigfile-${i}.csv`
        const streamData = makeUploadStream(
            cli,
            `example/bigfile.csv`,
            fileDestiny
        )

        streamData.upload.on('httpUploadProgress', (p) => {
            if (p.total && p.loaded) {
                console.log(
                    `upload progress on file ${fileDestiny}: ${Math.round((p.loaded / p.total) * 100)}%`
                )
            } else if (p.loaded) {
                console.log(`upload progress ${fileDestiny}: ${p.loaded}`)
            }
        })
        arr.push(streamData)
    }

    const promises = arr.map((sd) => sd.upload)
    try {
        console.log('waiting for upload')
        const responses = await Promise.allSettled(
            promises.map((p) => p.done())
        )
        responses.map((res) => {
            if (res.status === 'fulfilled') {
                console.log(
                    `upload done for file ${res.value?.Key ?? 'NO_FILENAME'}`
                )
            }
        })
    } catch (e) {
        console.log(`upload failed: ${e}`)
    } finally {
        arr.forEach((sd) => {
            sd.stream.close()
        })
        console.log('finished indeed!')
    }
}

main()
