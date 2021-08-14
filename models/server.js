const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

//Clase encargada de crear el server
class Server {

    constructor() {
        //Creando la app de express
        this.app = express();
        //Leyendo el puerto definido en mis variables de entorno
        this.port = process.env.PORT;

        //Definiendo el path inicial que tendrán mis rutas
        this.usersPath = '/api/users';
        this.authPath  = '/api/auth';

        //Conectar DB
        this.connectDB();

        this.middlewares();

        
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }


    //MIDDLEWARES
    middlewares() {
        //Consumir CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Servir directorio público
        this.app.use( express.static('public') );
    }

    //Rutas de mi aplicación
    routes() {
        this.app.use( this.authPath, require('../routes/auth') );
        this.app.use( this.usersPath, require('../routes/users') );
    }

    //Listen - Método encargado de iniciar el server
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }

}


module.exports = Server;