
import { createStore } from 'redux'

import types from '../shared/types.mjs'

const defaultState = {
  joined: false,
  history: [],
  participants: {}
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

export default createStore(reducer)
