const express = require('express')
const cartController = require('../../controllers/customer/cartController.js')
const authController = require('../../controllers/customer/authController.js')

const cartRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
// get Cart
cartRouter.post('/', async (req, res) => {
    if (await authController.verifySession(req, res))
        await cartController.getCart(req, res)
})

cartRouter.post('/set_vendor', async (req, res) => {
    if (await authController.verifySession(req, res))
        await cartController.setVendor(req, res)
})

// add item to cart
cartRouter.post('/add', async (req, res) => {
    if (await authController.verifySession(req, res) && 
        await cartController.checkVendorCart(req,res))
        await cartController.addToCart(req, res)
})

// modify item in cart
cartRouter.post('/modify')

// remove item from cart
cartRouter.post('/remove')

// checkout Cart
cartRouter.post('/checkout', async (req, res) => {
    if (await authController.verifySession(req, res) &&
        await cartController.checkVendorCart(req,res))
        await cartController.checkoutCart(req, res)
})

cartRouter.post('/items', async (req, res) => {
    if (await authController.verifySession(req, res) &&
        await cartController.checkVendorCart(req,res))
        await cartController.getTotalCartItems(req, res)
})

cartRouter.post('/subtotal', async (req, res) => {
    if (await authController.verifySession(req, res) &&
        await cartController.checkVendorCart(req,res))
        await cartController.getCartSubtotal(req, res)
})

/*===================================EXPORT===================================*/
module.exports = cartRouter