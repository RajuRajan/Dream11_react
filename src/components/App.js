import React, { Component } from 'react';
import Banner from '../components/Banner/Banner';
import Game from '../components/Game/Game'
import Signup from './Signup/Signup'
import Login from '../components/Login/Login'
import Squad from '../components/Bedding/Squad'
import Cricket from '../components/Game/Cricket/Cricket';
import ForgetPass from '../components/PasswordChange/ForgetPass'
import Dashboard from '../components/Dashboard/Dashbord'


import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';


import './App.scss'
import PlayersScreen from './PlayersScreen/PlayersScreen';
import Footer from './Footer/Footer';
import Profile from './Profile/Profile';
import PersonalDetails from './Profile/Personal/PersonalDetails';
import Log from './admin/Log/Log';
import AdminLogin from '../components/admin/Login/Login'
import AdminSignup from '../components/admin/Signup/Signup'

export default class App extends Component {
  render() {
    return (
      <div>
        
        <Router>
        <Route exact path="/admin" render={() =><Log/>} ></Route>  
        <Route exact path="/profile" render={() =><Profile/>} ></Route>
        <Route exact path="/personal" render={() =><PersonalDetails/>} ></Route>
        <Route exact path="/" render={() => <div><Banner /><Game game={Cricket} /></div>} ></Route>
          <Route exact path="/cricket" render={() => <div><Banner /><Game game={Cricket} /></div>} ></Route>
          <Route exact path="/dashboard" render={() => <div><Banner /><Game game={Dashboard} /></div> }></Route>

          <Route exact path="/squad" render={() => <div><Banner /><Game game={Squad} /></div>} ></Route>
          <Route exact path="/login" component={Login} ></Route>
          <Route exact path="/signup" component={Signup} ></Route>
          <Route exact path="/admin/login" component={AdminLogin} ></Route>
          <Route exact path="/admin/signup/:key" component={AdminSignup} ></Route>
          <Route exact path="/players/:name" component={PlayersScreen} ></Route>
          <Route exact path="/changePass/:email/:rand" component={ForgetPass} ></Route>
        
         
        </Router>
     
      </div>
    )
  }
}
