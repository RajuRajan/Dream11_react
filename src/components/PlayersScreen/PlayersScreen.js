import React, { Component } from 'react'
import { players } from '../Common/Common'

import './PlayersScreen.scss';
import avatar from '../../images/playerimg.png';
import Landing from '../Landing/Landing';

export default class PlayersScreen extends Component {

    constructor() {
        super()
        this.state = {
            index: ''
        }
    }


    componentWillMount() {


        var playerName = this.props.match.params.name;
        console.log(players[localStorage.getItem("m")][0])
        {
            players[localStorage.getItem("m")].map((value, index) => {
                if (value.name == playerName) {
                    this.setState({ index: index })
                }
            })
        }
    }

    render() {
        var local = localStorage.getItem("m");
        var playerset = players[local];

        return (


            <div>

                <div className="container-custom">

                    <div className="player-container">
                        <div className="player-left-container">
                            <header>PLAYER</header>

                            <div className="player-card">
                                <div className="player-img"><img src={playerset[this.state.index].playerimg}></img></div>
                                <div className="card-img">

                                    <div className="player-personnel">
                                        <div className="personnel-name" >
                                            {playerset[this.state.index].name}
                                        </div>
                                        <div className="horizontal-hr"></div>

                                        <div className="personnel-flex">
                                            <div className="sub-personnel">
                                                {playerset[this.state.index].rolebreif}
                                            </div>
                                            <div className="hr"></div>

                                            <div className="sub-personnel">
                                                {playerset[this.state.index].batting}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="country-container">
                                    <div className="flag">
                                        <img src={playerset[this.state.index].countryImg}></img>
                                    </div>
                                    <div>
                                        {playerset[this.state.index].country}
                                    </div>
                                </div>
                                <div className="player-board">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>STRIKE RATE</td>
                                                <td>{playerset[this.state.index].strikerate}</td>

                                            </tr>
                                            <tr>
                                                <td>AVERAGE</td>
                                                <td>{playerset[this.state.index].average}</td>

                                            </tr>

                                            <tr>
                                                <td>CENTURIES</td>
                                                <td>{playerset[this.state.index].hundreds}</td>

                                            </tr>
                                            <tr>
                                                <td>FIFFTY</td>
                                                <td>{playerset[this.state.index].fiffty}</td>

                                            </tr>
                                            <tr>
                                                <td>AGE</td>
                                                <td>{playerset[this.state.index].Age}</td>

                                            </tr>
                                            <tr>
                                                <td>DOB</td>
                                                <td>{playerset[this.state.index].Dob}</td>

                                            </tr>
                                            <tr>
                                                <td>YEARS OF EXP</td>
                                                <td>{playerset[this.state.index].yoe}</td>

                                            </tr>
                                            <tr>
                                                <td>TEST</td>
                                                <td>{playerset[this.state.index].test}</td>

                                            </tr>
                                            <tr>
                                                <td>ODI</td>
                                                <td>{playerset[this.state.index].odi}</td>

                                            </tr>
                                            <tr>
                                                <td>T20</td>
                                                <td>{playerset[this.state.index].t20}</td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                        <div className="right-container">
                            <Landing />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
