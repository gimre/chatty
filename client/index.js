
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/app'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../sw.js')
}

const ws = new WebSocket('ws://127.0.0.1:8080/lobby')
ReactDOM.render(<App socket={ws} />, document.getElementById('react-root'))
