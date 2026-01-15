import { prepareServer } from './server'
import { exit } from 'process'

export const env = {
    key: process.env.KEY,
    shiesh: process.env.SHIESH,
    s3BucketName: process.env.S3_BUCKET_NAME ?? 'NO_BUCKET',
    awsRegion: process.env.AWS_REGION,
}

function main() {
    const port = 3333
    const app = prepareServer()

    app.listen(port, (e) => {
        if (e) {
            console.log('ERROR STARTING SERVER', e)
            exit(1)
        }
        console.log(`Server running in port ${port}`)
    })
}

main()
