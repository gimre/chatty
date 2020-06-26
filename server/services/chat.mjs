
const history = []
const participants = Object.create(null)

export const handleMessage = {
  MESSAGE: payload => {
    const { from, message } = payload
    history.push({ from, message, when: new Date().toISOString() })
  },

  JOIN: payload => {
    const { from, name } = payload
    participants[from] = name

    return {
      type: 'ROOM',
      payload: {
        history,
        participants
      }
    }
  }
}
