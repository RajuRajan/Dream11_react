import React, { Component } from 'react';
import '../Common/Common.scss';


import logo from '../../images/logo.png';
import dhoni from '../../images/dhoni.png';
import icc from '../../images/icc_logo.png';
import download from '../../images/download.png'

import './Banner.scss';
export default class Banner extends Component {

    componentWillMount(){
        const jwt = require('jwt-simple');
        const payload =localStorage.getItem("LoginStatus");
       
        if(payload!=null){
        const secret = 'secret-code';
        const loginStatus = jwt.decode(payload, secret);
        this.setState({loginstatus:loginStatus})
        }
        else{
            this.setState({loginstatus:"false"})
        }
        
    }
    render() {
        return (
            <div className="banner-container">
                <header>
                    <div className="container-custom flex">
                            <div className="logo_box"><img src={logo}></img></div>
                            <div className="right_user_info">
                                <ul>
                                    <li className="hide_in_mobile">
                                        <span>Have a Referral Code? </span>
                                        <a href="https://dream11.onelink.me/AxsD?pid=organiclandingpage&amp;c=playstore&amp;af_adset=mobileweb">Download App</a>
                                    </li>
                                    <li className="login login_register">
                                   <a href="/profile"> PROFILE</a>
                                    </li>
                                    <li className="login login_register">
                                        
                                        {this.state.loginstatus!=="LoggedIn"?(<a href="/login">LOGIN</a>)
                                    :<div onClick={()=>localStorage.clear()}><a href="/">LOGOUT</a></div>}
                                    </li>
                                   
                                </ul>
                            </div>
                    </div>
                </header>
                <div className="banner">
                        <div className="container-custom flex-inner">
                            <div className="banner-content-left"><img src={dhoni}></img></div>
                            <div className="banner-content-middle">
                                <div className="icc-logo">
                                    <img src={icc}></img>
                                </div>
                                <div >
                               Indias Biggest Sports Game
                                </div>
                                <div className="download-app">
                                  <a href="https://dream11.onelink.me/AxsD?pid=organiclandingpage&amp;c=playstore&amp;af_adset=mobileweb">  <img src={download}/></a>
                                </div>
                                <div className="playnow">
                                <a href="https://www.dream11.com/leagues" id="lets_play_button">Play Now</a>
                                </div>
                            </div>
                            <div className="banner-content-right"></div>
                         
                        </div>
                </div>
            </div>
        )
    }
}
