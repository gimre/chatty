
import React from 'react'
import ReactDOM from 'react-dom'
import { uuid } from 'uuidv4'

import types from '../shared/types.mjs'
import { sendTo } from '../shared/utils.mjs'

import App from './components/app'
import store from './store'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
}

const ws = new WebSocket('ws://127.0.0.1:8080/lobby')
const send = sendTo(ws)
const from = uuid()

ws.addEventListener('open', () => {
  send({
    type: types.JOIN,
    payload: {
      from,
      name: 'Elon Musk'
    }
  })
})

ws.addEventListener('message', event => {
  const action = JSON.parse(event.data)
  console.log(action)
  store.dispatch(action)
})

ReactDOM.render(<App />, document.getElementById('react-root'))
