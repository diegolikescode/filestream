import { Request, Response } from 'express'
import { WriteStream } from 'fs'
import multer from 'multer'
import { pipeline, Readable } from 'stream'
import { promisify } from 'util'
import fs from 'fs'

export function uploadHandler(req: Request, res: Response) {
    promisify(pipeline)
    console.log('got request', req.file)

    if (!req.file) {
        return res
            .json({ message: 'problems with the data stream' })
            .status(500)
    }

    // const reader = Readable.from(req.file.buffer)
    // const writer = fs.createWriteStream('./upload.csv')
    //
    // await pipeline(reader, writer)

    res.json({ message: 'all good' }).status(200)
}
