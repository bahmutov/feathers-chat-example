const Cycle = require('@cycle/core')
const Rx = require('rx')
const {makeDOMDriver, h1} = require('@cycle/dom')

// const feathers = require('feathers-client')
// const socketio = require('feathers-socketio/client')
const io = require('socket.io-client')
const URL = 'http://localhost:3040'
// via feathers client
const socket = io(URL)
const app = feathers()
  .configure(feathers.hooks())
  .configure(feathers.socketio(socket));
const messageService = app.service('messages')
window.messageService = messageService

function main ({DOM}) {
  // const incomingMessages$ = socket.get('messages')
  // incomingMessages$.map(console.log.bind(console)).subscribe()

  return {
    DOM: Rx.Observable.just(false).map(() => h1('hi'))
  }
}
const sources = {
  // socket: SocketIO.createSocketIODriver(URL),
  DOM: makeDOMDriver('#app')
}
Cycle.run(main, sources)
