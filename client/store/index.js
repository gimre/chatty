
import { createStore, applyMiddleware } from 'redux'

import types from '../../shared/types.mjs'
import { sendTo } from '../../shared/utils.mjs'

import { DontSend, remoteSend } from './middleware'
import reducer from './reducer'
import { getSelfName } from './selectors'

export default ws => {
  const send = sendTo(ws)
  const store = createStore(reducer, applyMiddleware(remoteSend(send)))

  ws.addEventListener('open', () => store.dispatch({
    type: types.JOIN,
      payload: {
        name: getSelfName(store.getState())
      }
  }))

  ws.addEventListener('message', event => {
    const action = JSON.parse(event.data)
    action[DontSend] = true
    store.dispatch(action)
  })

  return window.store = store
}
