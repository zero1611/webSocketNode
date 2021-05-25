const express = require('express')
const cors = require('cors')
const {socketControler} = require("../sockets/controller");


class Server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {

        };


        //midlewares
        this.middlewares()
        // Rutas de la app
        this.routes()
        //Sockets
        this.sockets();
    }

    middlewares(){
        // Directorio Publico
        this.app.use(cors());

        this.app.use(express.static('public'));

    }
    routes(){
        //this.app.use(this.paths.auth, require('../routes/auth'));


    }

    sockets(){
        this.io.on('connection', socketControler);
    }


    listen(){
        this.server.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }
}

module.exports = Server;