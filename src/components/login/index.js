
/**引入同一目录下scss文件要在前面加上 “./” */
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {clickToLoginActionCreator} from '../../actions/login';
import {SetTingGetUserListActionCreator,loginToAddUsertActionCreator,SetTingGetUserListInfoActionCreator} from '../../actions/admin';
import './index.scss';
import md5 from 'md5';
import FormCpn from './form';

import { message } from 'antd';

import Perf from 'react-addons-perf'
window.Perf = Perf; // 挂载到全局变量方便使用
     
class LoginContainer extends React.Component {        
     
    constructor(props) {
        super(props);
        this.loginHandler = this.loginHandler.bind(this);
        this.SetTingGetUserListActionCreator = this.SetTingGetUserListActionCreator.bind(this);
        this.loginToAddUsertActionCreator = this.loginToAddUsertActionCreator.bind(this);
        this.state = {
            initUser : props.userListInfo
        }
    }
    loginHandler(username , password) {
        this.props.dispatch(clickToLoginActionCreator(username, password, true));
    }
    /**获取用户列表*/
    SetTingGetUserListActionCreator(){
        this.props.dispatch(SetTingGetUserListActionCreator());
    }
    /**获取用户列表结果*/
    SetTingGetUserListInfoActionCreator(userListSucc,userListInfo){
        this.props.dispatch(SetTingGetUserListInfoActionCreator(userListSucc,userListInfo));
    }
    /**增加操作员*/
    loginToAddUsertActionCreator(userTrueName,userLoginName,userPassword,depId,depName,position,workerNum,email,phone,pquesrion,panswer,authorize,userRight,ursystemId){
        this.props.dispatch(loginToAddUsertActionCreator(userTrueName,userLoginName,userPassword,depId,depName,position,workerNum,email,phone,pquesrion,panswer,authorize,userRight,ursystemId))
    }
    componentWillMount(){
        this.SetTingGetUserListActionCreator();
    }

    // componentWillReceiveProps(nextProps){
    //     console.log('nextProps',nextProps)
    //     /**获取用户列表*/
    //     if(nextProps.userListInfo.length === 0){
    //         this.loginToAddUsertActionCreator('Admin','admin',md5('admin'),null,null,null,null,null,null,null,null,1,'1,1,1,1,1,1,1',3);
    //         if(nextProps.addUserSucc){
    //             this.SetTingGetUserListActionCreator();
    //         }
    //     }
    // }         
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.userListInfo.length == 0){
            this.loginToAddUsertActionCreator('Admin','admin',md5('admin'),null,null,null,null,null,null,null,null,1,'1,1,1,1,1,1,1',3);
            if(nextProps.addUserSucc){
                this.SetTingGetUserListInfoActionCreator(true,nextProps.addUserRes);
                return false
            }
            return false
        }
        return true
    }

    render() {
        let formProps = {
            success: this.props.success,
            isLogining: this.props.isLogining,
            firstTime: this.props.firstTime 
        };
        const init = {
            position:'absolute',
            left:'50%',
            top:'50%',
            transform: 'translate(-50%,-50%)',
            fontSize:'16px'
        };
        // if(this.props.userListInfo == null){
        //     return(
        //         <div style={init}>正在初始化中，请稍后...</div>
        //     )
        // }
        return (
            <div className="login">
               
                <FormCpn loginHandler={this.loginHandler} {...formProps} />
            </div>
        );
    }         
}   
export default connect(state => ({
    success: state.loginReducer.success, 
    response: state.loginReducer.response,
    isLogining: state.loginReducer.isLogining,          
    firstTime: state.loginReducer.firstTime,
    userListInfo: state.adminReducer.userListInfo,
    addUserSucc:state.adminReducer.addUserSucc,
    addUserRes:state.adminReducer.addUserRes,
}))(LoginContainer);