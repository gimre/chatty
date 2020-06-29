
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
}

const url = Object.assign(new URL('/lobby', window.location), {
  protocol: window.location.protocol === 'https:'
    ? 'wss:'
    : 'ws:'
})

const ws = new WebSocket(url)
ReactDOM.render(<App socket={ws} />, document.getElementById('react-root'))
