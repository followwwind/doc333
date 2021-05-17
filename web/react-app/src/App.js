//import logo from './logo.svg';
import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Van from './components/customer/van.js'
import Menu from './components/customer/menu.js'
import ItemDetail from './components/customer/itemDetail.js'
import Map from './components/customer/map.js'
import Cart from './components/customer/cart.js'
import Checkout from './components/customer/checkout.js'
import Login from './components/customer/login.js'
import Register from './components/customer/register.js'
import Order from './components/customer/order.js'
import Animation from './components/customer/animation.js'
import Payment from './components/customer/payment.js'
import 'font-awesome/css/font-awesome.min.css'

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Router>            

        <div className="App">
        
            <div className="container">
                    <Route exact path="/customer" component={Map} />
                    <Route exact path="/customer/van" component={Van} />
                    <Route exact path="/customer/menu" component={Menu} />
                    <Route exact path="/customer/itemDetail" component={ItemDetail} /> 
                    <Route exact path="/customer/cart" component={Cart} />
                    <Route exact path="/customer/checkout" component={Checkout} />
                    <Route exact path="/customer/login" component={Login} />  
                    <Route exact path="/customer/register" component={Register} />
                    <Route exact path="/customer/order" component={Order} />
                    <Route exact path="/customer/animation" component={Animation} />
                    <Route exact path="/customer/payment" component={Payment} />
            </div>            
        </div>

        </Router>
    );
  }

}

export default App;