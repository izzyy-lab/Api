const User = require('../models/user.model')

// Controlador CRUD para usuarios.
// obtener todos los usuarios (Read)
const getUsers = async (req, res) =>{
    try{
        const users = await User.find();
        res.json(users);

    }catch (error){
        res.status(500).json({ message: error.message})
    }
};

// obtener un usuario por id (Read one)
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Crear un usuario (Create)
const createUser = async (req, res) => {
    const {name, email } = req.body;
    try {
        const newUser = new User({ name, email})
        await newUser.save()
        res.status(201).json(newUser);
    } catch (error){
        res.status(400).json({message: error.message })
    }
}


// Actualizar un usaurio existente (Update)
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;


    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email},
            { new: true }
        )
        if (!updatedUser){
            return res.status(404).json({ message: 'Usuario no encontrado'})
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

// Eliminar un usuario completo o solo un campo (Delete)
const deleteUser = async ( req, res) => {
    const { id } = req.params
    const { field } = req.query

    try {
        // Si se envia ?field=name solo se elimina ese campo del documento.
        if (field && field !== 'all' && field !== 'todos' && field !== '*') {
            const schemaField = User.schema.path(field);
            if (!schemaField || field === '_id') {
                return res.status(400).json({ message: 'Campo invalido para eliminar' });
            }

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $unset: { [field]: 1 } },
                { new: true }
            );

            if(!updatedUser){
                return res.status(404).json({ message: 'Usuario no encontrado '})
            }

            return res.json({
                message: `Campo "${field}" eliminado correctamente`,
                user: updatedUser
            });
        }

        // Si no se especifica campo, se elimina todo el documento.
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser){
            return res.status(404).json({ message: 'Usuario no encontrado '})
        }
        res.json ({message: 'Usuario eliminado correctamente '})
    } catch (error){
        res.status(400).json({ message: error.message })
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
