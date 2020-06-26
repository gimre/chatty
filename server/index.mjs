
import ngrok from 'ngrok'

import { HTTP_PORT } from './constants.mjs'
import { makeHttpServer } from './http.mjs'
import { handleMessage } from './services/chat.mjs'
import { makeWsServer } from './ws.mjs'

const wsServer = makeWsServer(handleMessage)

const httpServer = makeHttpServer(wsServer)
httpServer.listen(HTTP_PORT)

ngrok.connect(HTTP_PORT)
  .then(url => {
    console.log('listening at:')
    console.log(`\thttp://127.0.0.1:${ HTTP_PORT }`)
    console.log(`\t${ url }`)
  })
