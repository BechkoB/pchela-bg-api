const express = require('express');

const userRouter = express.Router();
const { registerUser, loginUser } = require('../controllers/users.controller');

// Register User
userRouter.post('/register', registerUser);

// Login User
userRouter.post('/login', loginUser);

module.exports = userRouter;
