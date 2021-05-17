import React from 'react';
import { Nav } from 'react-bootstrap'
import "./style.css"
import "./menu.css"

class Menu extends React.Component {

    constructor() {
        super()
        this.state = {
            menu: [],
            login: false,
            item_in_cart: 0,
            items: 0
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.getMenu = this.getMenu.bind(this)
        this.pushToDetail = this.pushToDetail.bind(this)
        this.backToMap = this.backToMap.bind(this)
        this.pushToCart = this.pushToCart.bind(this)
        this.pushToOrder = this.pushToOrder.bind(this)
        this.logout = this.logout.bind(this)
        this.login = this.login.bind(this)
        this.getItems = this.getItems.bind(this)
    }

    componentDidMount() {
        this.getMenu();
        if (!window.localStorage.session_id) {
            this.setState({ login: false });
            this.setState({ item_in_cart: localStorage.item_in_cart });
        } else {
            this.setState({ login: true });
            this.getItems();
        }

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

    getMenu() {
        fetch('https://snacks-in-a-van.herokuapp.com/customer/menu', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                if (response.status === "Success") {
                    this.setState({ menu: response.menu });
                } else {
                    alert(response.status)
                }
            })
    }

    pushToDetail(item) {
        this.props.history.push({
            pathname: '/customer/itemDetail',
            state: { item: item }
        });
    }

    backToMap() {
        this.props.history.push({
            pathname: '/customer'
        });
    }

    pushToCart() {
        this.props.history.push({
            pathname: '/customer/cart'
        });
    }

    pushToOrder() {
        this.props.history.push({
            pathname: '/customer/order'
        });
    }

    logout() {
        localStorage.removeItem('session_id')
        alert("Logged out")
        this.setState({ login: false });
    }

    login() {
        this.props.history.push({
            pathname: '/customer/login'
        });
    }

    render() {

        const menuItems = this.state.menu.map((item) =>
            <div className="menuItem">
                <img className="menuImage" src={item.img_path} alt={item.img_path} />
                <div className="itemName">{item.name}</div>
                <div className="price">${item.price}</div>
                <button className="detail-button" onClick={() => this.pushToDetail(item)}>
                    detail<i className="fa fa-chevron-right"></i>
                </button>
            </div>
        );

        return (
            <div className="menu">
                <div className="title">
                    <button className="return-button" onClick={this.backToMap}>
                        <i className="fa fa-chevron-left"></i>Map
                    </button>


                    <Nav className="log-button">
                        {
                            (!this.state.login) ?
                                <button className="logout-button" onClick={this.login}>
                                    Log in<i className="fa fa-sign-in"></i>
                                </button>
                                :
                                <button className="logout-button" onClick={this.logout}>
                                    Log out<i className="fa fa-sign-out"></i>
                                </button>
                        }
                    </Nav>

                    <button className="order-button" onClick={this.pushToOrder}>
                        <i className="fa fa-clock-o"></i>
                    </button>
                    <button className="cart-button" onClick={this.pushToCart}>
                        <i className="fa fa-shopping-cart"></i>
                        <i>{this.state.item_in_cart}</i>
                    </button>
                </div>
                <div className="page">
                    MENU
                </div>
                {this.state.menu.length === 0 ?
                    <h2>Loading...</h2> : <></>}
                <div className="menuItems">{menuItems}</div>
            </div>
        )
    }
}

export default Menu;