const User = require('../models/user');


const emailExist = async(email = "") => {
    //Verificar si el email existe en la db
    const existEmail = await User.findOne({ email });

    if(existEmail){
        throw new Error(`El email ${email} ya está registrado`);
    }
}

const userNameExist = async(userName = "") => {
    //Verificar si el userName existe en la db
    const existUserName = await User.findOne({ userName });

    if(existUserName){
        throw new Error(`El nombre de usuario ${userName} ya está registrado`);
    }
}

const existUserById = async(id = "") => {
    //Verificar si el id existe en la base de datos
    const existUser = await User.findById(id);
    if(!existUser) {
        throw new Error(`El usuario con id: ${id} no existe.`);
    }
}


module.exports = {
    emailExist,
    userNameExist,
    existUserById
}