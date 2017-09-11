/**
 * Created by Administrator on 2017-04-01.
 */

'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {Menu, Icon ,Modal , Dropdown , Progress , Badge , Popover , Avatar  } from 'antd';
import './index.scss';
const confirm = Modal.confirm;

import {loginResponseBack} from '../../actions/login';

import Perf from 'react-addons-perf'
window.Perf = Perf; // 挂载到全局变量方便使用

class Layout extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            index: 1,
        };
    }

    loginResponse(response) {
        this.props.dispatch(clickToLoginActionCreator(response));
    }

    componentWillMount() {
        if(JSON.parse(sessionStorage.getItem('res')) == null){
            browserHistory.replace('/login');
        }
    }
    onclicknum() {
        this.setState({
            index : ++this.state.index
        })
    }     
    /**退出登录确认*/
    loginOutConfirm() {
        confirm({
            title: '现在是要退出报装系统？',
            onOk() {
                sessionStorage.removeItem('res');
                browserHistory.replace('/login');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    render() {
        function handleClick(e) {
            console.log('click', e);
        } 
       
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" style={{color:'rgba(0, 0, 0, 0.65)'}} href="http://www.alipay.com/">更改密码</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" style={{color:'rgba(0, 0, 0, 0.65)'}} href="http://www.taobao.com/">退出登录</a>
                </Menu.Item>
            </Menu>
        );  
        const text = <span>Title</span>;
        const content = (
            <div>
                <p>Content</p>
                <p>Content</p>
            </div>
        );
        let res;
        if(JSON.parse(sessionStorage.getItem('res')) == null){
            return false;
        }else{
            res = JSON.parse(sessionStorage.getItem('res'));
        }
        
        return (
            <div className="index_cont">
                {/*顶部工具条*/}
                <div className='TopTollBar'>
                    <div className="TopTollBar-col clearfloat">
                        <div className='TopTollBar-list-left' style={{textAlign:'center',position:'relative'}}>
                            <div className='TopTollBarin'>
                                <div className="logo"></div>
                                <div className="userAction">
                                    <ul>
                                        {
                                            (res.loginRight[0] == 1) ?
                                                <li>
                                                    <Link  activeClassName="active" to="/add">
                                                        <i className="iconfont icon-add" />
                                                        <span>新增</span>
                                                    </Link>
                                                </li>
                                                : null
                                        }
                                        {
                                            (res.loginRight[1] == 1 || res.loginRight[5] == 1) ?
                                                <li>
                                                    <Link  activeClassName="active" to="/design">
                                                        <i className="iconfont icon-design" />
                                                        <span>设计</span>
                                                    </Link>
                                                </li>
                                                : null
                                        }
                                        {
                                            (res.loginRight[2] == 1 || res.loginRight[3] == 1)?
                                                <li>   
                                                    <Link  activeClassName="active" to="/audit">
                                                        <i className="iconfont icon-audit" />
                                                        <span>审核</span>
                                                    </Link>
                                                </li>
                                                : null
                                        }
                                        {
                                            (res.loginRight[4] == 1) ?
                                                <li>    
                                                    <Link  activeClassName="active" to="/work">
                                                        <i className="iconfont icon-work" />
                                                        <span>实施</span>
                                                    </Link>
                                                </li>
                                                : null
                                        }
                                        {
                                            (res.loginRight[6] == 1) ?
                                                <li> 
                                                    <Link  activeClassName="active" to="/setting">
                                                        <i className="iconfont icon-shezhi" />
                                                        <span>设置</span>
                                                    </Link>
                                                </li>
                                                : null
                                        }



                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='TopTollBar-list-right' style={{textAlign:'right'}}>
                            <div className='TopTollBarin'>
                                <div className='message'>
                                    <Popover placement="topLeft" title={text} content={content} trigger="hover">
                                        <Badge count={this.state.index} overflowCount={10}>
                                            <div style={{padding:'4px'}}>
                                                <i className='iconfont icon-message' onClick={this.onclicknum.bind(this)}></i>
                                            </div>
                                        </Badge>
                                    </Popover>
                                </div>
                                <div className="userImg">
                                    <Avatar icon="user" style={{color:'#c6c8ce',backgroundColor: 'rgb(84, 94, 117)'}}/>
                                </div>
                                <div className="userhandle">
                                    {res.loginPeople}
                                </div>
                                <div className='loginOut' onClick={this.loginOutConfirm.bind(this)}>
                                    <Icon type="poweroff" />
                                    <span>退出登录</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*右边正文*/}
                <div className='index_right_cont' style={{overflow:this.props.adminLoading ? 'hidden':'auto'}}  ref="index_right_cont">
                    {
                        this.props.children
                    }
                </div>  
            </div>
        );
    }
}

export default connect(state => ({
    response : state.loginReducer.response,
    adminLoading: state.adminReducer.adminLoading,
}))(Layout);
