
import { createStore, applyMiddleware } from 'redux'

import types from '../../shared/types.mjs'
import { sendTo } from '../../shared/utils.mjs'

import { RsaKeyParams } from '../constants'
import { fromArrayBuffer, getKeyPair, toArrayBuffer } from '../utils'

import { DontSend, remoteSend } from './middleware'
import reducer from './reducer'
import { getOwnName } from './selectors'

const decryptMessage = async (message, key) => {
  const decryptedMessage = await crypto.subtle.decrypt(
    RsaKeyParams,
    key,
    toArrayBuffer(message)
  )

  return fromArrayBuffer(decryptedMessage)
}

export default ws => {
  const send = sendTo(ws)
  const store = createStore(reducer, applyMiddleware(remoteSend(send)))

  ws.addEventListener('open', async () => {
    const { publicKey } = await getKeyPair()

    store.dispatch({
      type: types.JOIN,
        payload: {
          key: publicKey,
          name: getOwnName(store.getState())
        }
    })
  })

  ws.addEventListener('message', async event => {
    const action = JSON.parse(event.data)
    const { type, payload } = action

    if (type === types.EDIT || type === types.MESSAGE || type === types.ROOM) {
      const { privateKey } = await getKeyPair()

      const key = await crypto.subtle.importKey(
        'jwk',
        privateKey,
        RsaKeyParams,
        false,
        ['decrypt']
      )

      if (type === types.ROOM) {
        const { history } = payload
        for(const item of history) {
          const { message } = item
          item.message = await decryptMessage(message, key)
        }
      } else {
        const { message } = payload
        payload.message = await decryptMessage(message, key)
      }
    }

    action[DontSend] = true
    store.dispatch(action)
  })

  return window.store = store
}
