const express = require('express')
const customerController = require('../controllers/customerController')
const authRouter = require('./customer/authRouter')
const cartRouter = require('./customer/cartRouter')
const menuRouter = require('./customer/menuRouter')
const orderRouter = require('./customer/orderRouter')

// make router
const customerRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
customerRouter.get('/vans', customerController.getOpenVans)

// more sub routes required so linking to a router
customerRouter.use('/auth', authRouter)
customerRouter.use('/cart', cartRouter)
customerRouter.use('/menu', menuRouter)
customerRouter.use('/orders', orderRouter)

/*===================================EXPORT===================================*/
module.exports = customerRouter