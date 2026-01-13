import express, { Express } from 'express'
import { uploadHandler } from './handlers'
import multer from 'multer'

const storage = {
    _handleFile(req, file, cb) {
        cb(null, {})
    },
}

export function prepareServer(): Express {
    const app = express()
    const upload = multer({ dest: 'upload' })

    app.use(express.json())

    app.post('/upload', upload.single('file-upload'), uploadHandler)

    return app
}
