import express, { Express, Request, Response, NextFunction } from 'express'
import { uploadHandler } from './handlers'
import busboy from 'busboy'
import Stream from 'stream'

type RequestChunk = {
    fileStream?: Stream.Readable
} & Request

export function prepareServer(): Express {
    const app = express()

    app.use(express.json())

    app.post('/upload', uploadHandler)

    return app
}
