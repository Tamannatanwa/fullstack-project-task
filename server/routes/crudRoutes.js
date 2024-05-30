const express = require('express');
const router = express.Router();
const userController = require('../controllers/crudController');

router.post('/user', userController.createUser);
router.get('/user', userController.getAllUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUserById);
router.delete('/user/:id', userController.deleteUserById);
router.delete('/user', userController.deleteAllUsers);

module.exports = router;








