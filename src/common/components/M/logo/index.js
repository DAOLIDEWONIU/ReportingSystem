/**
 * Created by Administrator on 2017-04-17.
 */

import React from 'react';
import './index.scss';
import Logopng from '../../../../images/logo/logo.png';

class Logo extends React.Component {

    constructor() {
        super();
    }
  

    render() {
        return (
            <div className="Logo">
                <img src={Logopng} alt="logo"/>
            </div>
        );
    }

}

export default Logo;