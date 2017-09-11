/**
 * Created by liliwen on 2017/1/26.
 */
'use strict';
import {combineReducers} from 'redux';// 利用combineReducers 合并reducers
import loginReducer from './login';
import mReducer from './m';
import adminReducer from './admin';


export default combineReducers({
    loginReducer,
    adminReducer,
    mReducer
});