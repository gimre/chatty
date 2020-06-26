
import types from '../../shared/types.mjs'

const history = []
const participants = Object.create(null)

export const handleMessage = {
  [types.JOIN]: payload => {
    const { from, name } = payload
    participants[from] = name

    return {
      type: types.ROOM,
      payload: {
        history,
        participants
      }
    }
  },

  [types.LEAVE]: payload => {
    const { from } = payload
    delete participants[from]
  },

  [types.MESSAGE]: payload => {
    const { from, message } = payload
    history.push({ from, message, when: new Date().toISOString() })
  },
}
