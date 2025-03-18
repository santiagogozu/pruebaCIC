const axios = require('axios');
const User = require('../models/user');

const fetchAndSavePosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data.slice(0, 10);

    for (const post of posts) {
      await User.create({
        userId: post.userId,
        id: post.id,
        title: post.title,
        body: post.body
      });
    }
    console.log('Posts guardados con éxito');
  } catch (error) {
    console.error('Error al obtener o guardar los posts:', error);
  }
};

const findAll = async () => {
  try {
    const posts = await User.findAll();
    return posts;
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    console.log("userData!!!!!!!", userData );
    
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(userData);
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return { message: 'Usuario eliminado con éxito' };
    }
    throw new Error('Usuario no encontrado');
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    throw error;
  }
};

module.exports = {
  fetchAndSavePosts,
  findAll,
  createUser,updateUser, deleteUser
};
