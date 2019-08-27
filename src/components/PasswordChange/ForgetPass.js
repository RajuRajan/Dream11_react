import React, { Component } from 'react'
import '../Common/Common.scss'
import '../Login/Login.scss';
import axios, { post, put } from 'axios';

import Landing from '../Landing/Landing';


export default class ForgetPass extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loginstatus: true,

        }
    }
    formHandler = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    Login = () => {
        axios.post("http://localhost:8100/UpdatePassword/" + this.props.match.params.email + "/" + this.state.password).then(res => {
            alert("password Changed")
            this.props.history.push('/');
        })

        this.setState({
            email: '',
            password: '',
        })
    }


    render() {
        const jwt = require('jwt-simple');
        const keyGenerated = jwt.decode(localStorage.getItem("rand"), "secret-code")
        console.log(keyGenerated)

        if (keyGenerated == this.props.match.params.rand) {
            return (
                <div>
                    <div className="container-custom">

                        <div className="login-container">
                            <div className="login-left-container">
                                <header>Change Password</header>
                                <form onSubmit={(e) => { e.preventDefault(); this.Login() }} >
                                    <div className="login-card">
                                        <div className="textfield">

                                            <div><label>New Password:</label><input type="text" name="password" required onChange={(e) => this.formHandler(e)} value={this.state.password}></input></div>
                                        </div>
                                        <div className="login-btn"><button>Submit</button></div>

                                    </div> </form>


                            </div>
                            <div className="right-container">
                                <Landing />
                            </div>
                        </div>

                    </div>
                </div>
            )


        }
        else {
            return (<p>page not found</p>)
        }
    }
}
