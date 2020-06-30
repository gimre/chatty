
import types from '../../shared/types.mjs'

const history = []
const participants = Object.create(null)

export const handleMessage = {
  [types.DELETE]: payload => {
    const { from, id } = payload
    const found = history.findIndex(m => m.id === id && m.from === from)

    if (found != null) {
      history.splice(found, 1)
    }
  },

  [types.EDIT]: payload => {
    const { from, id, message } = payload
    const found = history.find(m => m.id === id && m.from === from)

    if (found != null) {
      Object.assign(found, {
         message,
         edited: true
      })
    }
  },

  [types.JOIN]: payload => {
    const { from, name, key } = payload
    participants[from] = {
      key,
      name,
      active: true
    }

    return {
      type: types.ROOM,
      payload: {
        history: history.filter(m => m.to === from),
        participants
      }
    }
  },

  [types.LEAVE]: payload => {
    const { from } = payload
    const participant = participants[from]
    if (participant) {
      participant.active = false
    }
  },

  [types.MESSAGE]: payload => {
    history.push(payload)
  },
}
