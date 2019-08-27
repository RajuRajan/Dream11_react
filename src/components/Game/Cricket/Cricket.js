import React, { Component } from 'react'
import { matches } from '../../Common/Common'
import './Cricket.scss'
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import Banner from '../../Banner/Banner'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
class Cricket extends Component {
    constructor() {
        super()
        this.state = {
            matchesList: ""
        }
    }

    passTouranamentName(tournament, index) {
        localStorage.setItem('m', tournament);
        localStorage.setItem('m_index', index);

        localStorage.setItem("matchDetail", JSON.stringify(matches[index]))
    }

    componentWillMount() {

        const jwt = require('jwt-simple');

        const secret = 'secret-code';
        if (localStorage.getItem("LoginStatus") != undefined) {
            const loginStatus = jwt.decode(localStorage.getItem("LoginStatus"), secret);


            if (loginStatus == "LoggedIn") {
               
                var obj = {
                    Match: JSON.stringify(matches),
                    Userid: localStorage.getItem("id")
                }

                var link = "http://localhost:8100/match"
                axios.post(link, obj).then(res => {
                   
                      
                    this.setState({ matchesList: JSON.parse(res.data.Match) })
                })
               
            }

        }
        else {
            this.setState({ matchesList: matches })
        }
    }

    render() {
       const matches=this.state.matchesList
      
        return (
            <div>
                <div className="row">

                    {this.state.matchesList != "" ? (
                        this.state.matchesList.map((value, index) => {

                            if (!value.betted) {
                                return (

                                    <Link to="/squad" key={index}><div className="col-4" onClick={() => this.passTouranamentName(value.match, index)}>
                                        <div className="card">
                                            <div className="card-header-match">Men's Quadrangular</div>
                                            <div className="card-body">
                                                <div className="card-left-content">
                                                    <div>
                                                        <img src={value.teamAimg} />
                                                    </div>
                                                    <div className="team-name-container">
                                                        <div className="team-name">
                                                            {value.teamA}
                                                        </div>
                                                        <div>
                                                            {value.teamA}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-right-content">
                                                    <div className="team-name-container">
                                                        <div className="team-name">
                                                            {value.teamB}
                                                        </div>
                                                        <div>
                                                            {value.teamB}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <img src={value.teamBimg} />
                                                    </div>

                                                </div>
                                               
                                            </div>
                                            <div className="card-footer">
                                                 <div>Win {value.winningcash}</div>
                                                 <div>{value.bettingcash}</div>
                                            </div>
                                         
                                        </div>
                                    </div>
                                    </Link>

                                )
                            }

                        })) : ""
                    }
                </div>
                <div className="row">
                    <div className="col-5"></div>
                    <div className="col-7 load-more">
                        More matches
                            </div>
                </div>

            </div>
        )
    }
}
export default withRouter(Cricket);