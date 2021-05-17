/*
* Establishes MongoDB connections.
*/

// import mongoose module
const mongoose = require('mongoose');
require('dotenv').config()
const bcrypt = require('bcryptjs');

// set connection
//let connectionURL = 'mongodb+srv://dbAdmin:admin@cluster0.75dhy.mongodb.net/test';
CONNECTION_STRING ='mongodb+srv://<username>:<password>@cluster0.75dhy.mongodb.net/snacks-in-a-van?retryWrites=true&w=majority'
MONGO_URL = CONNECTION_STRING.replace('<username>', process.env.MONGO_USERNAME).replace('<password>', process.env.MONGO_PASSWORD)
mongoose.connect(MONGO_URL || 'mongodb://localhost', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	dbName: 'snacks-in-a-van'
})
const db = mongoose.connection

// event handlers
db.on('error', err => {
	console.error(err);
	process.exit(1)
})

db.once('open', async () => {
    console.log('Mongo connection started on ' + db.host + ':' + db.port)
    // db.db.listCollections().toArray(function (err, collectionNames) {
	// 	console.log(collectionNames);
    // })
})

/*==================================SCHEMAS===================================*/
// Snack Schema
// this needs to be updated to include images
const snackSchema = new mongoose.Schema(
	{
		name: {
		    type: String,
            required: true,
            unique: true
        },
		price: {
		    type: Number,
            required: true
		},
        img_path: {
            type: String
        },
        description: {
            type: String
        }
	},
    { collection: 'snacks' }
)

const itemSchema = new mongoose.Schema(
    {
        snack: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'snacks'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        instruction: String
    }
)

// Customer Schema
const customerSchema = new mongoose.Schema(
	{
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
		firstname: {
		    type: String,
            required: true
        },
		lastname: {
		    type: String,
            required: true
        },
		dob: {
		    type: Date,
            required: true
        },
        session_id: String,
        expiry_ts: Number,
        vendor_cart: {
		    type: mongoose.Schema.Types.ObjectId,
            ref: 'vendors'
        },
        cart: [itemSchema]
	},
    { collection: 'customers' }
)

// method generates a hash, used for password hashing
customerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

// checks if password is valid
customerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


/*
    Order Schema
    order has: customer, list of items
    each item in the list is a reference to something in the Snack Schema and
    a nonzero quantity
*/
const orderSchema = new mongoose.Schema(
	{
		customer: {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'customers',
            required: true
        },
        vendor: {
		    type: mongoose.Schema.Types.ObjectID,
            ref: 'vendors',
            required: true
        },
		items: [itemSchema],
        status: {
		    type: String,
            enums: ['outstanding', 'fulfilled', 'completed', 'cancelled'],
            default: 'outstanding'
        }
	},
    { collection: 'orders', timestamps: true }
)

// Vendor Schema
const vendorSchema = new mongoose.Schema(
	{
		name: {
		    type: String,
            required: true
        },
        van_location: {
		    type: Object,
            lat: {
                type: Number,
                required: true
            },
            long: {
                type: Number,
                required: true
            },
            address: String
        }
	},
    { collection: 'vendors' }
)

/*===================================MODELS===================================*/
// compile schemas into models and export them
const Snack    = mongoose.model('snacks', snackSchema)
const Customer = mongoose.model('customers', customerSchema)
const Order    = mongoose.model('orders', orderSchema)
const Vendor   = mongoose.model('vendors', vendorSchema)

module.exports = {Snack, Customer, Order, Vendor}