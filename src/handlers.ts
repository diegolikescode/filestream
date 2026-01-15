import { Request, Response } from 'express'
import { WriteStream } from 'fs'
import fs from 'fs'
import busboy from 'busboy'
import { pipeline } from 'node:stream/promises'
import { AwsS3Wrapper } from './aws-streamer'
import { Upload } from '@aws-sdk/lib-storage'
import { Duplex, Readable, Writable } from 'node:stream'
import { CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3'

export function uploadHandler(req: Request, res: Response) {
    const bb = busboy({ headers: req.headers })
    const s3Wrapper = new AwsS3Wrapper()

    let uploadPromise: Promise<CompleteMultipartUploadCommandOutput> | null =
        null

    bb.on('file', (name, file, info) => {
        const uploader = s3Wrapper.newUpload(name, file)

        uploader.on('httpUploadProgress', (progress) => {
            if (progress?.loaded && progress?.total) {
                console.log(
                    `${Math.round((progress.loaded / progress.total) * 100)}%`
                )
            }
        })

        uploadPromise = uploader.done()
    })

    bb.on('error', (err) => {
        console.error('[BB ERROR]', err)
        res.status(500).end()
    })

    bb.on('finish', async () => {
        try {
            if (uploadPromise) {
                await uploadPromise
            }
            res.status(200).json({ ok: true })
        } catch (err) {
            console.error('[UPLOAD ERROR]', err)
            res.status(500).end()
        }
    })

    req.pipe(bb)
}
