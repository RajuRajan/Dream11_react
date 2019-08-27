import React, { Component } from 'react'
import '../../Common/Common.scss'
import './Login.scss';
import axios, { post } from 'axios';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import GoogleLogin from 'react-google-login';
import Landing from '../../Landing/Landing';

export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loginstatus:''

        }
    }

    responseGoogle = (response) => {

        axios.post("http://localhost:8100/googleLogin/" + response.profileObj.name + "/" + response.profileObj.email).then(res => {
          

            if (res.data.Password!=="" &&res.data.Password === response.profileObj.googleId) {
                toast.success("Login Successfull", {
                    position: toast.POSITION.TOP_CENTER
                  });
                this.props.history.push('/');
                localStorage.setItem("LoginStatus", this.state.loginstatus)
                localStorage.setItem("id", res.data.ID)
            }
           else{
            toast.error("Account Not found", {
                position: toast.POSITION.TOP_CENTER
              });
           }
        })
    }

    formHandler = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

  
  
    Login=()=>{

      const passwordValidate=this.state.password;
      console.log("hello")
        axios.post("http://localhost:8100/login/" + this.state.email).then(res => {
           
          if(res.data.Email!=="")
          {         
             if(res.data.Password===passwordValidate)
             {
                toast.success("Login Successfull", {
                    position: toast.POSITION.TOP_CENTER
                  });
                localStorage.setItem("id",res.data.ID)
              
                this.props.history.push('/');
                localStorage.setItem("LoginStatus",this.state.loginstatus)
             }
             else{
                console.log("check")
             }
          }
          else{
            toast.error("Account Not found", {
                position: toast.POSITION.TOP_CENTER
              });
          }
        })
            
        this.setState({
            email: '',
            password: '',
        })
    }

    mail=()=>{
        const rand=Math.floor(Math.random() * 1000000000);  
        const jwt = require('jwt-simple');  
          
        const token=jwt.encode(rand,"secret-code")
        localStorage.setItem("rand",token)
        axios.post("http://localhost:8100/mail/" + this.state.email+"/"+rand).then(res => {
           
            alert("Mail Sent")   
           
        }) 

    }
    componentWillMount(){
        const jwt = require('jwt-simple');
        const payload ="LoggedIn";
        const secret = 'secret-code';
        const loginStatus = jwt.encode(payload, secret);
        this.setState({loginstatus:loginStatus}) 
    }


    render() {
      
        return (
            <div>
                  <ToastContainer/>
                <div className="container-custom">

                    <div className="login-container">
                        <div className="login-left-container">
                            <header>login</header>
                            <form  onSubmit={(e) => { e.preventDefault(); this.Login() }} >
                                <div className="login-card">
                                    <div className="textfield">
                                        <div className="google-login">  <GoogleLogin
                                            clientId="242872458901-i44o8dga2ts4407slgnr09odqbujjl2f.apps.googleusercontent.com"
                                            buttonText="LOGIN"
                                            onSuccess={this.responseGoogle}
                                            onFailure={this.responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                        /></div>

                                        <div><label>Enter your Email: </label> <input type="text" name="email" required onChange={(e) => this.formHandler(e)} value={this.state.email}></input></div>
                                        <div><label>Password:</label><input type="text" name="password" required onChange={(e) => this.formHandler(e)} value={this.state.password}></input></div>
                                       

                                 
                                                   
                                            <div className="forget-password" data-toggle="modal" data-target="#myModal">forget password?</div>
                                            
                                      



                                    </div>
                                    <div className="login-btn"><button >Proceed</button></div>

                                </div> </form>
                                <div className="modal fade" id="myModal" role="dialog">
                                                <div className="modal-dialog">
                                                
                                              
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        Forget Password
                                                    </div>
                                                    <div className="modal-body">
                                                     <div><label>Enter your Email: </label> <input type="text" name="email" required onChange={(e) => this.formHandler(e)} value={this.state.email}></input></div>
                                                    </div>
                                                    <div className="modal-footer">
                                                    <div className="login-btn"><button onClick={()=>this.mail()}>Send Mail</button></div>
                                                   
                                                    </div>
                                                </div>
                                                
                                                </div>
                                            </div>
                            <div className="register-link">
                                Not a Member? <a href="/signup">Register</a>
                            </div>

                        </div>
                        <div className="right-container">
                       <Landing/>
                       </div>
                    </div>

                </div>
            </div>
        )
    }
}
