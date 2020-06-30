
import { uuid } from 'uuidv4'

import localTypes from '../types'
import types from '../../shared/types.mjs'

import { getActiveParticipants, getOwnId } from './selectors'
import { RsaKeyParams } from '../constants'
import { fromArrayBuffer, toArrayBuffer } from '../utils'

const decorateWithSource = (from, action) => ({
  ...action,
  payload: {
    ...action.payload,
    from
  }
})

export const DontSend = Symbol('DontSend')

export const remoteSend = send => store => next => async action => {
  console.log(action)

  if (action[DontSend] || (action.type in localTypes)) {
    return next(action)
  }

  const state = store.getState()
  const actionWithSource = decorateWithSource(getOwnId(state), action)
  const { payload, type } = actionWithSource

  if (type === types.EDIT || type === types.MESSAGE) {
    console.log(action)

    const participants = getActiveParticipants(state)
    const { message } = payload
    const id = uuid()

    for(const [participantId, participant] of Object.entries(participants)) {
      const privateKey = await crypto.subtle.importKey(
        'jwk',
        participant.key,
        RsaKeyParams,
        false,
        ['encrypt']
      )

      const encryptedMessage = await crypto.subtle.encrypt(
        RsaKeyParams.name,
        privateKey,
        toArrayBuffer(message)
      )

      send({
        ...actionWithSource,
        payload: {
          id,
          ...actionWithSource.payload,
          message: fromArrayBuffer(encryptedMessage),
          to: participantId
        }
      })
    }
  } else {
    send(actionWithSource)
  }
}
