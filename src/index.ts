import http from 'http'
import { prepareServer } from './server'
import { exit } from 'process'

export const env = {
    key: process.env.KEY,
    shiesh: process.env.SHIESH,
    s3_bucket_name: process.env.S3_BUCKET_NAME,
    aws_region: process.env.AWS_REGION,
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
