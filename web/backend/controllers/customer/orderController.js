// link to menu model
const { Customer, Order } = require("../../models/index.js")

/*=================================FUNCTIONS==================================*/
// handle request to get all snacks
const getOrders = async (req, res) => {
    let { session_id } = req.body,
        customer = await Customer.findOne({ session_id: session_id })


    await Order.find({customer: customer})
    .populate('items')
    .populate('items.snack')
    .populate('vendor')
    .exec( (err, result) => {
        if (err)
            res.send({
                status: 'Failed',
                err_msg: 'Failed to retrieve orders.'
            })
        res.send({
            status: 'Success',
            orders: result
        })
    })
}

// get particular snack by ID
const getOrderByID = async (req, res) => {
	let { session_id } = req.body,
    customer = await Customer.findOne({ session_id: session_id })

	const order = await Order.findById(req.params.orderID)
    .populate('items')
    .populate('items.snack')
    .populate('vendor')
    .exec( (err, result) => {
        if (err)
            res.send({
                status: 'Failed',
                err_msg: 'Failed to retrieve order.'
            })
        
        // check that the retrieved customer is correct
        if (String(result.customer) != String(customer._id)) {
            res.send({
                status: 'Failed',
                err_msg: 'Invalid Session ID.'
            })
        } else {
            res.send({
                status: 'Success',
                items: result.items,
                vendor: result.vendor,
                orderStatus: result.status,
            })
        }
    })
}

// retrieves the total number of items for a customer's cart
const getTotalOrderItems = async(req, res) => {
    // find the customer with the provided session id
    
    let totalItems = 0;
    // find the customer with the provided session id
    let { session_id } = req.body,
    customer = await Customer.findOne({ session_id: session_id })

    await Order.findById(req.params.orderID)
    .populate('items')
    .populate('vendor')
    .populate('customer.session_id')
    .exec( (err, result) => {
        if (err)
            res.send({
                status: 'Failed',
                err_msg: 'Failed to retrieve orders.'
            })

        // check that the retrieved customer is correct
        if (String(result.customer) != String(customer._id)) {
            res.send({
                status: 'Failed',
                err_msg: 'Invalid Session ID.'
            })
        } else {
            for (const item of result.items) {
                totalItems = totalItems + item.quantity;
            }
        
            res.send({
                status: 'Success',
                items: totalItems
            })
        }
    })
}

// retrieves the subtotal for a customer's order
const getOrderSubtotal = async(req, res) => {
    // find the customer with the provided session id

    let subtotal = 0;
    let { session_id } = req.body,
        customer = await Customer.findOne({ session_id: session_id })
    
    await Order.findById(req.params.orderID)
    .populate('items.snack')
    .populate('vendor')
    .populate('customer.session_id')
    .exec( async (err, result) => {
        if (err)
            res.send({
                status: 'Failed',
                err_msg: 'Failed to retrieve orders.'
            })
        
        console.log(result.customer, customer._id)
        // check that the retrieved customer is correct
        if (String(result.customer) != String(customer._id)) {
            res.send({
                status: 'Failed',
                err_msg: 'Invalid Session ID.'
            })
        } else {
            for (const item of result.items) {
                subtotal += item.quantity * item.snack.price;
            }
        
            res.send({
                status: 'Success',
                subtotal: subtotal
            })
        }
    })
}

/*===================================EXPORT===================================*/
module.exports = {
	getOrders,
    getOrderByID,
    getOrderSubtotal,
    getTotalOrderItems
}