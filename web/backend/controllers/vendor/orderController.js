// link to menu model
const { Order } = require('../../models/index.js')

const vendor_making_request = '607bf22b0c6f4f1d644d33d5'

/*=================================FUNCTIONS==================================*/
// retrieves the given type of orders for the vendor
const getOrders = async (req, res) => {
    let { order_status } = req.body

    // only continue if its getting valid order status
    if (['outstanding', 'fulfilled', 'completed', 'cancelled'].includes(order_status))

        // find the orders with the given status from the vendor
        await Order.find({
            vendor: vendor_making_request,
            status: order_status
        })

        // fill in the snack data for the items
        .populate('items.snack')

        // fill in only first name and last name of customer info
        .populate('customer', ['firstname', 'lastname'])
        .exec( (err, result) => {
            if (err)
                res.send({
                    status: 'Failed',
                    err_msg: 'Unable to get orders.'
                })
            res.send({
                status: 'Success',
                orders: result
            })
        })
    else
        res.send({
            status: 'Failed',
            err_msg: 'Provided invalid status.'
        })
}

const fulfillOrder = async (req, res) => {
    let { order_id } = req.body

    // find the given order
    let order = await Order.findById(order_id)

    // check if order is outstanding and it's a order to vendor
    let err_msg = false
    if (order.status !== 'outstanding')
        err_msg = 'Order is not in outstanding status.'
    else if (order.vendor != vendor_making_request)
        err_msg = 'Order does not belong to your vendor.'

    if (err_msg)
        res.send({
            status: 'Failed',
            err_msg: err_msg
        })

    else {
        order.status = 'fulfilled'
        await order.save()
        res.send({ status: 'Success' })
    }
}

module.exports = {
    getOrders,
    fulfillOrder
}