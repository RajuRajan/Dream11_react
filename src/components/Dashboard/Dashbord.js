import React, { Component } from 'react'
import '../Dashboard/Dashboard.scss'

import axios from 'axios'

export default class Dashbord extends Component {
    constructor(){
        super()
        this.state={
            matches:null
        }
    }

    componentWillMount(){
        axios.post("http://localhost:8100/getbetted/"+localStorage.getItem("id")).then(res => {
                   var resp=res.data;
                    this.setState({matches:resp,})             
               })
              
    }

    render() {
        var matchList=this.state.matches
        return (
            
            <div >
                <h2>Betted Matches</h2>

                {matchList!==null?(matchList.map((matchesValue, index) => {
                        
                                        return (
                                            <div className="bet-card" key={index}>

                                                <div> {JSON.parse(matchesValue.Bettedmatch).teamA}</div>


                                                <div>
                                                    <img src= {JSON.parse(matchesValue.Bettedmatch).teamAimg} />
                                                </div>
                                                <div>
                                                    vs
                                             </div>
                                                <div>
                                                    <img src= {JSON.parse(matchesValue.Bettedmatch).teamBimg} />
                                                </div>
                                                <div> {JSON.parse(matchesValue.Bettedmatch).teamB}</div>
                                                {JSON.parse(matchesValue.Bettedmatch).winningstatus=="won"?(
                                                    <div className="match-status-won">{JSON.parse(matchesValue.Bettedmatch).winningstatus}</div>
                                                ):(
                                                    <div className="match-status-current">{JSON.parse(matchesValue.Bettedmatch).winningstatus}</div>
                                                    )
                                                }
                                                 
                                            </div>
                                        )

                    })):""
                }

            </div>
        )
    }
}
