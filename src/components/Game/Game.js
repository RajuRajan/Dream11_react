import React, { Component } from 'react'
import './Game.scss'
import '../Common/Common.scss'
import {Link} from 'react-router-dom'
import Footer from '../Footer/Footer';

export default class Game extends Component {

    constructor() {
        super();
        this.state = {
            tabOption: "Cricket"
        }

    }
    changeTab = (option, index) => {
        localStorage.setItem("tabindex",index)
        this.toggleLayoutMenu(index);
        this.setState({
            tabOption: option
        });

    }
    toggleLayoutMenu(n) {
        var i;
        let nav = document.querySelectorAll(".col-1");
        for (i = 0; i < nav.length; i++) {
            nav[i].classList.remove("tab_picked");
        }

        nav[n].classList.add("tab_picked");
    }
  
    

    render() {

        // let nav= document.querySelectorAll(".col-1");
        //  nav[localStorage.getItem("tabindex")].classList.add("tab_picked")
        const { game: GameComponent } = this.props;
        return (
            <div>
                <div className="container-custom">
                    <div className="row tabs">
                    <div className="col-1 tab_picked" onClick={() => this.changeTab("Cricket", 0)}> <Link to="/cricket">Cricket</Link></div>
                        <div className="col-1" onClick={() => this.changeTab("Kabadi", 1)}>Kabadi</div>
                        <div className="col-1" onClick={() => this.changeTab("Tennis", 2)}>Tennis</div>
                        <div className="col-1" onClick={() => this.changeTab("Dashboard", 3)}><Link to="/dashboard"> Dashboard</Link></div>
                    </div>
                    <div className="card-container">
                        <GameComponent />
                    </div>
                    <Footer/>   
                </div>

            </div>
        )
    }
}
