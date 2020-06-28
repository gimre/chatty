
import { uuid } from 'uuidv4'

import types from '../../shared/types.mjs'
import { getName } from '../utils'

const defaultState = {
  joined: false,
  history: [],
  name: getName(),
  participants: {},
  uuid: uuid()
}

const reducer = (state = defaultState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.JOIN: {
      const { from, name } = payload
      return {
        ...state,
        participants: {
          ...state.participants,
          [from]: name
        }
      }
    }

    case types.LEAVE: {
      const { from } = payload
      const { [from]: leaving, ...remaining } = state.participants
      return {
        ...state,
        participants: remaining
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
