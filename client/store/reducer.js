
import { uuid } from 'uuidv4'

import types from '../../shared/types.mjs'
import { RoomIdentity } from '../constants'
import localTypes from '../types'
import { getName, getUid } from '../utils'

const defaultState = {
  editing: null,
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

    case types.EDIT: {
      const { id, message } = payload
      return {
        ...state,
        history: state.history.map(m => m.id === id
          ? { ...m, message, edited: true }
          : m
        )
      }
    }

    case localTypes.EDITING:
      return {
        ...state,
        editing: payload
      }

    case types.JOIN: {
      const { from, name, key } = payload
      const history = state.history.concat({
        id: uuid(),
        from: RoomIdentity,
        message: `${name} joined.`,
        when: new Date().toISOString()
      })
      return {
        ...state,
        history,
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
      const history = state.history.concat({
        id: uuid(),
        from: RoomIdentity,
        message: `${participants[from]?.name} left.`,
        when: new Date().toISOString()
      })

      return {
        ...state,
        history,
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
        history: state.history.concat(history),
        participants
      }
    }
    default:
      return state
  }
}

export default reducer
