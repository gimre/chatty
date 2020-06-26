const sendTo = ws => msg => ws.send(JSON.stringify(msg))

const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
)

const ws = new WebSocket('ws://127.0.0.1:8080/lobby')
const send = sendTo(ws)
const from = uuidv4()

ws.addEventListener('open', () => {
  send({
    type: 'JOIN',
    payload: {
      from,
      name: 'Elon Musk'
    }
  })
})

ws.addEventListener('message', event => {
  const data = JSON.parse(event.data)
  console.log(data)
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
}
