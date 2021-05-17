// link to menu model
const { Snack } = require("../../models/index.js")

/*=================================FUNCTIONS==================================*/
// handle request to get all snacks
const getSnacks = async (req, res) => {
	let snacks = await Snack.find()
	res.send({
        status: 'Success',
        menu: snacks
    })
}

// get particular snack by ID
const getSnackByID = async (req, res) => {
	let snack = await Snack.findById(req.params.foodID)

    // we found the snack
	if (snack) {
		res.send({
            status: 'Success',
            snack: snack
        })
	}

	// when it's not found
	else {
		res.send({
            status: 'Failed',
            err_msg: 'The snack does not exist.'
        })
	}
}

/*===================================EXPORT===================================*/
module.exports = {
	getSnacks,
    getSnackByID
}