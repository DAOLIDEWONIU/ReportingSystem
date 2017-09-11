/**
 * Created by Administrator on 2017-03-31.
 */
'use strict';

import React from 'react';
import './index.scss';
import {Icon , Button } from 'antd';
import Logo from '../../../common/components/M/logo';
import LoginTop from '../../../common/components/common/loginTop';
import md5 from 'md5';
let sUserAgent= navigator.userAgent.toLowerCase(),
    bIsIpad= sUserAgent.match(/ipad/i) == "ipad",
    bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os",
    bIsMidp= sUserAgent.match(/midp/i) == "midp",
    bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4",
    bIsUc= sUserAgent.match(/ucweb/i) == "ucweb",
    bIsAndroid= sUserAgent.match(/android/i) == "android",
    bIsCE= sUserAgent.match(/windows ce/i) == "windows ce",
    bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";

 
class FormCpn extends React.Component {

    constructor() {
        super();
        this.clickToLogin = this.clickToLogin.bind(this);
        this.enterToLogin = this.enterToLogin.bind(this);
        this.state={
            ShowUsernameWarn : false ,
            ShowpasswordWarn : false ,
            usernameIptTipsclassName : 'IptTips',
            passwordIptTipsclassName : 'IptTips' ,
            index : 0
        }
    }
    /**input聚焦*/
    foucuschange(e) {
        var obj = e.target ,
            _self = this;
        switch (obj.name) {
            case 'username' :
                if(obj.value.length > 0) {
                    _self.setState({
                        usernameIptTipsclassName : 'IptTips IptTips_change',
                    });
                }else {
                    _self.setState({
                        usernameIptTipsclassName : 'IptTips IptTips_change',
                    });
                } 
                break;
            case 'password' :                            
                if(obj.value.length >0) {
                    _self.setState({
                        passwordIptTipsclassName : 'IptTips IptTips_change' ,
                    });
                }else {
                    _self.setState({
                        passwordIptTipsclassName : 'IptTips IptTips_change' ,
                    });
                } 
                break;      
        }
    }
    /**input失焦*/
    blurchange(e) {
        var obj = e.target ,
            _self = this;
        switch (obj.name) {
            case 'username' :
                if(obj.value.length === 0){
                    this.setState({
                        usernameIptTipsclassName : 'IptTips',
                    })
                }else if(obj.value.length !== 0){
                    _self.setState({
                        usernameIptTipsclassName : 'IptTips IptTips_change',
                    });

                }
                break;
            case 'password' :
                if(obj.value.length === 0){
                    this.setState({
                        passwordIptTipsclassName : 'IptTips' ,
                    })
                   
                }else if(obj.value.length !== 0){
                    _self.setState({
                        passwordIptTipsclassName : 'IptTips IptTips_change' ,
                    });
                }
                break;
        }
    }
    
    /**输入改变*/
    OnChange(e) {
        var obj = e.target ,
            _self = this ;
        switch (obj.name) {
            case 'username' :
                if(obj.value.length === 0){
                    _self.setState({
                        usernameIptTipsclassName : 'IptTips',
                    });
                }else{
                    _self.setState({
                        usernameIptTipsclassName : 'IptTips IptTips_change',
                    });
                }
                break;
            case 'password' :
                if(obj.value.length === 0){
                    _self.setState({
                        passwordIptTipsclassName : 'IptTips',
                    });
                }else{
                    _self.setState({
                        passwordIptTipsclassName : 'IptTips IptTips_change',
                    });
                }
                break;
        }
    }
    
    /**点击按钮登陆*/
    clickToLogin() {
        var username = this.refs.username.value.length;
        var password = this.refs.password.value.length;

        switch (true){
            case username === 0 :
                this.setState({
                    ShowUsernameWarn : true ,
                    ShowpasswordWarn : false ,
                });
                this.refs.username.focus();
                break;
            case password === 0 :
                this.setState({
                    ShowUsernameWarn : false ,
                    ShowpasswordWarn : true ,
                });
                this.refs.password.focus();
                break;
            case username !== 0 && password !== 0:
                this.setState({
                    ShowUsernameWarn : false ,
                    ShowpasswordWarn : false ,
                });

                this.props.loginHandler(this.refs.username.value , md5(this.refs.password.value));
                break;
        }
    }
    
    /**回车登陆*/
    enterToLogin(event) {
        var username = this.refs.username.value.length;
        event = event || window.event;
        if (event.keyCode === 13 && username === 0){
            this.setState({
                ShowUsernameWarn : true ,
            });
        }else if (event.keyCode === 13 && username !== 0){
            this.refs.password.focus();
            this.clickToLogin();
        }
    }
    oninput(e) {
        var obj = e.target;
        switch (obj.name){
            case 'username' :
                if(obj.value.length > 0) {
                    this.setState({
                        usernameIptTipsclassName : 'IptTips IptTips_change',
                        ShowUsernameWarn : false ,
                    })
                }else {
                    this.setState({
                        usernameIptTipsclassName : 'IptTips IptTips_change',
                    })
                }
                break;
            case 'password' :
                if(obj.value.length > 0) {
                    this.setState({
                        passwordIptTipsclassName : 'IptTips IptTips_change',
                    })
                }else {
                    this.setState({
                        passwordIptTipsclassName : 'IptTips IptTips_change',
                    })
                }
                break;

        }
    }
    
    render() {
        //初始化验证状态
        let validateState = this.props.success ? null : 'error',
            showWarn = this.props.success ? 'hidden' : 'visible',
            loginBtnWords = this.props.isLogining ? '正在登录...' : '登录';
        
        //第一次通过
        if (this.props.firstTime) validateState = null;
        //第一次不显示
        if (this.props.firstTime) showWarn = 'hidden';
        let ShowUsernameWarn = this.state.ShowUsernameWarn ? 'visible' : 'hidden';
        let ShowpasswordWarn = this.state.ShowpasswordWarn ? 'visible' : 'hidden';

        return (
            <div className="index" ref="index">
                <LoginTop />
                <div className='auth-center'>
                    <div className='auto-blur'>
                        <div className='blur-img'></div>
                    </div>
                </div>
                <div className='auth-center'>
                    <div className="logincont">
                        <div className='logincont-left'>
                            <div className='logoOut'>
                                <a href="http://www.zsyltec.com/" target="_blank">
                                    <div className="logo"></div>
                                </a>  
                            </div>
                        </div> 
                        <div className='logincont-right'>
                            <div className="cont_title">
                                <div className="word"><h3>报装管理系统</h3></div>
                            </div>
                            <div className="cont_ipt">
                                <div className="loginError" style={{visibility:showWarn}}>账号或密码错误</div>
                                <div className="_ipt_out">
                                    <div className="_ipt" >
                                        <label className={this.state.usernameIptTipsclassName}>
                                            <font>请输入账号</font>
                                        </label>
                                        <input type="text" ref="username" name="username" className="ipt" autoComplete="off"  
                                            onFocus={this.foucuschange.bind(this)} 
                                            onBlur={this.blurchange.bind(this)}
                                            onKeyUp={this.enterToLogin.bind(this)}
                                            onInput={this.oninput.bind(this)}
                                        />
                                        <div className="warn" style={{visibility: ShowUsernameWarn}} >账号不能为空</div>
                                    </div>
                                </div>
                                <div className="_ipt_out">
                                    <div className="_ipt" >
                                        <label className={this.state.passwordIptTipsclassName}>
                                            <font>请输入密码</font>
                                        </label>
                                        <input type="password" ref="password" name="password" className="ipt"   
                                            onFocus={this.foucuschange.bind(this)} 
                                            onBlur={this.blurchange.bind(this)}
                                            onKeyUp={this.enterToLogin.bind(this)}
                                            onInput={this.oninput.bind(this)}
                                        />
                                        <div className="warn" style={{visibility:ShowpasswordWarn}}>密码不能为空</div>
                                    </div>
                                </div>
                                <div className="btn">
                                    <Button type="primary" loading={this.props.isLogining} onClick={this.clickToLogin.bind(this)}>{loginBtnWords}</Button>
                                </div>
                                
                            </div>
                        </div>  
                    </div>
                </div>

               
                <div className="loginfooter"><a href="http://www.zsyltec.com/" title='成都中水云联' target='_blank' style={{color:'#fff',marginRight:'6px'}}>成都中水云联</a>版权所有 copyright@2017</div>
            </div>
        );
    }
}

export default FormCpn;