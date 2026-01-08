import http from 'http'

type BadReq = {
    status: number
    message: string
}

function writeBadReq(res: http.ServerResponse, badreq: BadReq) {
    res.writeHead(badreq.status, { 'content-type': 'text/plain' })
    res.write(badreq.message)

    res.end()
}

function validateRequest(req: http.IncomingMessage): BadReq | undefined {
    if (typeof req.method !== 'string' || req.method !== 'POST') {
        return { status: 400, message: 'Bad Request!' } as BadReq
    }

    if (req.url !== '/upload') {
        return {
            status: 404,
            message: 'Resource not found! ' + req.url,
        } as BadReq
    }
}

function listening(req: http.IncomingMessage, res: http.ServerResponse) {
    const badreq = validateRequest(req)
    if (badreq) {
        writeBadReq(res, badreq)
        return
    }
    res.writeHead(200, { 'content-type': 'text/plain' })
    res.write(req.url)

    res.end()
}

function main() {
    const port = 3333

    const server = http.createServer(listening)
    server.listen(port, 'localhost', () => {
        console.log(`server running on port ${port}`)
    })
}

main()
