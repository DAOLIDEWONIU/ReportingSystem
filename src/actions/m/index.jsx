/**
 * Created by liliwen on 2017/1/31.
 */
'use strict';

/**常量*/
export const CLICK_TO_INFO = 'CLICK_TO_INFO';
export const NOW_IS_LOADING = 'NOW_IS_LOADING';
export const NOW_IS_STOPLOADING = 'NOW_IS_STOPLOADING';
export const CLICK_TO_BACK = 'CLICK_TO_BACK';
export const CLICK_TO_CHANGE = 'CLICK_TO_CHANGE';
export const CURRENT_ANIMATE = 'CURRENT_ANIMATE';/*切换动画*/

/**ActionCreator*/
export function clickToMActionCreator() {
    return {
        type: CLICK_TO_INFO
    };
}
export function clickTochangetitleActionCreator(title) {
    return {
        type: CLICK_TO_CHANGE,
        title
    };
}
export function nowIsLoadingActionCreator() {
    return {
        type: NOW_IS_LOADING
    };
}
export function nowIsStopLoadingActionCreator() {
    return {
        type: NOW_IS_STOPLOADING
    };
}
export function clickToHomeMActionCreator() {
    return {
        type: CLICK_TO_BACK
    };
}

export const currentAnimate = (cls) => ({
    type: CURRENT_ANIMATE,
    cls
})