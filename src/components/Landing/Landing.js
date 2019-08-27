import React, { Component } from 'react'
import './Landing.scss'
import footerimg from '../../images/footer.png';
import android from '../../images/android.png';
import ios from '../../images/ios.png';

export default class Landing extends Component {
    render() {
        return (
            <div>
                  
                            <div className="caption">INDIA'S BIGGEST SPORTS GAME</div>
                            <div className="sub-caption">7 CRORES+ USERS</div>
                            <div>Download The App</div>
                            <div className="flex-inner">
                                <div><img src={android}></img></div>
                                <div><img src={ios}></img></div>
                            </div>
                            <div className="footer-img"> <img src={footerimg}></img></div>
                        
            </div>
        )
    }
}
