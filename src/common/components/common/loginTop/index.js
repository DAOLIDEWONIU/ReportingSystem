/**
 * Created by Administrator on 2017-04-10.
 */
'use strict';
import React from 'react';
import './index.scss';
import { Icon } from 'antd';

class loginTop extends React.Component {

    constructor() {
        super();
    }
    
    render() {
        return (
            <div className="Toplogo clearfloat">
                <div className='ToplogoOut'>
                    <div className='contactOut'>
                        <div className="contact">
                            <Icon type="customer-service" />
                            <a target="_blank" href="tencent://Message/?Uin=888888&amp;websiteName=http://127.0.0.1:3000/=&amp;Menu=yes">联系我们</a>
                        </div>
                    </div>
                    
                </div>
                
            </div>
        );
    }
}
export default loginTop;