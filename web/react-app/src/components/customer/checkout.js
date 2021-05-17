import React from 'react';
import "./style.css"
import "./checkout.css"


class Checkout extends React.Component {

    constructor() {
        super()
        this.state = {
            status: "Success",
            cart: [],
            vendor: {}

        }

        this.componentWilMount = this.componentWillMount.bind(this)
        this.getCart = this.getCart.bind(this)
        this.pushToPayment = this.pushToPayment.bind(this)
        this.pushToCart = this.pushToCart.bind(this)
        this.back = this.back.bind(this)
    }

    getCart() {
        fetch('https://snacks-in-a-van.herokuapp.com/customer/cart', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "session_id": localStorage.getItem('session_id'),
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                if (response.status === "Success") {
                    this.setState({ cart: response.cart });
                    this.setState({ vendor: response.vendor });
                } else {
                    alert(response.err_msg)
                    if (response.err_msg === "Invalid session id.") {
                        this.props.history.push({ pathname: '/customer/login' });
                    }
                }
            })
        console.log(this.state.cart)
        console.log(this.state.vendor)
    }

    componentWillMount() {
        //check if the user has logged in
        if (!window.localStorage.session_id) {
            alert("Please log in first")
            this.props.history.push({ pathname: '/customer/login' });
        }
        this.getCart()
    }

    back() {
        this.props.history.goBack()
    }

    pushToCart() {
        this.props.history.push({
            pathname: '/customer/cart',
        });
    }

    // send order to vendor
    pushToPayment() {
        fetch('https://snacks-in-a-van.herokuapp.com/customer/cart/checkout', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "session_id": localStorage.getItem('session_id'),
                /*"cart": this.state.cart*/
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                if (response.status === "Success") {
                    this.props.history.push({
                        pathname: '/customer/payment',
                    });
                } else {
                    alert(response.err_msg)
                    if (response.err_msg === "Invalid session id.") {
                        this.props.history.push({ pathname: '/customer/login' });
                    }
                }
            })

        localStorage.setItem('item_in_cart', 0)
    }

    render() {

        let totalPrice = 0;

        // calcuate the sum of items and the total price in order.
        this.state.cart.forEach(myfunction);
        function myfunction(element) {
            totalPrice += element.snack.price * element.quantity;
        }



        const vanName = this.state.vendor.name;
        //const vanLocation = this.state.vendor.van_location.address;

        const orderItems = this.state.cart.map((item) =>
            <div className="orderItem">
                {(item.snack.image_path === "") ? <div> img</div> : <img className="image" src={item.snack.img_path} alt="" />}
                <div name-price-num>
                    <div className="item-Name">{item.snack.name}</div>
                    <div className="item-price"><b>Price: </b>${item.snack.price}</div>
                    <div className="item-quantity"> <b>Quantity:</b>{item.quantity}</div>
                </div>
                <div className="item-requirment">
                    <b className="requirment-head">Special requirment: </b>
                    <p className="requirment-body">{item.instruction}</p>
                </div>

            </div>
        );

        return (
            <div className="checkout">
                <div className="title">
                    <button className="return-button" onClick={this.back}>
                        <i className="fa fa-chevron-left"></i>Cart
                    </button>
                </div>

                <div className="checkout-page">Confirm Order</div>
                <div className="part">
                    <h2>Van Information</h2>
                </div>

                <p className="vendor-name"> <b>Name: </b> {vanName}</p>


                <div className="part">
                    <h2>Order Summary</h2>
                </div>

                <div className="orderItems">{orderItems}</div>

                <div className="bottom-part">
                    <p className="total-price">Total: ${totalPrice}</p>
                    <button className="pay-now" onClick={this.pushToPayment}>Pay Now</button>
                </div>
            </div>
        )
    }
}

export default Checkout;