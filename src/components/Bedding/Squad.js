import React, { Component } from 'react'
import './Squad.scss'
import '../Common/Common.scss'
import versus from '../../images/versus.jpeg'
import { players, squadContainers, matches } from '../Common/Common'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



class Squad extends Component {

    constructor() {
        super();
        this.state = {
            tabOption: "WK",
            players: '',
            playersSelected: [],
            tournament: '',
            noOfPlayers: 0,
            buttonContent: "+",
            credit: 100,
            betFlag: false,
            score:0,
            wicket:0,
            over:0,
            dum:''
        }

    }
     data={
         Score:0,
         Wicket:0,
         Over:0
     };

    componentWillMount() {
        this.setState({ tournament: localStorage.getItem('m') })

        players[localStorage.getItem('m')].map((value, index) => {
            value.flag = 0;
        })

        const jwt = require('jwt-simple');
        const payload = localStorage.getItem("LoginStatus");


        if (payload != null) {
            const secret = 'secret-code';
            const loginStatus = jwt.decode(payload, secret);
            this.setState({ loginstatus: loginStatus })
        }
        else {
            this.setState({ loginstatus: "false" })
        }

    }

    componentDidMount () {
        this.call();
    }
    selectPlayer = (playerName, point, credit, playerRole, index) => {
        const hold = players[this.state.tournament][index];
        if ((this.state.credit - hold.credits > 0 || hold.flag === 1) && this.state.noOfPlayers < 11) {

            if (hold.flag !== 1) {
                const details = {
                    name: playerName,
                    points: point,
                    credits: credit,
                    role: playerRole
                }

                this.state.playersSelected.push(details)
                this.setState({ noOfPlayers: this.state.noOfPlayers + 1, credit: this.state.credit - hold.credits })
                hold.flag = 1;

                    var select = document.getElementById(playerRole + index);

                    select.classList.add("tr-selected")
            }
            else {
                hold.flag = 0;
                this.setState({ noOfPlayers: this.state.noOfPlayers - 1, credit: this.state.credit + hold.credits })

                var select = document.getElementById(playerRole + index);
                select.classList.remove("tr-selected")
            }

            this.setState({ players: '' })
        }
        else {
            toast.error("Criteria Falls Above !", {
                position: toast.POSITION.TOP_LEFT
            });
        }
    }


    changeTab = (option, index) => {
        this.toggleLayoutMenu(index);
        this.setState({
            tabOption: option
        });

    }
    toggleLayoutMenu(n) {
        var i;
        let nav = document.querySelectorAll(".col-3");
        for (i = 0; i < nav.length; i++) {
            nav[i].classList.remove("tab_picked");
        }

        nav[n].classList.add("tab_picked");
    }

    bet = () => {
        if (this.state.noOfPlayers == 0) {
            if (this.state.betFlag == false) {

                let bettedMatches = [];
                if (localStorage.getItem("matchesBetted") == null) {
                    bettedMatches.push(this.state.tournament);
                    localStorage.setItem("matchesBetted", JSON.stringify(bettedMatches))

                    this.setState({ betFlag: true })
                 
                    
                    matches[localStorage.getItem("m_index")].betted = true
                    
                  
                    var obj={
                        Userid:localStorage.getItem("id"),
                        Bettedmatch:JSON.stringify(matches[localStorage.getItem("m_index")])
                    }
                    axios.post("http://localhost:8100/betted" ,obj).then(res=>{
                      
                    })

                    var objMatch={
                        Userid:localStorage.getItem("id"),
                         Match:JSON.stringify(matches)
                    }
                    axios.post("http://localhost:8100/match" ,objMatch).then(res=>{
                       
                    })

                    toast.success("Match Betted", {
                        position: toast.POSITION.TOP_CENTER
                    });
                   
                

                }
                else {
                    bettedMatches = localStorage.getItem("matchesBetted")
                    var newStr = bettedMatches.substring(0, bettedMatches.length - 1);
                    newStr = newStr + ",\"" + this.state.tournament + "\"]"
                    localStorage.setItem("matchesBetted", newStr)
                    this.setState({ betFlag: true })
                  
                    matches[localStorage.getItem("m_index")].betted = true
                   

                    var objMatch={
                        Userid:localStorage.getItem("id"),
                        Match:JSON.stringify(matches)
                    }
                 
                    axios.post("http://localhost:8100/match" ,objMatch).then(res=>{
                      
                    })

                    var obj={
                        Userid:localStorage.getItem("id"),
                        Bettedmatch:JSON.stringify(matches[localStorage.getItem("m_index")])
                    }
                    axios.post("http://localhost:8100/betted" ,obj).then(res=>{
                     
                    })
                

                    
                   
                    toast.success("Match Betted", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }

            }
        }
        else {
            toast.warn("Select Players!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }
    refreshscore(){
        console.log("hello")
      
        axios.post("http://localhost:8100/refreshscore/"+this.state.tournament).then(res=>
       
                //   this.setState({score:res.data.Score,wicket:res.data.Wicket,over:res.data.Over})
                this.data=res.data
            );
    
        
    }

    call(){
        console.log(this.state)
        var CronJob = require('cron').CronJob;

        let _this = this;
        new CronJob('1 * * * * *', function() {
            axios.post("http://localhost:8100/refreshscore/"+_this.state.tournament)
            .then( (res) => {
                this.data=res.data
                return res.data;
            }).then( (data) => {
                _this.setState({score:data.Score,wicket:data.Wicket,over:data.Over})
            })
        }, null, true, 'America/Los_Angeles');  
    }

    componentDidUpdate () {
        console.log("State : ", this.state)
    }

    render() {

        const tournamentname = this.state.tournament;
        const match = JSON.parse(localStorage.getItem("matchDetail"))
        
       
        return (

            <div className="custom-container flex">
                <ToastContainer />
                <div className="squad-left-container">
                    <header>
                        <div className="flex">
                            <div>
                                <div>PLAYERS</div>
                                <div>{this.state.noOfPlayers}/11</div>
                            </div>

                            <div className="credits">
                                <div>CREDITS</div>
                                <div>{this.state.credit}/100</div>
                            </div>
                        </div>
                        <div className="versus-flex">
                            <div><img src={match.teamAimg}></img></div>
                            <div><img src={versus}></img></div>
                            <div><img src={match.teamBimg}></img></div>
                        </div>
                        <div className="versus-flex">
                            <div>Score:{this.state.score}/{this.state.wicket}</div>
                            <div>Over:{this.state.over}</div>
                       
                            
                        </div>
                       
                    </header>

                    <div className="row tabs">
                        <div className="col-3 tab_picked" onClick={() => this.changeTab("WK", 0)}>WK</div>
                        <div className="col-3" onClick={() => this.changeTab("BAT", 1)}>BAT</div>
                        <div className="col-3" onClick={() => this.changeTab("AR", 2)}>AR</div>
                        <div className="col-3" onClick={() => this.changeTab("BOWL", 3)}>BOWL</div>
                    </div>
                    <div className="tab-preview">

                    </div>
                    <table width="100%">
                        <thead>
                            <tr>
                                <td width="70px"></td>
                                <td>PLAYERS</td>
                                <td>POINTS</td>
                                <td>CREDITS</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {players[tournamentname].map((value, index) => {
                                if (value.role === this.state.tabOption) {
                                    return (

                                        <tr id={value.role + index} className={value.flag === 1 ? "tr-selected" : ""} key={index}>

                                            <td width="70px"><img src={value.playerimg}></img></td>
                                            <td> <Link to={"/players/" + value.name}> <div className="player-name">{value.name}</div><div className="team-name">{value.team}</div></Link></td>
                                            <td>{value.points}</td>
                                            <td>{value.credits}</td>
                                            <td ><button key={index} onClick={() => this.selectPlayer(value.name, value.points, value.credits, value.role, index)}>+</button></td>
                                        </tr>


                                    )
                                }
                            })
                            }

                        </tbody>
                    </table>

              <div className="bet-button">      {this.state.loginstatus !== "LoggedIn" ? (<button><a href="/login">Bet</a></button>)
                        :<button onClick={() => this.bet()}>Bet</button>}</div>

                </div>
                <div className="squad-right-container">

                    {squadContainers.map((sqValue, index) => {

                        return (

                            <div key={index}><p>{sqValue.position}</p>
                                <div className={sqValue.container}>
                                    {players[tournamentname].map((value, index) => {
                                        if (value.role === sqValue.role && value.flag != 0) {
                                            return (
                                                <div key={index}>
                                                    <div className="avatar">  <img src={value.playerimg}></img></div>

                                                    <div> {value.name}</div>


                                                </div>
                                            )
                                        }
                                    })

                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
export default withRouter(Squad);
