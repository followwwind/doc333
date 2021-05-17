import React from 'react';
import "./style.css"
import "./van.css"

class Van extends React.Component {

    constructor() {
        super()
        this.state = {
            van: {}
        }

        this.backToMap = this.backToMap.bind(this)
        this.pushToMenu = this.pushToMenu.bind(this)
    }

    componentWillMount() {
        //this.setState({van: this.props.location.state.van})
        this.state.van = this.props.location.state.van
    }

    backToMap() {
        this.props.history.push({
            pathname: '/customer',
        });
    }

    pushToMenu() {
        localStorage.setItem("vendor_id", this.state.van.vendor_id) 
        if (window.localStorage.session_id){
            fetch('https://snacks-in-a-van.herokuapp.com/customer/cart/set_vendor/', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "session_id": localStorage.getItem('session_id'),
                    "vendor_id": this.state.van.vendor_id
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {
                if (response.status !== "Success") {
                    alert(response.err_msg)
                    if (response.err_msg === "Invalid session id.") {
                        this.props.history.push({ pathname: '/customer/login'});
                    }
                }
            })
        }
        this.props.history.push({
            pathname: '/customer/menu'
        });
    }

    render() {

        return (
            <div className="van">
                <div className="title">
                    <button className="return-button" onClick={this.backToMap}>
                        <i className="fa fa-chevron-left"></i>Map
                    </button>
                </div>

                <div className="van-item">
                    <i className="fa fa-truck fa-4x"></i>
                    <div className="info">
                        <div className="name">Name: {this.state.van.vendor_name}</div>
                        <div className="distance">distance: {this.state.van.distance}m</div>
                    </div>
                </div>

                {(this.state.van.van_location.description === null) ? <div></div> :
                    <>
                        <div className="block">
                            <i className="fa fa-info-circle fa-2x"></i>
                            <div className="description">
                                <div className="name">Description</div>
                                <div className="description">{this.state.van.van_location.description}</div>
                            </div>
                        </div>
                        <div className="line"></div>
                    </>
                }

                <button className="proceed-button" onClick={this.pushToMenu}>
                    Start Order
                </button>
            </div>
        )  
    }  
}

export default Van;