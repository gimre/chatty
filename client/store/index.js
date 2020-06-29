
import { createStore, applyMiddleware } from 'redux'

import types from '../../shared/types.mjs'
import { sendTo } from '../../shared/utils.mjs'

import { RsaKeyParams } from '../constants'
import { fromArrayBuffer, getKeyPair, toArrayBuffer } from '../utils'

import { DontSend, remoteSend } from './middleware'
import reducer from './reducer'
import { getSelfName } from './selectors'

const decryptMessage = async (message, key) => {
  const decryptedMessage = await crypto.subtle.decrypt(
    RsaKeyParams,
    key,
    toArrayBuffer(message)
  ).catch(e => null)

  return decryptedMessage && fromArrayBuffer(decryptedMessage)
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
          name: getSelfName(store.getState())
        }
    })
  })

  ws.addEventListener('message', async event => {
    const action = JSON.parse(event.data)
    const { type, payload } = action

    if (type === types.MESSAGE || type === types.ROOM) {
      const { privateKey } = await getKeyPair()

      const key = await crypto.subtle.importKey(
        'jwk',
        privateKey,
        RsaKeyParams,
        false,
        ['decrypt']
      )


      if (type === types.MESSAGE) {
        const { message } = payload
        const decryptedMessage = await decryptMessage(message, key)
        if (decryptedMessage === null) {
          return
        }

        payload.message = decryptedMessage
      } else {
        const { history } = payload

        for(const item of history) {
          const { message } = item
          item.message = await decryptMessage(message, key)
        }

        payload.history = history.filter(item => Boolean(item.message))
      }
    }

    action[DontSend] = true
    store.dispatch(action)
  })

  return window.store = store
}
