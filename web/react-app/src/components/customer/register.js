import React from 'react';
import "./style.css"
import "./login.css"
import bcrypt from 'bcryptjs';

class Register extends React.Component {

    constructor() {
        super()
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        }

        this.componentWilMount = this.componentWillMount.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.backToLogin = this.backToLogin.bind(this)
    }

    componentWillMount() {
        // check if the user has logged in
        if (window.localStorage.session_id){
			this.props.history.push({ pathname: '/customer'});
		}
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()
        if (this.state.email !== '' && this.state.password !== ''){
            fetch ('https://snacks-in-a-van.herokuapp.com/customer/auth/register/',{
                mode: 'cors',
                method : 'POST',
                headers :{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    "email": this.state.email,
                    "password": bcrypt.hashSync(this.state.password),
                    "firstname": this.state.firstname,
                    "lastname": this.state.lastname,
                    "dob": "2000-01-02"
                })
            }).then(response => response.json())
            .catch(error => console.error('Error:', error))
            .then((response) => {	
                console.log(response)	
                if (response.status === "Success") {
                    alert(response.status)
                    localStorage.setItem("session_id", response.session_id)
                    this.props.history.push({pathname: '/customer/login'});
                } else {
                    alert(response.err_msg)
                }	
            })
        }
    }

    backToLogin() {
        this.props.history.push({
            pathname: '/customer/login',
        });
    }

    render() {
        return (
            <div className="register">                         
                <div className="title">
                    <button className="return-button" onClick={this.backToLogin}>
                        <i className="fa fa-chevron-left"></i>Back
                    </button>
                </div>

                <div className="form">
                    <div className="form-group">
                        <div>Given Name</div>
                        <input type="firstname"
                            name="firstname"
                            className="firstname"
                            placeholder=""
                            value={this.state.firstname}
                            onChange={this.onChange} />
                    </div>

                    <div className="form-group">
                        <div>Family Name</div>
                        <input type="lastname"
                            name="lastname"
                            className="lastname"
                            placeholder=""
                            value={this.state.lastname}
                            onChange={this.onChange} />
                    </div>

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

                <button className="register-button" onClick={this.onSubmit}>
                    Sign Up
                </button>
            </div>
        )  
    }  
}

export default Register;