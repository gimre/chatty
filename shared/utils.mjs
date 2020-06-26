
export const deserialize = json => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return {}
  }
}

export const sendTo = ws => msg => ws.send(JSON.stringify(msg))
