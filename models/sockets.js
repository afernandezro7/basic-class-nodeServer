

class Sockets {

    constructor( io ) {

        this.io = io
        this.socketEvents();

    }

    socketEvents() {

        // ON conection
        this.io.on('connection', ( socket ) => { 

            // Listen 'mensage-to-server' event
            socket.on('mensage-to-server', ( data )=>{
                console.log( data );       
                this.io.emit('mensajes-globales', data )
            })
        
        });
    }
}

module.exports = Sockets