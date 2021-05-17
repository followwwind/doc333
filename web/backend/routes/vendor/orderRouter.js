const express = require('express')
const orderController = require('../../controllers/vendor/orderController')

// make router
const orderRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
orderRouter.post('/', orderController.getOrders)
orderRouter.post('/fulfill', orderController.fulfillOrder)

/*===================================EXPORT===================================*/
module.exports = orderRouter