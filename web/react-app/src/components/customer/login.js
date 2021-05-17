import React from 'react';
import "./style.css"
import "./login.css"
import bcrypt from 'bcryptjs';

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            from: false,
            email: '',
            password: ''
        }

        this.componentWilMount = this.componentWillMount.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.signUp = this.signUp.bind(this)
        this.backHome = this.backHome.bind(this)
    }

    componentWillMount() {
        // log out the previous user account
        localStorage.removeItem("session_id");
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        if (this.state.email !== '' && this.state.password !== ''){
            fetch ('https://snacks-in-a-van.herokuapp.com/customer/auth/login/',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "email": this.state.email,
                    "password": this.state.password,
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {	
                console.log(response)	
                if (response.status === "Success") {
                    alert(response.status)
                    localStorage.setItem("session_id", response.session_id)
                    if (window.localStorage.vendor_id){
                        fetch('https://snacks-in-a-van.herokuapp.com/customer/cart/set_vendor/', {
                            mode: 'cors',
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "session_id": localStorage.getItem('session_id'),
                                "vendor_id": localStorage.getItem('vendor_id')
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
                    this.props.history.goBack()
                } else {
                    alert(response.err_msg)
                }	
            })
        }
    }

    signUp() {
        localStorage.removeItem("session_id");
        this.props.history.push({
            pathname: '/customer/register',
        });
    }

    backHome() {
        this.props.history.push({
            pathname: '/customer'
        });
    }

    render() {
        return (
            <div className="login">
                <div className="title">
                    <button className="return-button" onClick={this.backHome}>
                        <i className="fa fa-chevron-left"></i>Back
                    </button>
                </div>

                <div className="form">    
                    <div className="form-group">
                        <div>Email</div>
                        <input type="email"
                            name="email"
                            className="email"
                            placeholder=""
                            value={this.state.email}
                            onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <div>Password</div>
                        <input type="password"
                            name="password"
                            placeholder=""
                            value={this.state.password}
                            onChange={this.onChange} />
                    </div>
                </div>    

                <button className="login-button" onClick={this.onSubmit}>
                    Login
                </button>

                <div className="signup">
                    Don't have an account?
                    <button className="signup-button" onClick={this.signUp}>Sign up</button>
                    now
                </div>
            </div>
        )  
    }  
}

export default Login;