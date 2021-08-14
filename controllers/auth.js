const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const login = async(req, res = response) => {
    
    const {userName, password} = req.body;
    
    try {

        //Verificar si el nombre de usuario introducido existe
        const user = await User.findOne({ userName });
        if(!user){
            return res.status(400).json({
                msg: 'El usuario introducido no está registrado'
            });
        }

        //Verificar si el usuario está activo
        if(!user.state) {
            return res.status(400).json({
                msg: 'El usuario introducido no está activo'
            });
        }

        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña introducida es incorrecta'
            });
        }

        res.json({
            user
        })

    } catch (error) {
        
    }
}


module.exports = {
    login
}