const express = require('express')
const menuController = require('../../controllers/customer/menuController.js')

// make router
const menuRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
// get Menu
menuRouter.get('/', menuController.getSnacks)

// get specific food
menuRouter.get('/:foodID', menuController.getSnackByID)

/*===================================EXPORT===================================*/
module.exports = menuRouter