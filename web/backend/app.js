/*
* The primary javascript file.
*/

const path = require('path')
const express = require('express')
var cors = require('cors')
require('dotenv').config()

const { Snack, Cart, Van, Customer, Order } = require('./models/index.js')
const customerRouter = require('./routes/customerRouter')
const vendorRouter = require('./routes/vendorRouter')

// setup Express
const app = express()
const port = process.env.PORT || 3000
// allows cross site requests
app.use(cors())

// replaces body-parser
app.use(express.json())

// route the customer and vendor requests to their respective routers
app.use('/customer', customerRouter)
app.use('/vendor', vendorRouter)

// start the server listening
app.listen(port, () => {
    console.log(`server is listening on port`, port)
})
