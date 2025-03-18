const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/fetch', userController.fetchUsers); 
router.get('/users', userController.getUsers); 
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);



module.exports = router;
