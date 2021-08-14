const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const getUsers = async(req, res=response) => {

    const query = {state:true};

    const users = await User.find(query);

    res.json({
        ok: true,
        users
    });

}

const register = async(req, res=response) => {

    const {name, lastName, phoneNumber, email, userName, password} = req.body;
    const user = new User({ name, lastName, phoneNumber, email, userName, password });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await user.save();


    res.json({
        user
    });

}


const updateUser = async(req, res=response) => {

    const { id } = req.params;

    const { __v, _id, state, password, ...rest } = req.body;

    //Encriptar nuevamente la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
    //Actualizar el usuario
    const user = await User.findByIdAndUpdate( id, rest);

    res.json(user);

}


const deleteUser = async(req, res=response) => {
    const { id } = req.params;

    //Cambiar el estado a inactivo - Esto para no tener que borrar al usuario físicamente en la DB
    const user = await User.findByIdAndUpdate(id, {state: false});
    res.json(user);
}



module.exports = {
    register,
    deleteUser,
    updateUser,
    getUsers
}