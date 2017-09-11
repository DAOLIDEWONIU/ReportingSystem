/**
 * Created by liliwen on 2017/1/29.
 */
'use strict';
import * as mAction from '../../actions/m';

const initialState = {
    IsShowBottomNab: true,
    isloading : false ,
    inittitle : '',
    navtitle : '',
    animateCls: 'normal', //过渡动画样式
};


const mReducer = (state = initialState, action) => {
    if (typeof state == 'undefined') {
        return state;
    }
    switch (action.type) {
        case mAction.NOW_IS_LOADING:
            return {
                ...state,
                isloading: true
            };
        case mAction.NOW_IS_STOPLOADING:
            return {
                ...state,
                isloading: false
            };
        case mAction.CLICK_TO_CHANGE:
            return {
                ...state,
                inittitle : action.title,
                navtitle : action.title
            };
        case mAction.CLICK_TO_INFO:
            return {
                ...state,
                IsShowBottomNab: false,
                inittitle : action.title
            };
        case mAction.CLICK_TO_BACK :
            return {
                ...state,
                IsShowBottomNab: true,
                inittitle : action.title
            };
        case mAction.CURRENT_ANIMATE :
            return {
                ...state,
                animateCls: action.cls
            };
        default:
            return state;
    }
};

export default mReducer;