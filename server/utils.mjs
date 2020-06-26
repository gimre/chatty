
export const broadcastTo = wss => msg =>
  wss.clients.forEach(ws => sendTo(ws)(msg))

export const deserialize = json => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return {}
  }
}

export const getManagedStream = stream => new Promise((
  resolve,
  reject
) => stream
  .once('readable', () => resolve(stream))
  .once('error', e => reject(e))
)

export const sendTo = ws => msg => ws.send(JSON.stringify(msg))
