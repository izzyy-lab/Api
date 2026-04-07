const express = require('express')
const router = express.Router()

// Rutas CRUD del recurso usuario.
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require ('../controllers/user.controller.js')

// obtener todos los usuarios
router.get('/', getUsers)

// Consultar un usuario por ID
router.get('/:id', getUserById)

// Crear un nuevo usuario
router.post('/', createUser)

//Actualizar un usuario por ID
router.put('/:id', updateUser)

// Elimina todo el usuario o un campo con ?field=nombreCampo
router.delete('/:id', deleteUser)

module.exports = router;
