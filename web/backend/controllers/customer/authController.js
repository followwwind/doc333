const { Customer } = require("../../models/index.js")
const bcrypt = require('bcryptjs')

/*=================================FUNCTIONS==================================*/
// login with the given login details and respond to
// the user with a session id
const login = async (req, res) => {
    let { email, password } = req.body

    // modify the email so that it is all lower case
    email = email.toLowerCase()

    // find a customer that has the exact email and password
    let customer = await Customer.findOne({
        email: email
    })

    // when no customer is found, it means it's not a valid login
    if (!customer || !bcrypt.compareSync(password, customer.password))
        res.send({
            status: "Failed",
            err_msg: "Not a valid login."
        })

    // when customer is found, make a timed session id for the customer
    else {
        let session_id = ID(),
            expiry_ts = Date.now() + 60 * 60 * 1000 // set to expire in one hour

        // set the session to customer
        customer.session_id = session_id
        customer.expiry_ts = expiry_ts
        await customer.save()

        // let the user know the session id and when it is valid till
        res.send({
            status: "Success",
            session_id: session_id,
            expiry_ts: expiry_ts
        })
    }
}

const register = async (req, res) => {

    // retrieve the provided values
    let { email, password, firstname, lastname, dob } = req.body
    dob = new Date(dob)

    // validate the given values
    let err_msg = false
    if (!isEmail(email))
        err_msg = 'Not a valid email.'
    else if (password.length < 8)
        err_msg = 'Passwords must be at least 8 characters.'
    else if (!isName(firstname))
        err_msg = 'Not a valid first name.'
    else if (!isName(lastname))
        err_msg = 'Not a valid last name.'
    else if (!isDate(dob))
        err_msg = 'Not a valid date of birth.'

    // if any of the values are not valid,
    // registration can not continue
    if (err_msg)
        res.send({
            status: 'Failed',
            err_msg: err_msg
        })

    else {
        let customer = new Customer()
        customer.email = email.toLowerCase();
        customer.password = password; // should already be hashed
        customer.firstname = capitalizeFirstLetter(firstname);
        customer.lastname = capitalizeFirstLetter(lastname);
        customer.dob = dob;
        await customer.save(function(err) {
            if (err)
                throw err;
        })
        res.send({ status: "Success" })
    }
}

// should be called before controller functions that
// require authentication as this will do the checking
const verifySession = async (req, res) => {

    // find the customer with the provided session id
    let { session_id } = req.body,
        customer = await Customer.findOne({ session_id: session_id })

    // when found, check if the session id is expired or not
    if (customer && Date.now() <= customer.expiry_ts) {
        return true
    }

    // session is not valid
    res.send({
        status: 'Failed',
        err_msg: 'Invalid session id.'
    })
    return false
}

// generates a unique random id
// reference: https://www.codegrepper.com/code-examples/javascript/create+a+unique+session+id+in+javascript
const ID = () => {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

// checks if the provided email is a valid email
const isEmail = (email) => {
    const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    return re.test(String(email).toLowerCase())
}

// checks if the provided date is a valid date
const isDate = (date) => {
    return Object.prototype.toString.call(date) === '[object Date]'
}

// checks if the provided date is a valid name
const isName = (name) => {
    const re = /^[$A-Z_][0-9A-Z_$]*$/i
    return re.test(name)
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*===================================EXPORT===================================*/
module.exports = {
    login,
    register,
    verifySession
}