/**
 * Created by liliwen on 2017/1/31.
 */
'use strict';
import {browserHistory} from 'react-router';
import {delay} from 'redux-saga'//takeLatest
import {takeLatest ,call, put} from 'redux-saga/effects';
import * as loginAction from '../../actions/login';
import ajax from '../../common/lib/ajax';
import 'whatwg-fetch';
import { message } from 'antd';


const Succ = () => {
        message.config({
            top:300,
        });
        message.success('恭喜您，登录成功！');
    };
const Error = () => {
    message.config({
        top:300,
    });
    message.error('很抱歉，您登录失败！'); 
};

const Warn = () =>{
        message.warning('你没有进入该系统的权限，请联系管理员！');
    } 
/**work*/
function* loginValidator(action) {
    //正在登陆提示
    yield put(loginAction.nowIsLoginingActionCreator());
    
    yield delay(1000);
    //验证是否成功登陆
    let success = false;

    let {result, err} = yield call(ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/userLogin',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'POST',
        data:JSON.stringify({
            username : action.username,
            password : action.password
        })
    });
     console.log(result)
     if(result == undefined){
         success = false;
        message.error('很抱歉，服务器出错！'); 
     }else{
          if(result.loginStatus === true){
            if(result.systemId !== 3){
                Warn();
            }else if(result.authStat == '0'){
                message.warning('你没有进入该系统的权限！');
            }else{
                success = true;
                Succ();
                sessionStorage.setItem('res',JSON.stringify(result));
                setTimeout(() => browserHistory.replace('/'), 300);
            }
        }else {
            success = false;
            Error()
        }
     }
   
    yield put(loginAction.loginResultActionCreator(success,result));
}

function asyncFetch(params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('information from server...'), 3000);
    }).then(info => ({info}))
        .catch(err => ({err}));
}

/**watch*/
export default function* watchLoginAsync() {
    yield takeLatest(loginAction.CLICK_TO_LOGIN, loginValidator);
}

