import React from 'react';
import "./style.css"
import "./itemDetail.css"

class ItemDetail extends React.Component {

    constructor() {
        super()
        this.state = {
            num: 1,
            item: {},
            more_info: "",
            item_in_cart: 0,
            items: 0
        }
        this.componentWilMount = this.componentWillMount.bind(this)
        //this.getItemDetail = this.getItemDetail.bind(this)
        this.onChange = this.onChange.bind(this)
        this.backToMenu = this.backToMenu.bind(this)
        this.add = this.add.bind(this)
        this.delete = this.delete.bind(this)
        this.addToCart = this.addToCart.bind(this)
        this.pushToCart = this.pushToCart.bind(this)
        this.getItems = this.getItems.bind(this)
    }

    componentWillMount() {
        this.setState({ item: this.props.location.state.item })
        //this.getItemDetail()
        if (!window.localStorage.session_id) {
            this.setState({ item_in_cart: localStorage.item_in_cart });
        } else {
            this.getItems();
        }

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    /*
    getItemDetail() {
        fetch ('https://snacks-in-a-van.herokuapp.com/customer/menu/:' + this.state.item._id,{
            mode: 'cors',
            method : 'GET',
            headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            this.setState({item: response});							
        })
    }
    */

    backToMenu() {
        this.props.history.push({
            pathname: '/customer/menu'
        });
    }

    add() {
        this.setState({ num: (this.state.num + 1) })
    }

    delete() {
        if (this.state.num > 0) {
            this.setState({ num: (this.state.num - 1) })
        }
    }


    pushToCart() {
        this.props.history.push({
            pathname: '/customer/cart'
        });
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
                    // if log in, load the existing cart number
                    // else, using the local Storage find number of items in cart
                    localStorage.setItem('item_in_cart', this.state.items)
                    this.setState({ item_in_cart: localStorage.item_in_cart });
                } else {
                    alert(response.err_msg)
                    if (response.err_msg === "Invalid session id.") {
                        this.props.history.push({ pathname: '/customer/login' });
                    }
                }
            })
    }

    addToCart() {
        fetch('https://snacks-in-a-van.herokuapp.com/customer/cart/add', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                "session_id": localStorage.getItem('session_id'),
                "snack_id": this.state.item._id,
                "quantity": this.state.num,
                "instruction": this.state.more_info
            })
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                if (response.status === "Success") {
                    alert(response.status)
                } else {
                    alert(response.err_msg)
                    if (response.err_msg === "Invalid session id.") {
                        this.props.history.push({ pathname: '/customer/login' });
                    }
                }
            })
        // store the number of item in local storage
        localStorage.setItem('item_in_cart', parseInt(localStorage.item_in_cart) + this.state.num)
        this.setState({ item_in_cart: (parseInt(this.state.item_in_cart) + this.state.num) });
    }

    render() {

        return (
            <div className="item">
                <div className="title">
                    <button className="return-button" onClick={this.backToMenu}>
                        <i className="fa fa-chevron-left"></i>Back
                    </button>

                    <button className="cart-button" onClick={this.pushToCart}>
                        <i className="fa fa-shopping-cart"></i>
                        <i>{this.state.item_in_cart}</i>
                    </button>

                </div>

                <div className="content">
                    <img className="itemImage" src={this.state.item.img_path} alt="" />

                    <div className="text">
                        <div className="itemName">{this.state.item.name}</div>
                        <div className="buy">
                            <div className="price"><b>Price: </b>${this.state.item.price}</div>
                            <div className="add">
                                <button className="number-button" onClick={this.delete}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <div className="number">{this.state.num}</div>
                                <button className="number-button" onClick={this.add}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>

                        <div className="description">
                            <h3 className="item-des">Description</h3>
                            <div className="itemDescription">{this.state.item.description}</div>
                        </div>

                        <div className="moreInfo">
                            <h4 className="item-des">Enter your special requirement (if any)</h4>
                            <textarea type="moreInfo"
                                className="moreInfo"
                                name="more_info"
                                value={this.state.more_info}
                                onChange={this.onChange} />
                        </div>

                        <div className="proceed">
                            <button className="proceed-button" onClick={this.addToCart}>
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ItemDetail;