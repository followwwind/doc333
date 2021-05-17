import React from 'react';
import { Nav } from 'react-bootstrap'
import "./style.css"
import "./map.css"

class Map extends React.Component {

    constructor() {
        super()
        this.state = {
            vans: [],
            login: false,
            item_in_cart: 0,
            items: 0

        }

        this.componentWilMount = this.componentWillMount.bind(this)
        this.getVans = this.getVans.bind(this)
        this.pushToVan = this.pushToVan.bind(this)
        this.pushToCart = this.pushToCart.bind(this)
        this.pushToOrder = this.pushToOrder.bind(this)
        this.logout = this.logout.bind(this)
        this.login = this.login.bind(this)
        this.getItems = this.getItems.bind(this)
    }

    componentWillMount() {
        localStorage.removeItem("vendor_id")
        this.getVans();
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

    getVans() {
        fetch('https://snacks-in-a-van.herokuapp.com/customer/vans/', {
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
                    // label the key of each van
                    // for (var i = 0; i < response.vans.length; i++) {
                    //     response.vans[i].key = i + 1;
                    //     if (response.vans[i].van_location.description === null) {
                    //         response.vans[i].van_location.distance = 0
                    //     }
                    // }
                    this.setState({ vans: response.vans });
                    console.log(this.state.vans)
                } else {
                    alert(response.status)
                }
            })
    }

    pushToVan(van) {
        console.log(van)
        this.props.history.push({
            pathname: '/customer/van',
            state: { van: van }
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
        const vanItems = this.state.vans.map((van) =>
            <div className="van-item" onClick={() => this.pushToVan(van)}>
                <i className="fa fa-truck fa-3x" />
                <div className="name">{van.vendor_name}</div>
                <div className="distance">0m</div>
            </div>
        );

        return (
            <div className="map">
                <div className="top-bar">
                    <div className="nav-bar">
                        <button className="icon-btns left-icon-btns" onClick={this.showLocation}>
                            Home
                            <i className="fa fa-home"></i>
                        </button>
                        <div className="right-nav">
                            <button className="icon-btns right-icon-btns" onClick={this.login}>
                                {this.state.login ? "Log out" : "Log in"}
                                <i className={this.state.login ? "fa fa-sign-out" : "fa fa-sign-out"} />
                            </button>
                            <button className="icon-btns right-icon-btns" onClick={this.pushToOrder}>
                                Orders
                                <i className="fa fa-clock-o"></i>
                            </button>
                            <button className="icon-btns right-icon-btns" onClick={this.pushToCart}>
                                Cart ({this.state.item_in_cart})
                                <i className="fa fa-shopping-cart" />
                            </button>
                        </div>
                    </div>
                    <div className="title">
                        Nearby Vans
                    </div>
                </div>

                <div className="googleMap"></div>
                <div className="van-wrapper">
                    {this.state.vans.length === 0 ?
                        <h2>Loading...</h2> : <></>}
                    {vanItems}
                </div>
            </div>
        )
    }
}

export default Map;