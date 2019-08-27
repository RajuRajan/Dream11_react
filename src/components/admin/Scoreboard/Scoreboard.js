import React, { Component } from 'react'
import './Scoreboard.scss'
import { players, matches } from '../../Common/Common'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Scoreboard extends Component {
    constructor() {
        super()
        {
            this.state = {
                over: 0.0,
                score: 0,
                wicket: 0,

                onfield: [],
                CP: [],
                CB: [],
                teamA: "",
                teamB: "",
                dum: '',
                player: [0, 0],
                playerScoreboard: [],
                playerindex: '',
                bowlerindex: '',
                playerflag: true,
                matchflag:false,
                bowlerflag: true,
                tournament:''
            }
        }
    }

    matchSelect(values) {
        this.setState({ onfield: players[values],matchflag:true })

        matches.map((value, index) => {
            if (value.match ==values) {
                this.setState({ teamA: value.teamA, teamB: value.teamB,tournament:values })
            }
        })

    }



    selectPlayer(index, playerRole) {
        if (this.state.playerflag) {


            this.state.CP.push(this.state.onfield[index])

            this.setState({ playerindex: index, playerflag: false })
            var select = document.getElementById(playerRole + index);

            select.classList.add("tr-selected")
        }
        else {
            let temp = this.state.onfield;
            temp[index].score = this.state.CP[0].score;
            this.setState({ onfield: temp, playerflag: true })
            var select = document.getElementById(playerRole + index);
            this.setState({ CP: [] })

            select.classList.remove("tr-selected")
        }
    }

    selectBowler(index, playerRole) {
        if (this.state.bowlerflag) {


            this.state.CB.push(this.state.onfield[index])

            this.setState({ bowlerindex: index, bowlerflag: false })

            var select = document.getElementById(playerRole + index);

            select.classList.add("tr-selected")
        }
        else {
            let temp = this.state.onfield;
            temp[index].wicket = this.state.CB[0].wicket;
            this.setState({ onfield: temp, bowlerflag: true })
            var select = document.getElementById(playerRole + index);

            select.classList.remove("tr-selected")
            this.setState({ CB: [] })
        }
    }

    update() {
        console.log(this.state.score)
        axios.post("http://localhost:8100/scoreUpdate/" +this.state.tournament + "/" + this.state.score + "/" + this.state.wicket + "/" +Math.round(this.state.over * 10) / 10).then(res =>
            console.log(res))
    }


    render() {
        console.log(this.state.onfield)

        var CPtemp = this.state.CP
        var CBtemp = this.state.CB
        console.log(this.state.playerScoreboard)

        var playerOnescore;

        console.log(CBtemp[0])

        return (

            <div>
                <div>
                    <select className="browser-default custom-select" onChange={(e) => { this.matchSelect(e.target.value) }}>
                        <option>Choose your option</option>
                        <option value="tournamentOne">Men's T20</option>
                        <option value="tournamentThree">Men's Qudrangular</option>
                        <option value="tournamentFour">Men's ODI</option>
                    </select>
                </div>

            
                <ToastContainer />

                {this.state.matchflag?(
                    <div>
                        <div className="hr"></div>
                <div className="flex">
                    
                <div className="flex" >
                    <select className="browser-default custom-select" onChange={(e) => { playerOnescore = e.target.value;  }}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    
                    <button onClick={() => {
                        CPtemp[0].score = parseInt(CPtemp[0].score) + parseInt(playerOnescore);

                        this.setState({ CP: CPtemp, score: this.state.score + parseInt(playerOnescore) })
                        if ((this.state.over * 10) % 10 == 6) {
                            this.setState({ over: this.state.over + 0.4 })
                        } else {
                            this.setState({ over: this.state.over + 0.1 })
                        }
                        this.update()
                    }}>+</button>
                </div>
               
                 
                    <div className="score-display">{this.state.score}/{this.state.wicket}<div>OVER={Math.round(this.state.over * 10) / 10}</div></div>


                    </div>
                    <div className="hr"></div>
          
                <div className="flex">
                    <div className="teamA-container">
                        <table >
                            <thead>
                                <tr>
                                    <td width="70px"></td>
                                    <td>PLAYERS</td>
                                    <td></td>
                                    <td>SCORE</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.onfield.map((value, index) => {
                                    if (value.role == "BAT" || value.role == "AR") {
                                        return (

                                            <tr id={value.role + index} className={value.flag === 1 ? "tr-selected" : ""} key={index}>

                                                <td width="70px"><img src={value.playerimg}></img></td>
                                                <td> <div className="player-name">{value.name}</div><div className="team-name">{value.team}</div></td>

                                                <td ><button key={index} onClick={() => this.selectPlayer(index, value.role)}>+</button></td>
                                                <td className="score">{this.state.onfield[index].score}</td>
                                            </tr>)
                                    }
                                })

                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="teamB-container">
                        <table >
                            <thead>
                                <tr>
                                    <td width="70px"></td>
                                    <td>BOWLERS</td>
                                    <td></td>
                                    <td></td>
                                    <td>WICKETS</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.onfield.map((value, index) => {
                                    if (value.role == "BOWL") {
                                        return (

                                            <tr id={value.role + index} className={value.flag === 1 ? "tr-selected" : ""} key={index}>

                                                <td width="70px"><img src={value.playerimg}></img></td>
                                                <td> <Link to={"/players/" + value.name}> <div className="player-name">{value.name}</div><div className="team-name">{value.team}</div></Link></td>

                                                <td ><button key={index} onClick={() => this.selectBowler(index, value.role)}>+</button></td>
                                                <td className="wicket-button" ><button key={index} onClick={() => {
                                                    console.log(CBtemp[0].wicket)
                                                    CBtemp[0].wicket = parseInt(CBtemp[0].wicket) + parseInt(1);
                                                    this.setState({ CB: CBtemp, wicket: this.state.wicket + 1 });
                                                    if ((this.state.over * 10) % 10 == 6) {
                                                        this.setState({ over: this.state.over + 0.4 })
                                                    } else {
                                                        this.setState({ over: this.state.over + 0.1 })
                                                    } this.update()
                                                }}>W</button></td>

                                                <td className="score">{this.state.onfield[index].wicket}</td>
                                            </tr>
                                        )
                                    }
                                })

                                }

                            </tbody>
                        </table>
                    </div>

                            </div>
                         </div>   ):""}
            </div>
        )
    }
}
