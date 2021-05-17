import React from 'react';
import "./style.css";
import "./order.css";
import {Button} from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css'
import {PageHeader, Collapse } from 'antd';
import 'antd/dist/antd.css'
import { CaretRightOutlined } from '@ant-design/icons';

class Order extends React.Component {

    constructor() {
        super()        
        this.state ={
            orders: []
        }
        
        this.componentWilMount = this.componentWillMount.bind(this)
		this.getOrder = this.getOrder.bind(this)
        this.pushToLogin = this.pushToLogin.bind(this)
        this.pushToMap = this.pushToMap.bind(this)
    }


    componentWillMount() {
        // check if the user has logged in
        if (!window.localStorage.session_id){
            alert("Please log in first")
            this.props.history.push({ pathname: '/customer/login'});
        }
        console.log(localStorage.getItem('session_id'))
        this.getOrder()
    }

    getOrder() {
        fetch ('https://snacks-in-a-van.herokuapp.com/customer/orders',{
            mode: 'cors',
            method : 'POST',
			headers :{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "session_id": localStorage.getItem('session_id')
            })
        }).then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then((response) => {
            if (response.status === "Success") {
                this.setState({ orders: response.orders });
                console.log(this.state.orders)
            } else {
                alert(response.err_msg)
                if (response.err_msg === "Invalid session id.") {
                    this.props.history.push({ pathname: '/customer/login'});
                }
            }
        })
    }		
      
    pushToMap() {
        this.props.history.push('/customer');
    }

    pushToLogin() {
        this.props.history.push(
            '/customer/login'
        );
    }

    render() {

        const { Panel } = Collapse;
        //console.log(this.state.orders,'this.state.orders')

        const orderPanel = this.state.orders.map((order)=>
            <Panel header={order.vendor.name} key={order._id} className="site-collapse-custom-panel">
                <p>time:{order.updatedAt}</p>
                <p>status:{order.status}</p>
                <p>{order.items.map((item)=><li>{item.snack.name} - qty:{item.quantity}  {item.instruction}</li>)}</p>
            </Panel>
        );
        
        return (
            <div style={{background:' #ffb167'}}>
               <PageHeader
                    //title={"Welcome"+ props.location.state.customer.givenName}
                    title="Welcome Order Page"
                    extra={[
                    //<Menu key="0" snacks={snacks} customer={props.location.state.customer.id}/>,
                        <Button variant="light" key="0"
                            onClick={this.pushToMap}>Back To Main Page</Button>
                    ]}>
                </PageHeader>

                <Collapse
                    bordered={false}
                    style={{background: '#ffdbb9'}}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    className="site-collapse-custom-collapse">
                    {orderPanel}
                </Collapse>,
        
            </div>
        )
    };   
}

export default Order;
