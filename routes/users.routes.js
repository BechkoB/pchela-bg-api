const express = require('express');

const userRouter = express.Router();
const { registerUser, loginUser, editUser, returnUserData } = require('../controllers/users.controller');

// Register User
userRouter.post('/register', registerUser);

// Login User
userRouter.post('/login', loginUser);

userRouter.put('/:id', editUser);

userRouter.get('/:id', returnUserData);


module.exports = userRouter;
