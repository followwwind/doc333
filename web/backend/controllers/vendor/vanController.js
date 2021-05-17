// link to menu model
const { Vendor } = require('../../models/index.js')

const vendor_making_request = '607bf22b0c6f4f1d644d33d5'

/*=================================FUNCTIONS==================================*/
// marks van as ready for service by setting the location
const startVan = async (req, res) => {
    let { lat, long, address } = req.body

    // assume the vendor is Bubble Tea because theres no login functionality
    let vendor = await Vendor.findById(vendor_making_request)

    // check if latitude and longitude is valid, and van is closed
    let err_msg = false
    if (!(lat >= -90 && lat <= 90))
        err_msg = 'Not a valid  latitude.'
    else if (!(long >= -180 && long <= 180))
        err_msg = 'Not a valid longitude.'
    else if (!address)
        err_msg = 'No address given'
    else if (vendor.van_location != null)
        err_msg = 'Van is already open.'
    if (err_msg)
        res.send({
            status: 'Failed',
            err_msg: err_msg
        })

    else {

        // set the location if possible
        vendor.van_location = {
            lat: lat,
            long: long,
            address: address
        }

        // save the edits
        await vendor.save()

        res.send({ status: 'Success' })
    }
}

// marks van as closed for service by setting the location as null
const stopVan = async (req, res) => {

    // assume the vendor is Bubble Tea because theres no login functionality
    let vendor = await Vendor.findById(vendor_making_request)

    // when the vendor is open, close it
    if (vendor.van_location != null) {
        vendor.van_location = null
        await vendor.save()

        res.send({ status: 'Success' })
    }
    else
        res.send({
            status: 'Failed',
            err_msg: 'Van is already closed.'
        })

}

/*===================================EXPORT===================================*/
module.exports = {
    startVan,
    stopVan
}