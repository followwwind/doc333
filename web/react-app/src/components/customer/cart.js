import React from 'react';
import "./style.css"
import "./cart.css"

class Cart extends React.Component {

    constructor() {
        super()
        this.state = {
            cart: [],
            vendor: {},
            subtotal: 0,
            items: 0
        }

        this.componentWilMount = this.componentWillMount.bind(this)
        this.getCart = this.getCart.bind(this)
        this.getItems = this.getItems.bind(this)
        this.getSubtotal = this.getSubtotal.bind(this)
        this.back = this.back.bind(this)
        this.pushToCheckout = this.pushToCheckout.bind(this)
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
    }

    componentWillMount() {
        // check if the user has logged in
        if (!window.localStorage.session_id) {
            alert("Please log in first")
            this.props.history.push({ pathname: '/customer/login' });
        }
        this.getCart()
        this.getItems()
        //this.getSubtotal()

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
    }

    getItems() {
        fetch('https://snacks-in-a-van.herokuapp.com/customer/cart/items/', {
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
                    this.setState({ items: response.items });
                } else {
                    alert(response.err_msg)
                    if (response.err_msg === "Invalid session id.") {
                        this.props.history.push({ pathname: '/customer/login' });
                    }
                }
            })
    }

    getSubtotal() {
        fetch('https://snacks-in-a-van.herokuapp.com/customer/cart/subtotal/', {
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
                    this.setState({ subtotal: response.subtotal });
                } else {
                    alert(response.err_msg)
                    if (response.err_msg === "Invalid session id.") {
                        this.props.history.push({ pathname: '/customer/login' });
                    }
                }
            })
    }

    back() {
        this.props.history.goBack()
    }

    pushToCheckout() {
        if (this.state.items > 0) {
            this.props.history.push({ pathname: '/customer/checkout' });
        }

    }



    add(item) {

        let copyCart = this.state.cart;
        let numberItem = this.state.items;
        let totalprice = this.state.subtotal;

        copyCart.forEach(findID);
        function findID(element) {
            if (item._id === element.snack._id) {
                element.quantity += 1;
                numberItem += 1;
                totalprice += element.snack.price;
            }
        }
        this.setState({ cart: copyCart });
        this.setState({ items: numberItem });
        this.setState({ subtotal: totalprice });
        localStorage.setItem('item_in_cart', parseInt(localStorage.item_in_cart) + 1)
    }

    delete(item) {
        let copyCart = [];
        let numberItem = this.state.items;
        let totalprice = this.state.subtotal;

        this.state.cart.forEach(findID);
        function findID(element) {
            if (item._id === element.snack._id) {
                numberItem -= 1;
                totalprice -= element.snack.price;
                if (element.quantity > 1) {
                    element.quantity -= 1;
                    copyCart.push(element);
                }
            }
            if (item._id !== element.snack._id) {
                copyCart.push(element);
            }
        }
        this.setState({ cart: copyCart });
        this.setState({ items: numberItem });
        this.setState({ subtotal: totalprice });
        localStorage.setItem('item_in_cart', parseInt(localStorage.item_in_cart) - 1)
    }



    render() {

        let totalItem = 0;
        let totalPrice = 0;

        // calcuate the sum of items and the total price in cart.
        this.state.cart.forEach(countItem);
        function countItem(element) {
            totalItem += element.quantity;
            totalPrice += element.snack.price * element.quantity;
        }

        const cartItems = this.state.cart.map((item) =>
            <div className="cartItem">
                <img className="image" src={item.snack.img_path} alt="" />
                <div name-price-num>
                    <div className="item-Name">{item.snack.name}</div>
                    <div className="item-price"><b>Price: </b>${item.snack.price}</div>
                    <div className="item-quantity"> <b>Quantity:</b>{item.quantity}</div>
                </div>

                <div className="item-requirment">
                    <b className="requirment-head">Special requirment: </b>
                    {(item.instruction === null) ? <p className="requirment-body">None</p> :
                        <p className="requirment-body">{item.instruction}</p>}
                </div>
                <div className="add">
                    <button className="number-button" onClick={() => this.delete(item.snack)} disabled={true}>
                        <p className="minus">-</p>
                    </button>
                    <div className="number">{item.quantity}</div>
                    <button className="number-button" onClick={() => this.add(item.snack)} disabled={true}>
                        <p className="plus">+</p>
                    </button>
                </div>

            </div>
        );


        return (
            <div className="cart">
                <div className="title">
                    <button className="return-button" onClick={this.back}>
                        <i className="fa fa-chevron-left"></i>Back
                    </button>
                </div>

                <div className="page">Your Cart</div>
                <div className="statement">You have {totalItem} item(s) in your cart</div>

                <div className="cartItems">{cartItems}</div>

                <div className="cart-bottom-part">
                    <p className="total-price">Total: ${totalPrice}</p>
                    <button className="place-order" onClick={this.pushToCheckout}>Place order</button>
                </div>
            </div>
        )
    }
}

export default Cart;