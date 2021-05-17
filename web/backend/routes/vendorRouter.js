const express = require('express')
const vanRouter = require('./vendor/vanRouter')
const orderRouter = require('./vendor/orderRouter')

// make router
const vendorRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
vendorRouter.use('/van', vanRouter)
vendorRouter.use('/orders', orderRouter)

/*===================================EXPORT===================================*/
module.exports = vendorRouter