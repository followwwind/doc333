
**The University of Melbourne**
# INFO30005 – Web Information Technologies

# Group Project Repository

# Submission Details:
<span style="background-color: #FFFF00"> These are the submission details for Deliverable 3.</span>

* Dummy Account:
    * Email address: `test@testmail.com`
    * Password: `7RIknspOXGIl2!$Isq5Ig5qe2HjX8v`
* Database Details:
    * Cluster URL: `cluster0.75dhy.mongodb.net/test`
    * Username: `dbAdmin`
    * Password: `admin`
    * Connection URL for MongoDB Compass: `mongodb+srv://dbAdmin:admin@cluster0.75dhy.mongodb.net/test`

## Table of contents
* [Team Members](#team-members)
* [Assignment Specifications](#Assignment-Specifications)
* [Backend Request Documentation](#backend-request-documentation)

## Team Members

| Name          | Task           | State         |
| :---          |     :---:      |          ---: |
| Kia Sen Tan   | Back End       | Done          |
| Ariel Guo     | Front End      | Testing       |
| Lissy         | Front End      | Amazing!      |
| Jiantao Zhang | Back end       | Stuff         |
| Christy Sun   | Front End      | Working       |

# Assignment Specifications
***
## TO DO
* Deliverable 3: Front and Back End
    * Customer Login
    * View menu of snacks including pictures and prices
    * Order three different snacks
    * View Order Details

***

## Instructions for running the backend code on your machine
1. Make sure if you have node.js installed, if not it can be found here <https://nodejs.org/en/>.
2. Navigate to the backend folder and run `npm install` in your terminal to install the neccessary node modules.
3. Run `npm run server` in your terminal which will start the backend server.

## Requirements
Your team has been contracted to design and build web apps for Snacks in a Van, a new startup company operating in Melbourne. Snacks in a Van runs a fleet of food trucks that work as popup cafes. 

Our vendors drive around Melbourne, parking wherever they think there are customers. They have no fixed schedule and are mobile and flexible. Some vendors tend to go to the same places each day, while others are more random, or try to park near big events like sporting matches and university open days.

While our vans don’t have fixed locations, their current location is very important to our customers, who need to be able to find nearby vans when they’re hungry. We make this information available to customers via a web app. To save time, the app also allows registered customers to order their snacks in advance of arriving at the van.

We expect to have around 100 vans and 100k customers. We give each van a fun name like “Tasty Trailer”. Vendors are identified as van names in our apps – we don’t make staff names public.

You need to make two web apps: one for customers and one for vendors.

### Customer App
When a customer opens their app, they first need to see where the nearest vans are. To do this, the app needs to get the customer’s location, access current van locations from the database, calculate the five nearest vans, and display their details. This display could simply be a list (closest van at the top), or for bonus marks, you can show their locations on a map.

After the customer chooses the van they want to purchase from (it won’t necessarily be the closest one) a menu should appear which lists all the snacks available. Every van offers the same menu, because we are a chain - but customers order from a specific van.

To find a van and see the menu, customers don’t need to be logged in. But to proceed beyond this point and place an order, they need to log in. (If a prospective customer doesn’t already have an account, they’ll need to register and create one.) In our database we want to store the customer’s family and given names, a login ID (email address) and password. Customers should be able to change their profile details (name and password) later.

Use good security practices such as authentication and session management to handle logins and registrations and to appropriately restrict access to features and data.

#### Summary of Customer Requirements
* Get customer location to find the five nearest vans
    * **Bonus**: Show locations on a map
* Display menu for customer
* Place orders for a specific van
    * One or more snacks with quantities for each
    * If orders take more than 15 minutes, customer receives 20% discount
    * Customers can change or cancel order within 10 minutes
        * Changing order resets the 15-minute timer
        * These timers should *not* be hard coded
    * **BONUS**: Order screen reflects live changes 
* Monitor status of placed orders (Incomplete, ready for pickup, complete)
* Customer Authentication and Account creation
    * Basic security practices and session management for logins
* **Bonus**: Rating experience (from 1-5), with optional comment
* Cater to all screen sizes, including desktops

### Vendor App
The vendors working in our vans also need an app. They log in using the van name rather than their personal name or email.

When a vendor has parked and is ready to start selling, they need to send their location to the database and mark themselves as open-for- business. Allow them to enter a short text address (e.g. “on Grattan st outside Melbourne Uni”). At the same time, have the app capture their geo-location. When they leave this location to drive somewhere else or quit for the day, allow the vendor to mark this in the database.

Vendors need a screen with a list of their van’s outstanding orders, i.e. orders which have been placed but not yet fulfilled. This list needs to be in time order, with the older, more urgent orders at the top.

The vendor needs to be able to click on an order in the list to display the details of that order, including the order number, customer’s given name, the items that were ordered, and how many minutes remain before a discount must be awarded.

Once an order is fulfilled (the snacks are prepared), the vendor needs to be able to click a button to mark this, and when the customer picks up the snacks, the vendor needs to be able to mark this too. Fulfilled orders need to be shows as such in the vendor’s order list, while picked-up orders should disappear from the list – though they are not deleted from the database, and should be easily findable again in case customers return to discuss their order. If the 20% discount for late fulfillment was applied, make sure you record this.

We expect that vendors will use an iPad placed on a shelf in the van. Their webpages need to be usable at this screen size, and be clear and well-designed so that operators don’t make mistakes in these busy workplaces.

#### Summary of Vendor App Requirements
* Authentication via van name
* Ability to manage status (Open-for-business, Closed, etc.)
    * Update location in database once they are ready to sell
* List outstanding orders, sorted by time (oldest first) by default
    * Potential improvement would be to add other sorting options
    * Select order in list to display details, including order number, customer name, items ordered, and time until discount
    * Vendors can mark an order as ready-for-pickup and picked up
    * If discount was applied, this needs to be recorded on the order
    * **BONUS**: Order screen reflects live changes 
* Expected screen size is an Apple iPad

### Menu items
Items:
* Cappuccino
* Latte
* Flat white
* Long black
* Plain biscuit
* Fancy Biscuit
* Small cake
* Big Cake

#### Menu Requirements
* **Do not hardcode the menu in HTML.**
* Photos (sourced from Unsplash) and prices listed for each menu item
* Menu entries stored in database

### Location, distances and Maps
Locations are pair of decimal numbers. A Precision of four decimal points corresponds to about 10 metres in Melbourne, which is good enough for our business. This data can be obtained via the Geolocation API and some client-side Javascript.

The distance between two locations is calculated using the Euclidian formula - i.e. Pythagoras' Theorem. There is no need to calculate a walking path or take obstacles or traffic into account (unless you really want to).

**BONUS**: Displaying locations on a map is an optional challenge for bonus marks. You could use Google Maps or Open Street Maps. Instructions can be found online.

### Database Management
It is not required to build an admin feature that lets staff maintain the menu. In these cases, you can simply place the data in the database yourself, using any tool
e.g. Robo 3T.

### Technologies
Project is created with:
* NodeJs 14.16.X

**Task Checklist**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [x] App server mockup
- [ ] Front-end + back-end
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)

# Backend Request Documentation
Below will show the different request that can be made to the backend server.

It will outline the endpoint for example `/menu/` which the front end needs to make
the request to www.ourwebsite.com/menu/. 
The documentation will also let you know the type of request GET or POST, and the
data that you need to send with and what data will come back in the response

# A response status can return "Success" or "Failed". If the response fails, an error message will indicate why the response failed.

# Success Request

    {
        "status": "Success",
        info you've requested...
    }

# Failed Request
    
    {
        "status": "Failed",
        "err_msg": "Why you failed it written in here"
    }

# Customer
## Show Open Vans
**URL**: `/customer/vans/`\
**Method**: `GET`\
**Return Data**:  

    {
        "status": "Success",
        "vans": [
            {
                "vendor_id": "607bf22b0c6f4f1d644d33d5",
                "vendor_name": "Bubble Tea",
                "van_location": {
                    "lat": 15,
                    "long": 30,
                    "address": null
                }
            },
            ...
        ]
    }

## Show Menu
**URL**: `/customer/menu/`\
**Method**: `GET`\
**Return Data**:  

    {
        "status": "Success",
        "menu": [
            {
                "_id": "607d452cafd1955f6c5ca64c",
                "name": "Cappucinno",
                "price": 3.5,
                "img_path": "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49",
                "description": "Lorem ipsum dolor sit amet"
            },
            {
                "_id": "607d452cafd1955f6c5ca64d",
                "name": "Latte",
                "price": 3.5,
                "img_path": "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49",
                "description": "Lorem ipsum dolor sit amet"
            },
            ...
        ]
    }
## Show Snack by ID
**URL**: `/customer/menu/:foodID`\
**Method**: `GET`\
**Return Data**:

    {
        "status": "Success",
        "snack": {
            "_id" : ObjectId("607d452cafd1955f6c5ca652"),
            "name" : "Small Cake",
            "price" : "3.50",
            "img_path" : "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e",
            "description" : "Lorem ipsum dolor sit amet"
        }
    }

## Register User
**URL**: `/customer/auth/register/`\
**Method**: `POST`\
**Request Body**:

    {
        "email": "test@hotmail.com",
        "password": "password123",
        "firstname": "John",
        "lastname": "Smith",
        "dob": "2000-01-02"
    }

**Return Data**:

    {
        "status": "Success"
    }

## Login User
**URL**: `/customer/auth/login/`\
**Method**: `POST`\
**Request Body**:

    {
        "email": "test@hotmail.com",
        "password": "password123",
    }

**Return Data**:

    {
        "status": "Success",
        "session_id": "_qnq8jhrky",
        "expiry_ts": 1620010719554
    }

## Show Cart
**URL**: `/customer/cart/`\
**Method**: `POST`\
**Request Body**:

    {
        "session_id": "_mohrblene"
    }

**Return Data**: 
    
    {  
        "status": "Success",
        "cart": [
            {
                "_id": "608eb3d5329b281bc01fddb6",
                "snack": {
                    "_id": "607d452cafd1955f6c5ca64c",
                    "name": "Cappuccino",
                    "price": 3.5,
                    "img_path": "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49",
                    "description": "Lorem ipsum dolor sit amet"
                },
                "quantity": 2,
                "instruction": null
            },
            ...
        ],
        "vendor": {
            "_id": "607bf22b0c6f4f1d644d33d5",
            "name": "Bubble Tea",
            "van_location": {
                "lat": 33,
                "long": 69,
                "address": null
            }
        } 
    }

## Set Vendor
**URL**: `/customer/cart/set_vendor/`\
**Method**: `POST`\
**Request Body**:

    {
        "session_id": "_mohrblene",
        "vendor_id": "607bf22b0c6f4f1d644d33d5"
    }

**Return Data**:

    {
        "status": "Success"
    }

## Add to Cart
**URL**: `/customer/cart/add/`\
**Method**: `POST`\
**Request Body**: 

    {
        "session_id": "_mohrblene"
        "snack_id": "607d452cafd1955f6c5ca653",
        "quantity": 2,
        "instruction": "Extra Sprinkles" /* Optional */
    }
    
**Return Data**: 

    {
        "status": "Success"
    }

## Remove from Cart
**URL**: `/customer/cart/remove/`\
**Method**: `POST`\
**Request Data**: Not yet implemented\
**Return Data**: Not yet implemented

## Checkout cart
**URL**: `/customer/cart/checkout/`\
**Method**: `POST`\
**Request Body**: 

    {
        "session_id": "_mohrblene"
    }
    
**Return Data**: 

    {
        "status": "Success"
    }

## Get number of items in cart
**URL**: `/customer/cart/items/`\
**Method**: `POST`\
**Request Body**:

    {
        "session_id": "_mohrblene",
    }

**Return Data**:

    {
        "status": "Success",
        "items": 2
    }

## Get cart subtotal
**URL**: `/customer/cart/subtotal/`\
**Method**: `POST`\
**Request Body**:

    {
        "session_id": "_mohrblene",
    }

**Return Data**:

    {
        "status": "Success",
        "subtotal": 11
    }

## Get Orders 
**URL**: `/customer/orders/`\
**Method**: `POST`\
**Request Body**:

    {
        "session_id": "_mohrblene"
    }

**Return Data**:

    {
    "status": "Success",
    "orders": [
        {
            "status": "outstanding",
            "_id": "608f85cf14bf315adcd574d4",
            "customer": "608f6afe8ef6f8002205cc14",
            "vendor": {
                "_id": "607bf22b0c6f4f1d644d33d5",
                "name": "Bubble Tea",
                "van_location": {
                    "lat": 33,
                    "long": 69,
                    "description": null
                }
            },
            "items": [
                {
                    "_id": "608f7ef51d63267b6c16411e",
                    "snack": {
                        "_id": "607d452cafd1955f6c5ca653",
                        "name": "Big Cake",
                        "price": 5.5,
                        "img_path": "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
                        "description": "Lorem ipsum dolor sit amet"
                    },
                    "quantity": 2,
                    "instruction": "No Milk, no bread, no salt, no sugar"
                },
                ...
            ]
            "createdAt": "2021-05-03T05:10:39.268Z",
            "updatedAt": "2021-05-03T05:10:39.268Z",
            "__v": 0
        }
    ]
}

## Get number of items in a specific order
**URL**: `/customer/order/:orderID/items/`\
**Method**: `POST`\
**Request Body**:

    {
        "session_id": "_mohrblene",
    }

**Return Data**:

    {
    "status": "Success",
    "items": [
        {
            "_id": "608f7ef51d63267b6c16411e",
            "snack": {
                "_id": "607d452cafd1955f6c5ca653",
                "name": "Big Cake",
                "price": 5.5,
                "img_path": "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
                "description": "Lorem ipsum dolor sit amet"
            },
            "quantity": 2,
            "instruction": "No Milk, no bread, no salt, no sugar"
        },
        ...
    ],
    "vendor": {
        "_id": "607bf22b0c6f4f1d644d33d5",
        "name": "Bubble Tea",
        "van_location": {
            "lat": 33,
            "long": 69,
            "description": null
        }
    },
    "orderStatus": "outstanding"
}

## Get order subtotal
**URL**: `/customer/order/:orderID/`\
**Method**: `POST`\
**Request Body**:

    {
        "session_id": "_mohrblene",
    }

**Return Data**:

    {
        "status": "Success",
        "subtotal": 11
    }

# Vendor
## Start Van (Setting Van Status)
**URL**: `/vendor/van/start/`\
**Method**: `POST`\
**Request Body**: 

    {
	    "lat": -90 to 90,
	    "long": -180 to 180,
	    "address": "Near the park" /* Optional */
    }

**Return Data**: 

    {
        "status": "Success"
    }

## Stop Van (Setting Van Status)
**URL**: `/vendor/van/stop/`\
**Method**: `POST`\
**Return Data**: 

    {
        "status": "Success"
    }

## Get Orders by Status Type (Get Outstanding Orders)
**URL**: `/vendor/order/get/`\
**Method**: `POST`\
**Request Body**: 

    {
	    "order_status": "outstanding" /* Can also be "fulfilled" "completed" "cancelled" */
    }
**Return Data**:

    {
        "status": "Success",
        "orders": [
            {
                "status": "outstanding",
                "_id": "608d0c289029d0426c5c9a97",
                "customer": {
                    "_id": "608cda0b494cd05f5c278824",
                    "firstname": "John",
                    "lastname": "Smith"
                },
                "vendor": "607bf22b0c6f4f1d644d33d5",
                "items": [
                    {
                        "_id": "608cde654edfd456bc638e95",
                        "snack": {
                            "_id": "607d452cafd1955f6c5ca64c",
                            "name": "Cappuccino",
                            "price": 3.5,
                            "img_path": "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49",
                            "description": "Lorem ipsum dolor sit amet"
                        },
                        "quantity": 2,
                        "instruction": "No Milk, no bread, no salt, no sugar"
                    },
                    ...
                ],
                "createdAt": "2021-05-01T08:07:04.365Z",
                "updatedAt": "2021-05-01T08:07:04.365Z",
                "__v": 0
            },
            ...
        ]
    }
## Fulfill Order
**URL**: `/vendor/order/fulfill/`\
**Method**: `POST`\
**Request Body**: 

    {
	    "order_id": "607c6026d4180f260cf66749"
    }
**Return Data**: 

    {
        "status": "Success"
    }

