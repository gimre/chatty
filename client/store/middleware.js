
import types from '../../shared/types.mjs'

import { getActiveParticipants, getSelfId } from './selectors'
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
  if (action[DontSend]) {
    return next(action)
  }

  const state = store.getState()

  const actionWithSource = decorateWithSource(getSelfId(state), action)
  const { payload, type } = actionWithSource
  if (type === types.MESSAGE) {
    const participants = getActiveParticipants(state)
    const { message } = payload

    for(const [id, participant] of Object.entries(participants)) {
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
          ...actionWithSource.payload,
          message: fromArrayBuffer(encryptedMessage),
          to: id
        }
      })
    }
  } else {
    send(actionWithSource)
  }
}
