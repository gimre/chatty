
import WebSocket from 'ws'

import { broadcastTo, deserialize, sendTo } from './utils.mjs'

const isValidMessage = msg => Boolean(msg.type)

const participantSockets = new WeakMap()

export const makeWsServer = (
  messageHandlers = {}
) => {
  const wss = new WebSocket.Server({ noServer: true })
  const broadcast = broadcastTo(wss)

  const dispatch = message => {
    const { type, payload } = message
    if (type in messageHandlers) {
      return messageHandlers[type](payload)
    }
  }

  wss.on('connection', ws => {
    const send = sendTo(ws)

    const handleMessage = message => {
      const deserialized = deserialize(message)
      if (!isValidMessage(deserialized)) {
        return
      }

      const from = deserialized.payload?.from
      if (from) {
        participantSockets.set(ws, from)
      }

      broadcast(deserialized)

      const reply = dispatch(deserialized)
      if (reply) {
        send(reply)
      }
    }

    const handleClose = () => {
      const from = participantSockets.get(ws)
      handleMessage({ type: CLOSE, payload: { from } })
    }

    ws.on('message', handleMessage)
      .on('close', handleClose)
  })

  return wss
}
