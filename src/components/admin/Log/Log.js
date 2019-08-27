import React, { Component } from 'react'
import './Log.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { matches } from '../../Common/Common'
import Scoreboard from '../Scoreboard/Scoreboard';

export default class Log extends Component {
    constructor() {
        super()
        this.state = {
            userdata: ""
        }
    }
    componentWillMount() {
        axios.post("http://localhost:8100/adminUserDetail").then(res => {
           
            this.setState({ userdata: res.data })
            document.getElementById("User").style.display = "block";
           
        })
    }
    changeTab = (option, index) => {
        localStorage.setItem("tabindex", index)
        this.toggleLayoutMenu(index, option);
        this.setState({
            tabOption: option
        });

    }
    toggleLayoutMenu(n, option) {
        var i;
        let nav = document.querySelectorAll(".tabs .col-1");
        for (i = 0; i < nav.length; i++) {
            nav[i].classList.remove("tab_picked");
        }
        var x = document.getElementsByClassName("tab");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }

        document.getElementById(option).style.display = "block";

        nav[n].classList.add("tab_picked");
    }
    render() {
      
        return (
            <div className="log-container">
                <header>ADMIN PAGE</header>

                <div className="log-window">

                    <div className="row">
                        <div className="col-2">
                            <h2>Logs</h2>

                        </div>
                        <div className="col-1">
                            <button>COPY</button>

                        </div>
                        <div className="col-1">
                            <button>CSV</button>

                        </div>
                        <div className="col-1">
                            <button>EXCEL</button>

                        </div>
                        <div className="col-1">
                            <button>PDF</button>

                        </div>

                    </div>
                    <div className="row tabs">
                        <div className="col-1 tab_picked" onClick={() => this.changeTab("User", 0)}>USER</div>
                        <div className="col-1" onClick={() => this.changeTab("Match", 1)}>MATCHES</div>                        
                        <div className="col-1" onClick={() => this.changeTab("Scoreboard", 2)}>SCOREBOARD</div>
                    </div>
                    <div id="User" className="tab">
                        <table>
                            <thead>
                                <tr>
                                    <td>TIME</td>
                                    <td>USER NAME</td>
                                    <td>USER ID</td>
                                    <td>RESIDENCE</td>
                                    <td>GENDER</td>
                                </tr>
                            </thead>
                            <tbody>{this.state.userdata !== "" ? (
                                this.state.userdata.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.CreatedAt}</td>
                                            <td>{value.Name}</td>
                                            <td>{value.ID}</td>
                                            <td>{value.StateOfResidence}</td>
                                            <td>{value.Gender}</td>
                                        </tr>
                                    )
                                })
                            ) : ""}</tbody>
                        </table>
                    </div>
                    <div id="Match" className="tab">

                        <table>
                            <thead>
                                <tr>
                                    <td>TEAM A</td>
                                    <td>TEAM B</td>
                                    <td>WINNING STATUS</td>
                                    <td>MATCH</td>

                                </tr>
                            </thead>
                            <tbody>{Object.keys(matches) !== undefined ? (
                                Object.keys(matches).map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{matches[value].teamA}</td>
                                            <td>{matches[value].teamB}</td>
                                            <td>{matches[value].winningstatus}</td>
                                            <td>{matches[value].match}</td>


                                        </tr>
                                    )

                                })
                            ) : ""}</tbody>
                        </table>

                    </div>
                    <div id="Scoreboard" className="tab">
                            <Scoreboard/>
                      
                    </div>
                </div>


            </div>
        )
    }
}
