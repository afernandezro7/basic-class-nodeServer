// Servidor de  Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./sockets');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT

        // Http server
        this.server = http.createServer( this.app )

        // Configuraciones del sockect server
        this.io = socketio( this.server, { /*  configuraciones */ } )
    }

    middlewares() {
        // Desplegar directorio publico
        this.app.use(express.static( path.resolve(__dirname,'../public') ));
        
        // Cors
        this.app.use( cors() )
    }

    sockectsConfig() {
        new Sockets( this.io )
    }

    execute() {
        // Inicializar midleswares
        this.middlewares();

        // Inicializar Sockets
        this.sockectsConfig()

        // Inicialiar server
        this.server.listen(this.port, ()=>{
            console.log('Server on Port:', this.port);
        });
    }
}

module.exports = Server