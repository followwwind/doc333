const { Snack, Customer, Order, Vendor } = require('../../models/index.js')

/*=================================FUNCTIONS==================================*/
// retrieves the cart for the given user
const getCart = async (req, res) => {
    // find the customer with the provided session id
    let { session_id } = req.body
    await Customer.findOne({ session_id: session_id })

    // fill in the snack data in cart and the vendor
    .populate('cart.snack')
    .populate('vendor_cart')
    .exec( (err, result) => {
        if (err)
            res.send({
                status: 'Failed',
                err_msg: 'Failed to retrieve cart.'
            })
        res.send({
            status: 'Success',
            cart: result.cart,
            vendor: result.vendor_cart
        })
    })
}

// adds an item to cart
const addToCart = async (req, res) => {
    let { session_id, snack_id, quantity, instruction } = req.body,

        // retrieve the customer and snack needed
        customer = await Customer.findOne({ session_id: session_id }),
        snack_exist = await Snack.exists({ _id: snack_id })

    // validate snack and quantity before continuing
    let failed = false
    if (!snack_exist)
        failed = 'snack'
    else if (quantity <= 0)
        failed = 'quantity'

    // if any of the above fail, stop and let the user know
    if (failed)
        res.send({
            status: 'Failed',
            err_msg: `Not a valid ${failed}.`
        })

    else {

        // when there are no instruction, it is not a unique item
        // so check if item is in cart already so quantity can be
        // changed instead of appending a new item to list
        let modified_item = false
        if (!instruction) {

            // loop through the items to see if there is one
            // that has the same id and does not have instruction
            for (let item of customer.cart) {
                if (item.snack == snack_id && item.instruction === null) {
                    item.quantity += quantity
                    modified_item = true
                    break
                }
            }
        }

        // if the above code did not modify any items,
        // then appending the item is the only option
        if (!modified_item)
            customer.cart.push({
                snack: snack_id,
                quantity: quantity,
                instruction: instruction ? instruction : null
            })

        // save the edits
        await customer.save()
        res.send({ status: 'Success' })
    }
}

const checkoutCart = async (req, res) => {
    // TODO: currently does not work because of the vendor_cart issue described above

    // find the customer with the provided session id
    let { session_id } = req.body,
        customer = await Customer.findOne({ session_id: session_id })

    // check if there is items in cart
    if (!customer.cart.length) {
        res.send({
            status:'Failed',
            err_msg: "Customer cart is empty."
        })
    }

    // when there is items in the cart, then continue
    else {

        // make the a new order with the items and the given vendor id
        let order = await Order.create({
            customer: customer._id,
            vendor: customer.vendor_cart,
            items: customer.cart,
        })

        // once an order is made, the customer's cart is emptied out
        customer.vendor_cart = null
        customer.cart = []

        // make the changes and let the user know
        await customer.save()
        await order.save()
        res.send({ status: 'Success' })
    }
}

// sets the vendor that a customer is looking at.
const setVendor = async (req, res) => {

    let { session_id, vendor_id } = req.body,
        customer = await Customer.findOne({ session_id: session_id })

    customer.vendor_cart = vendor_id
    await customer.save();

    res.send({
        status: 'Success'
    })
}

// does customer have a vendor? is it valid?
const checkVendorCart = async(req, res) => {

    let { session_id } = req.body,
        customer = await Customer.findOne({ session_id: session_id }),
        vendor = await Vendor.findById(customer.vendor_cart)

    // check if the vendor does exist and is open
    if (vendor && vendor.van_location != null) {
        return true
    }

    // session is not valid
    res.send({
        status: 'Failed',
        err_msg: 'Invalid vendor id'
    })
    return false
}

// retrieves the total number of items for a customer's cart
const getTotalCartItems = async(req, res) => {
    // find the customer with the provided session id
    let { session_id } = req.body
    let totalItems = 0;
    await Customer.findOne({ session_id: session_id })
    .populate('cart.snack')
    .populate('vendor_cart')
    .exec( (err, result) => {
        if (err)
            res.send({
                status: 'Failed',
                err_msg: 'Failed to retrieve cart.'
            })
        
        for (const item of result.cart) {
            console.log(item, totalItems, item.quantity)
            totalItems = totalItems + item.quantity;
        }
    
        res.send({
            status: 'Success',
            items: totalItems
        })
    });
    
}

// retrieves the subtotal for a customer's cart
const getCartSubtotal = async(req, res) => {
    // find the customer with the provided session id
    let { session_id } = req.body
    let subtotal = 0;
    await Customer.findOne({ session_id: session_id })
    .populate('cart.snack')
    .populate('vendor_cart')
    .exec( (err, result) => {
        if (err)
            res.send({
                status: 'Failed',
                err_msg: 'Failed to retrieve cart.'
            })
        
        for (const item of result.cart) {
            subtotal += item.quantity * item.snack.price;
        }
    
        res.send({
            status: 'Success',
            subtotal: subtotal
        })
    });
    
}

/*===================================EXPORT===================================*/
module.exports = {
    getCart,
    addToCart,
    checkoutCart,
    checkVendorCart,
    setVendor,
    getTotalCartItems,
    getCartSubtotal
}