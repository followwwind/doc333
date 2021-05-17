const express = require('express')
const vanController = require('../../controllers/vendor/vanController')

// make router
const vanRouter = express.Router()

/*============================ROUTING STARTS HERE=============================*/
vanRouter.post('/start', vanController.startVan)
vanRouter.post('/stop', vanController.stopVan)

/*===================================EXPORT===================================*/
module.exports = vanRouter