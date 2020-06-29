
import { sendTo } from '../shared/utils.mjs'

export const broadcastTo = wss => msg =>
  wss.clients.forEach(ws => sendTo(ws)(msg))

export const getManagedStream = stream => new Promise((
  resolve,
  reject
) => stream
  .once('readable', () => resolve(stream))
  .once('error', e => reject(e))
)

export const isValidMessage = msg => msg.type != null
