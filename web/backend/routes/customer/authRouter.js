const express = require('express')
const authController = require('../../controllers/customer/authController')

// make router
const authRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
// returns the login page
authRouter.get('/login')

// returns the register page
authRouter.get('/register')

// logs the user in
authRouter.post('/login', authController.login)

// registers a new account
authRouter.post('/register', authController.register)

/*===================================EXPORT===================================*/
module.exports = authRouter