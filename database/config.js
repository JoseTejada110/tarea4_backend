const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        
        //Código encargado de conectarse a la base de datos
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("Base de datos online");

    } catch (error) {
        console.log(error);
        console.log("Error al conectarse a la base de datos");
    }

}

module.exports = {
    dbConnection
}