/*
path: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { register, deleteUser, updateUser, getUsers } = require('../controllers/users');
const { validateFields } = require('../middlewares/validar-campos');
const { emailExist, userNameExist, existUserById } = require('../helpers/db-validators');

const router = Router();

//Ruta para obtener los usuarios registrados
router.get('/', getUsers);

//Ruta utilizada para registrarse
router.post('/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('phoneNumber', 'El número de teléfono es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email').custom(emailExist),
    check('userName').custom(userNameExist),
    validateFields
], register);

//Ruta utilizada para actualizar
router.put('/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('phoneNumber', 'El número de teléfono es obligatorio').not().isEmpty(),
    check('email', 'El correo no es valido').isEmail(),
    check('userName', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email').custom(emailExist),
    check('userName').custom(userNameExist),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], updateUser);

//Ruta utilizada para eliminar
router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], deleteUser);


module.exports = router;