import React from 'react';
import {browserHistory} from 'react-router';
const style = {
    outer:{
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    inner:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
    },
    icon:{
        fontSize:'100px',
        lineHeight:'100px'
    },
    word:{
        fontSize:'24px',
        lineHeight:'1.5',
        marginTop: '12px',
    }
};

class NoMatch extends React.Component {
    constructor() {
        super(); 
    }
    toback() {
        browserHistory.go(-1);
    }
    render() {
        return (
            <div style={style.outer}> 
                <div style={style.inner}>
                    <i className="iconfont icon-404"  style={style.icon}/>
                    <div style={style.word}>页面丢了！！！点击&nbsp;&nbsp;&nbsp;<a onClick={this.toback.bind(this)}>返回上一页</a></div>
                </div>

            </div>
        );
    }

}

export default NoMatch;