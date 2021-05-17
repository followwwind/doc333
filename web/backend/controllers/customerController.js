// link to schemas from db
const { Vendor, Customer } = require("../models/index.js")

/*=================================FUNCTIONS==================================*/
const getOpenVans = async (req, res) => {

    // find the vendors that have a value for van_location
	let open_vendors = await Vendor.find({ van_location: { "$ne": null } }),
        output = []

    for (let vendor of open_vendors) {
        output.push({
            vendor_id: vendor._id,
            vendor_name: vendor.name,
            van_location: vendor.van_location
        })
    }
	res.send({
        status: 'Success',
        vans: output
    })
}

/*===================================EXPORT===================================*/
module.exports = {
	getOpenVans,
}