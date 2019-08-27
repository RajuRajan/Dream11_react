import React, { Component } from 'react'

import './PersonalDetails.scss'
import Landing from '../../Landing/Landing';
import axios from 'axios';

export default class PersonalDetails extends Component {
    constructor(){
        super()
        this.state={
            data:{
                Name:"O",
                Email:"",
                Password:"",
                StateOfResidence:"",
                Gender:""

            }
        }
    }
    componentWillMount(){
        axios.post("http://localhost:8100/getUserDetail/"+localStorage.getItem("id")).then(res=>{
            
            this.setState({data:
              {  
                Name:res.data.Name,
                Email:res.data.Email,
                Password:res.data.Password,
                StateOfResidence:res.data.StateOfResidence,
                Gender:res.data.Gender

            
            }})
           

        })
    }
    handler=(e)=>{
        this.setState({
            data:{[e.target.name]:e.target.value}
        })
       
    }
    Update=()=>{
        var obj={
            Name:this.state.data.Name,    
            Password:this.state.data.Password,
            StateOfResidence:this.state.data.StateOfResidence,
            Gender:this.state.data.Gender

        }
        axios.post("http://localhost:8100/update/"+localStorage.getItem("id"),obj).then(res=>{
          
            this.setState({data:res.data})
        })

    }
    render() {
        console.log(this.state)
        return (
            <div>
                <div className="container-custom">

                    <div className="player-container">
                        <div className="player-left-container">
                            <header>PERSONAL DETAILS</header>
                            <div className="player-card">
                                
                                <div className="textfield">
                                    <div><label>Name </label><input type="text" value={this.state.data.Name} name="Name" onChange={(e)=>this.handler(e)}></input></div>
                                    <div><label>Email</label><input type="text" value={this.state.data.Email} name="Email" disabled onChange={(e)=>this.handler(e)}></input></div>
                                    <div><label>Password </label><input type="password" value={this.state.data.Password} name="Password" onChange={(e)=>this.handler(e)}></input></div>
                                    <div><label>State of Residence </label><input type="text" value={this.state.data.StateOfResidence} name="StateOfResidence" onChange={(e)=>this.handler(e)}></input></div>
                                    <div><label>Gender </label><input type="text"  value={this.state.data.Gender} name="Gender" onChange={(e)=>this.handler(e)} name="Gender"></input></div>
                                </div>
                                <div><button onClick={()=>this.Update()}>Save</button></div>
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
