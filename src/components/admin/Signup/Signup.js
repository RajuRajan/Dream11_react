import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.scss';
import GoogleLogin from 'react-google-login';
import axios, { post } from 'axios';


import jwt from 'jsonwebtoken';
import Landing from '../../Landing/Landing';



export default class Signup extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            mobile: '',
            otp: '',
            message: ''
        }

    }

    responseGoogle(response) {
        axios.post("http://localhost:8100/signup/googleSignup/" + response.profileObj.name + "/" + response.profileObj.googleId + "/" + response.profileObj.email).then(res => {
            toast.success("New User Creted Successfully", {
                position: toast.POSITION.TOP_CENTER
            });
            this.props.history.push('/login');

        })
    }

    signUp = () => {
        axios.post("http://localhost:8100/signup/" + this.state.email + "/" + this.state.password).then(res => {
            toast.success("New User Creted Successfully", {
                position: toast.POSITION.TOP_CENTER
            });
            this.props.history.push('/login');

        })
        this.setState({
            email: ' ',
            password: ' ',
            mobile: ' '
        })

    }


    generateOTP() {

        const rand = Math.floor(Math.random() * 10000);
        this.setState({ message: "sending otp......" })
        const token = jwt.sign({
            data: rand
        }, 'secret', { expiresIn: "60000" });
        localStorage.setItem("otp", token)  

        axios.post("http://localhost:8100/otp/" + rand + "/" + this.state.mobile).then(res => {
            this.setState({ message: "otp sent" })

        })

    }

    verifyOTP() {
        this.signUp()
        const otp = this.state.otp;
        let signUpFlag = false;
        jwt.verify(localStorage.getItem("otp"), 'secret', function (err, decoded) {
            if (err) {
                console.log("expired")
            }
            else {
                console.log(decoded.data)
                if (decoded.data == otp) {
                    toast.success("Otp Verified !", {
                        position: toast.POSITION.TOP_CENTER
                    });

                    signUpFlag = true;
                }
                else {
                    toast.error("Check OTP !", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            }
        });
        if (signUpFlag) {
            this.signUp()
        }

    }


    formHandler = (event) => {


        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        return (
            <div>
                <ToastContainer />
                <div>
                    <div className="container-custom">

                        <div className="signup-container">
                            <div className="signup-left-container">
                                <header>Register</header>

                                <div className="signup-card">
                                    <div className="textfield">
                                        <div className="google-signup"> <GoogleLogin
                                            clientId="242872458901-i44o8dga2ts4407slgnr09odqbujjl2f.apps.googleusercontent.com"
                                            buttonText="Signup"
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        />  </div>

                                        <form onSubmit={(e) => e.preventDefault()}>
                                            <div><label>Enter your Email: </label> <input type="text" name="email" required onChange={(e) => this.formHandler(e)} value={this.state.email}></input></div>
                                            <div><label>Password:</label><input type="text" name="password" required onChange={(e) => this.formHandler(e)} value={this.state.password}></input></div>


                                            <div className="signup-btn"><button data-toggle="modal" data-target="#myModal">Proceed</button></div>
                                            <div className="container">

                                                <div className="modal" id="myModal">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">


                                                            <div className="modal-header">
                                                                <h4 className="modal-title">Mobile Verification</h4>
                                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                            </div>


                                                            <div className="modal-body">
                                                                <div><label>Mobile No.</label><input type="text" name="mobile" required onChange={(e) => this.formHandler(e)} value={this.state.mobile}></input>
                                                                    <button className="btn-primary" onClick={() => this.generateOTP()}>Generate OTP</button>
                                                                    <span id="otp message">{this.state.message}</span>
                                                                </div>


                                                                <div><label>Enter Otp</label></div> <input type="text" name="otp" onChange={(e) => this.formHandler(e)} value={this.state.otp}></input>
                                                                <div className="signup-btn" onClick={() => this.verifyOTP()}><button name="success-signup">Proceed</button></div>

                                                            </div>


                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </form>

                                    </div>

                                </div>

                                <div className="register-link">
                                    created an account? <a href="/login">Login</a>
                                </div>

                            </div>
                            <div className="right-container">
                                <Landing />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
