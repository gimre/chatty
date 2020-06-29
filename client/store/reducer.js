
import types from '../../shared/types.mjs'
import { getName, getUid } from '../utils'

const defaultState = {
  joined: false,
  history: [],
  name: getName(),
  participants: {},
  uuid: getUid()
}

const reducer = (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.DELETE: {
      const { id } = payload
      return {
        ...state,
        history: state.history.filter(m => m.id !== id)
      }
    }

    case types.JOIN: {
      const { from, name, key } = payload
      return {
        ...state,
        participants: {
          ...state.participants,
          [from]: {
            key,
            name,
            active: true
          }
        }
      }
    }

    case types.LEAVE: {
      const { from } = payload
      const { participants } = state
      return {
        ...state,
        participants: {
          ...participants,
          [from]: {
            ...participants[from],
            active: false
          }
        }
      }
    }

    case types.MESSAGE: {
      const history = state.history.concat(payload)
      return {
        ...state,
        history
      }
    }

    case types.ROOM: {
      const { history, participants } = payload
      return {
        ...state,
        history,
        participants
      }
    }
    default:
      return state
  }
}

export default reducer
