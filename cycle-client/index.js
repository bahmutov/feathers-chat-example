const Cycle = require('@cycle/core')
const Rx = require('rx')
const {makeDOMDriver, h1} = require('@cycle/dom')

// const feathers = require('feathers-client')
// const socketio = require('feathers-socketio/client')
const io = require('socket.io-client')
const URL = 'http://localhost:3040'

function makeMessageDriver(url) {
  // via feathers client
  const socket = io(URL)
  const app = feathers()
    .configure(feathers.hooks())
    .configure(feathers.socketio(socket));
  const messageService = app.service('messages')
  // expose on window for simple testing
  window.messageService = messageService

  return function sockDriver(outgoing$) {
    outgoing$.subscribe(outgoing => {
      console.log('should send outgoing message', outgoing)
    })

    return Rx.Observable.create(observer => {
      messageService.on('created', (message) => {
        console.log('new message sourced', message)
        observer.onNext(message)
      })
    });
  }
}

function main ({DOM, messages}) {
  // const incomingMessages$ = socket.get('messages')
  // incomingMessages$.map(console.log.bind(console)).subscribe()

  // messages.do(console.log.bind(console))
  messages.subscribe(console.log.bind(console))

  return {
    DOM: Rx.Observable.just(false).map(() => h1('hi')),
    messages: Rx.Observable.just(false)
  }
}
const sources = {
  DOM: makeDOMDriver('#app'),
  messages: makeMessageDriver(URL)
}
Cycle.run(main, sources)
