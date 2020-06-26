
import fs from 'fs'
import http from 'http'
import mime from 'mime-types'
import url, { fileURLToPath } from 'url'

import { INDEX_FILE, SERVER_ROOT } from './constants.mjs'
import { getManagedStream } from './utils.mjs'

const absoluteServerRoot = fileURLToPath([
  import.meta.url, '../', SERVER_ROOT
].reduce(url.resolve))

export const makeHttpServer = wss => {
  const handleRequest = async (req, res) => {
    const { pathname } = url.parse(req.url)
    const path = pathname === '/'
      ? pathname + INDEX_FILE
      : pathname

    const pathOnDisk = absoluteServerRoot + path
    try {
      const stream = await getManagedStream(fs.createReadStream(pathOnDisk))
      const mimeType = mime.lookup(pathOnDisk) || 'text/plain'

      stream.pipe(res)

      res.setHeader('content-type', mime.contentType(mimeType))
      res.writeHead(200)
    } catch(e) {
      res.statusCode = 404
      res.end()
    }
  }

  const httpServer = http.createServer(handleRequest)
  httpServer.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, ws => {
      wss.emit('connection', ws, req)
    })
  })

  return httpServer
}
