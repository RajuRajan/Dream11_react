import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userMenu } from '../Common/Common'
import './Profile.scss'

import right from '../../images/right.svg'
import Landing from '../Landing/Landing';

export default class Profile extends Component {
    render() {

        return (
            <div>
                <div className="container-custom">

                    <div className="player-container">
                        <div className="player-left-container">
                            <header>ME</header>

                            {userMenu.map((value, index) => {
                                return (
                                    <Link to={value.link} >
                                        {value.menu!="Logout"?(
                                              <div className="menu-container">
                                              <div><img src={value.icon}></img></div>
                                              <div className="menu">{value.menu}</div>
                                              <div><img src={right}></img></div>
                                          </div>
                                        ):(
                                            <div onClick={()=>localStorage.clear()} className="menu-container">
                                            <div><img src={value.icon}></img></div>
                                            <div className="menu">{value.menu}</div>
                                            <div><img src={right}></img></div>
                                            </div>
                                        )}
                                      </Link>
                                )
                            })}


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
