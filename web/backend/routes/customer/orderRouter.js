const express = require('express')
const orderController = require('../../controllers/customer/orderController.js')
const authController = require('../../controllers/customer/authController.js')

// make router
const orderRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
// get orders belonging to a specific customer
orderRouter.post('/', async(req,res) => {
    if (await authController.verifySession(req, res))
        orderController.getOrders(req, res)
})

// get specific order for specfic customer
orderRouter.post('/:orderID', async(req,res) => {
    if (await authController.verifySession(req, res))
        orderController.getOrderByID(req, res)
})

// get subtotal of specific order
orderRouter.post('/:orderID/subtotal', async(req,res) => {
    if (await authController.verifySession(req, res))
        orderController.getOrderSubtotal(req, res)
})

// get total items for specific order
orderRouter.post('/:orderID/items', async(req,res) => {
    if (await authController.verifySession(req, res))
        orderController.getTotalOrderItems(req, res)
})

/*===================================EXPORT===================================*/
module.exports = orderRouter