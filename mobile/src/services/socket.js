import socketio from 'socket.io-client'

const socket = socketio('http://192.168.56.1:3333', {
    autoConnect: false,
})

function subscribeToNewbooks(subscribeFunction) {
    socket.on('new-book', subscribeFunction)
}

function connect(latitude, longitude, bookSearched) {
    socket.io.opts.query = {
        latitude,
        longitude,
        bookSearched,
    }

    socket.connect()
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect()
    }
}

export { connect, disconnect, subscribeToNewbooks }