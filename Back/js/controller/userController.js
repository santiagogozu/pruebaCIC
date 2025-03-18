const userService = require('../service/userService');

const fetchUsers = async (req, res) => {
  try {
    console.log("entra al fetchUsers");
    
    await userService.fetchAndSavePosts();
    res.status(200).json({ message: 'Posts guardados exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al guardar los usuarios' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const createUser = async (req, res) => {
  try {
    const { userId, title, body } = req.body;
   
    const newUser = await userService.createUser({ userId, title, body });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, body } = req.body;
    
    const user = await userService.findByPk(id);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.userId = userId || user.userId;
    user.title = title || user.title;
    user.body = body || user.body;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
// const deleteUser = async (req, res) => {
//   try {
//     console.log("user !!!!!!!!!" ,  req.params.id);
//     const user = await userService.findOne({
//       where: {
//         id: req.params.id
//       }
//     });
//     console.log("user !!!!!!!!!" , user);

//     if (!user) {
//       return res.status(404).json({ message: 'Usuario no encontrado' });
//     }
//     await user.destroy();
//     res.status(200).json({ message: 'Usuario eliminado con éxito' });
//   } catch (error) {
//     console.error('Error al eliminar el usuario:', error);
//     res.status(500).json({ message: 'Error al eliminar el usuario', error });
//   }
// };

const deleteUser = async (req, res) => {
  try {
    console.log("ID del usuario a eliminar:", req.params.id);

    // Usamos el servicio deleteUser
    const result = await userService.deleteUser(req.params.id);
    
    if (result.message === 'Usuario eliminado con éxito') {
      return res.status(200).json({ message: 'Usuario eliminado con éxito' });
    }

    return res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

module.exports = {
    fetchUsers,
    getUsers,
    deleteUser,
    updateUser,
    createUser
};
