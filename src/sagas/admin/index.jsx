/**
 * Created by liliwen on 2017/1/31.
 */
'use strict';
import React from 'react';
import {browserHistory} from 'react-router';
import { delay} from 'redux-saga'//takeLatest
import {takeLatest ,call, put , takeEvery} from 'redux-saga/effects';
import * as adminAction from '../../actions/admin';
import Ajax from '../../common/lib/ajax';
import { message , Modal , notification  } from 'antd';

/**
 * redux-saga/effects 方法说明：（参考链接：http://www.bubuko.com/infodetail-2070701.html）
 * 1、takeEvery 用来监听action，每个action都触发一次，如果其对应是异步操作的话，每次都发起异步请求，而不论上次的请求是否返回。
 *
 * 2、takeLatest  作用同takeEvery一样，唯一的区别是它只关注最后，也就是最近一次发起的异步请求，如果上次请求还未返回，则会被取消。
 *
 * 3、call 用来调用异步函数，将异步函数和函数参数作为call函数的参数传入，返回一个js对象。
 *
 *         saga引入他的主要作用是方便测试，同时也能让我们的代码更加规范化。同js原生的call一样，call函数也可以指定this对象，
 *
 *         只要把this对象当第一个参数传入call方法就好了saga同样提供apply函数，作用同call一样，参数形式同js原生apply方法。
 *
 * 4、cps 同call方法基本一样，但是用处不太一样，call一般用来完成异步操作，cps可以用来完成耗时比较长的io操作等。
 *
 * 5、put 是saga对Redux中dispatch方法的一个封装，调用put方法后，saga内部会分发action通知Store更新state。
 *
 * 6、请求失败  ====  有两种方式来处理请求失败的情况，一种是使用try-catch方法，将错误抛出；另一种是使用变量缓存成功失败的状态。
 *
 * 7、take  同takeEvery一样，都是监听某个action，但与takeEvery不同的是，他不是每次action触发的时候都相应，而只是在执行顺序执行到take语句时才会相应action。
 *
 *          当在genetator中使用take语句等待action时，generator被阻塞，等待action被分发，然后继续往下执行。
 *
 *          takeEvery只是监听每个action，然后执行处理函数。对于何时相应action和 如何相应action，takeEvery并没有控制权。
 *
 *          而take则不一样，我们可以在generator函数中决定何时相应一个action，以及一个action被触发后做什么操作。
 *
 *          最大区别：take只有在执行流达到时才会响应对应的action，而takeEvery则一经注册，都会响应action。
 *
 * 8、fork  非阻塞任务调用机制：上面我们介绍过call可以用来发起异步操作，但是相对于generator函数来说，call操作是阻塞的，只有等promise回来后才能继续执行，
 *
 *           而fork是非阻塞的 ，当调用fork启动一个任务时，该任务在后台继续执行，从而使得我们的执行流能继续往下执行而不必一定要等待返回。
 *
 * 9、cancel  cancel的作用是用来取消一个还未返回的fork任务。防止fork的任务等待时间太长或者其他逻辑错误。
 *
 *          **all**  all提供了一种并行执行异步请求的方式。之前介绍过执行异步请求的api中，大都是阻塞执行，只有当一个call操作放回后，才能执行下一个call操作，
 *
 *          call提供了一种类似Promise中的all操作，可以将多个异步操作作为参数参入all函数中，如果有一个call操作失败或者所有call操作都成功返回，则本次all操作执行完毕。
 *
 *          **race**  有时候当我们并行的发起多个异步操作时，我们并不一定需要等待所有操作完成，而只需要有一个操作完成就可以继续执行流。这就是race借口的用处。他可以并行的启动多个异步请求，
 *
 *          只要有一个 请求返回（resolved或者reject），race操作接受正常返回的请求，并且将剩余的请求取消。
 *
 *          **actionChannel**   在之前的操作中，所有的action分发是顺序的，但是对action的响应是由异步任务来完成，也即是说对action的处理是无序的。
 *
 *          如果需要对action的有序处理的话，可以使用actionChannel函数来创建一个action的缓存队列，但一个action的任务流程处理完成后，才可是执行下一个任务流。
 *
 * 10、Throttling  用来防止连续不断的响应某个事件。　
 *
 * 11、delay：延时执行，使用delay函数实现
 *
 * 
 *
 * */





/**新增业务*/
function* AddNewBusiness(action) {  
    //正在加载中提示
    yield put(adminAction.adminLoadingActionCreator());
    yield delay(1000);
    //验证是否成功登陆
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/createNewBusi',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            acceptName : action.acceptName,
            acceptId : action.acceptId,
            regDate : action.regDate,
            acceptTime : action.acceptTime,
            cuName : action.cuName,
            cuPhone : action.cuPhone,
            waterType : action.waterType,
            inAddress : action.inAddress,
            linkmanName : action.linkmanName,
            linkmanPhone : action.linkmanPhone,
            cuAddress : action.cuAddress,
            linkmanIDCARD : action.linkmanIDCARD,
            linkmanZip : action.linkmanZip,
            remark : action.remark
        })
    });
    // console.log('新增业务',result);
    // console.log('新增业务错误',error);
    if(result.resultFlag === 1){
        success = true;
    }else if(result.resultFlag === 5){
        Modal.error({
            okText:'确定',
            title: '添加失败！',
            content: result.resultMsg,
            style:{
                wordBreak: 'break-word'
            }
        });
    }
    else {
        success = false;
        Modal.error({
            okText:'确定',
            title: '新业务添加失败！',
            content: '原因为'+error,
        });
    }
    yield put(adminAction.adminResultActionCreator(success,result));
}

/**修改业务*/

function* EditNewBusiness(action) {
    //正在加载中提示
    yield put(adminAction.adminLoadingActionCreator());
    yield delay(1000);
    //验证是否成功登陆
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/createNewBusi',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'POST',
        data:JSON.stringify({
            id : action.id,
            busiStatus:action.busiStatus,
            version:action.version,
            acceptName : action.acceptName,
            acceptId : action.acceptId,
            regDate : action.regDate,
            acceptTime : action.acceptTime,
            cuName : action.cuName,
            cuPhone : action.cuPhone,
            waterType : action.waterType,
            inAddress : action.inAddress,
            linkmanName : action.linkmanName,
            linkmanPhone : action.linkmanPhone,
            cuAddress : action.cuAddress,
            linkmanIDCARD : action.linkmanIDCARD,
            linkmanZip : action.linkmanZip,
            remark : action.remark,
        })
    });
    // console.log('修改业务返回结果',result);
    // console.log('修改业务返回结果',error);

    if(result.resultFlag === 1){
        success = true;
    }else if(result.resultFlag === 5){
        Modal.error({
            okText:'确定',
            title: '添加失败！',
            content: result.resultMsg,
            style:{
                wordBreak: 'break-word'
            }
        });
    }else {
        success = false;
        Modal.error({
            okText:'确定',
            title: '业务修改失败！',
            content: '原因为'+error,
        });
    }
    yield put(adminAction.adminResultActionCreator(success,result));
}

function asyncFetch(params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('information from server...'), 3000);
    }).then(info => ({info}))
        .catch(err => ({err}));
}

/**获取主页任务列表项目总数*/
function* AdminReturnTotalNum(action) {
    //正在加载中提示
    yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);
    let sysError = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/getTaskCount?operFlag='+action.DoperFlag,
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'get'
    });
    // console.log('获取主页任务列表项目总数',result);
    
    if(error){
        sysError = true;
        console.log('服务器出错，请稍后再试！');
        // console.log(error);
    }
    
    yield put(adminAction.AdminReturnTotalNumResponse(sysError,result));
    
}


/**获取主页任务列表*/
function* AdminLoadTasksList(action) {
    //正在加载中提示
    yield put(adminAction.adminListLoadingActionCreator());
    yield delay(1000);
    let sysError = false;
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/getTaskList?operFlag='+action.TasksListId+'&page=0&size=15',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'get'
    });
    if(result){
        success = true;
    } else if(error){
        sysError = true;
        console.log('服务器出错，请稍后再试！');
    }  
    // console.log(result);
    yield put(adminAction.adminstopLoadingActionCreator(sysError,result));
}
/**主页任务列表分页*/
//adminPagenumActionCreator
function* adminPagenumActionCreator(action) {
    //正在加载中提示
    yield put(adminAction.adminLoadingActionCreator());
    yield delay(1000);
    let succ = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/getTaskList?operFlag='+action.resultFlag+'&page='+action.page+'&size=15',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'get'
    });
    if(result){
        succ = true;
    } else if(error){
        succ = false;
        console.log('服务器出错，请稍后再试！');
    }
    yield put(adminAction.adminPagenumrefreshActionCreator(true,result));
}




/**根据ID 获取详细内容*/
function* AdminLoadIDInfo(action) {
    //正在加载中提示
    yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);

    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/queryOneBaseInfo?id='+action.QueryId,
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'get'
    });
    // console.log('详细内容',result)
    if(error){
        console.log(error);
        notification['error']({
            message: '工程不合法',
        });
    }
    yield put(adminAction.AdminLoadIDQueryRes(result));
}

/**设计调配请求*/    

function* Designdiaopei(action) {
    
    yield put(adminAction.adminRequestLoadingActionCreator());

    
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/allocateDesignTask',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            projId : action.projId,
            desiId : action.desiId,
            designerName : action.designerName,
            remark : action.remark,
            operFlag : action.operFlag
        })
    });
    // console.log('设计调配请求',result);
    if(result.resultFlag == 1){
        success = true;
        notification['success']({
            message: '调配任务成功',
            description: '调配任务发布成功！',
        });

    }else if(result.resultFlag == 3 ){
        success = true;
        notification['info']({
            message: '重新受理',
        });
    }else if(result.resultFlag == 4 ){
        notification['error']({
            message: '工程状态不合法',
            description: '由于该项目状态异常，无法处理该业务，请返回上一级菜单，刷新页面重试，',
            duration:6,
        });
    }else if(result.resultFlag == 5 ){
        notification['error']({
            message: '系统异常',
        });
    }
    else if(error){
        success = false;
    }
    // console.log(result);
    // console.log(error);
    yield put(adminAction.SuccRequest(success));
}

/**业务勘察请求*/

function* Designkancha(action) {

    yield put(adminAction.adminRequestLoadingActionCreator());

    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/submitSurveyandDesign',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            id : action.projId,
            surveyAndDesignFlag : action.surveyAndDesignFlag,
            surveyRecord : action.surveyRecord
        })
    });
    // console.log('业务勘察请求',result);
    
    if(result.resultFlag == 1){
        success = true;
        notification['success']({
            message: '勘测业务成功',
            description: '勘测任务发布成功！',
            duration:6,
        });

    }else if(result.resultFlag == 2){
        success = true;
        notification['success']({
            message: '重新分配业务成功',
        });
    }else if(result.resultFlag == 3){
        success = true;
        notification['success']({
            message: '终止业务成功',
        });
    }else if(result.resultFlag == 4){
        notification['error']({
            message: '工程不合法',
            description: '由于该项目状态异常，无法处理该业务，请返回上一级菜单，刷新页面重试，',
        });
    }else if(result.resultFlag == 5){
        notification['error']({
            message: '系统异常',
        });
    }else if(error){
        success = false;
    }
    // console.log(result);
    // console.log(error);
    yield put(adminAction.SuccRequest(success));
}

/**图纸设计请求*/

function* DesignTuzhiSheji(action) {
    yield put(adminAction.adminRequestLoadingActionCreator());
    yield delay(1000);
    let success = false;//projId,designDrawingFlag,desiExplain
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/submitDrawingDesign',//submitDrawingDesign
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            id : action.projId,
            designDrawingFlag : action.designDrawingFlag,
            desiExplain : action.desiExplain
        })
    });

    // console.log('图纸设计请求返回结果',result);

    if(result.resultFlag == 1){
        success = true;
        notification['success']({
            message: '图纸设计成功',
            description: '图纸设计发布成功！',
        });

    }else if(result.resultFlag == 3){
        success = true;
        notification['success']({
            message: '终止业务成功',
        });
    }else if(result.resultFlag == 4){
        notification['error']({
            message: '非法工程',
            description: '由于该项目状态异常，无法处理该业务，请返回上一级菜单，刷新页面重试',
            duration:6,
        });
    }else if(result.resultFlag == 5){
        notification['error']({
            message: '系统异常',
        });
    }else if(error){
        success = false;
    }
    yield put(adminAction.SuccRequest(success));
}

/**设计稿校对请求*/
function* DesignShejigaoxiaodui(action) {
    yield put(adminAction.adminRequestLoadingActionCreator());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/submitDrawingDesignRevision',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            desiBookId : action.projId,
            drawingRevisionFlag : action.drawingRevisionFlag,
            reconReason : action.reconReason,
        })
    });

    // console.log('设计稿校对请求返回结果',result);
    if(result.resultFlag == 1){
        success = true;
        notification['success']({
            message: '设计图纸校对成功',
        });

    }else if(result.resultFlag == 2){
        success = true;
        notification['warning']({
            message: '校对有疑问',
            description: '校对不通过，原因是'+result.reconReason,
        });
    }else if(result.resultFlag == 4){
        notification['error']({
            message: '非法工程',
            description: '由于该项目状态异常，无法处理该业务，请返回上一级菜单，刷新页面重试',
            duration:6,
        });
    }else if(result.resultFlag == 5){
        notification['error']({
            message: '系统异常',
        });
    }else if(error){
        success = false;
    }

    yield put(adminAction.SuccRequest(success));

}

/**工程设计审核请求*/

function* AuditShejiSH(action) {
    yield put(adminAction.adminRequestLoadingActionCreator());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/submitDesignChecking',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            desiBookId : action.desiBookId,
            desiCheckingFlag : action.desiCheckingFlag,
            checkComment : action.checkComment,
        })
    });
    // console.log('工程设计审核请求返回结果',result);
    if(result.resultFlag == 1){
        success = true;
        notification['success']({
            message: '审核通过',
        });

    }else if(result.resultFlag == 2){
        success = true;
        notification['warning']({
            message: '审核未通过',
            description: '审核未通过',
        });
    }else if(result.resultFlag == 4){
        notification['error']({
            message: '非法工程',
            description: '由于该项目状态异常，无法处理该业务，请返回上一级菜单，刷新页面重试',
            duration:6,
        });
    }else if(result.resultFlag == 5){
        notification['error']({
            message: '系统异常',
        });
    }else if(error){
        success = false;
    }

    yield put(adminAction.SuccRequest(success));

}

/**工程设计审定请求*/

function* AuditShejiSD(action) {
    yield put(adminAction.adminRequestLoadingActionCreator());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/submitDesignApprove',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            desiBookId : action.desiBookId,
            desiApproFlag : action.desiApproFlag,
            apprReason : action.apprReason,
            impleTeam : action.impleTeam,
        })
    });
    // console.log('工程设计审定请求',result);
    if(result.resultFlag == 1){
        success = true;
        notification['success']({
            message: '审定通过',
        });

    }else if(result.resultFlag == 2){
        success = true;
        notification['warning']({
            message: '审定未通过',
            description: '审核未通过，原因是'+result.reconReason,
        });
    }else if(result.resultFlag == 4){
        notification['error']({
            message: '非法工程',
            description: '由于该项目状态异常，无法处理该业务，请返回上一级菜单，刷新页面重试',
            duration:6,
        });
    }else if(result.resultFlag == 5){
        notification['error']({
            message: '系统异常',
        });
    }else if(error){
        success = false;
    }
    
    yield put(adminAction.SuccRequest(success));
    
}

/**工程缴费请求*/

function* WorkJiaoFei(action) {
    yield put(adminAction.adminRequestLoadingActionCreator());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/submitProjPayment',
        headers:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        method:'post',
        data:JSON.stringify({
            projId:action.projId,
            notifyMoney:action.notifyMoney,
            payerName:action.payerName,
            payerPhone:action.payerPhone,
            notifyPayTime:action.notifyPayTime,
            handler:action.handler,
            asseId:action.asseId,
            projBudget:action.projBudget,
            cuPhone:action.cuPhone,
            sendTime:action.sendTime,
            usPhone:action.usPhone,
            exceeds:action.exceeds,
            preMoney:action.preMoney,
            payTime:action.payTime,
            remark:action.remark,
            operFlag:action.operFlag
        })
    });
    // console.log('工程缴费请求',result);
    if(result.resultFlag == 1){
        success = true;
        notification['success']({
            message: '通知缴费成功',
        });

    }else if(result.resultFlag == 2){
        success = true;
        notification['success']({
            message: '确认缴费成功',
        });
    }else if(result.resultFlag == 3){
        success = true;
        notification['success']({
            message: '终止项目成功',
        });
    }else if(result.resultFlag == 4){
        notification['error']({
            message: '非法工程',
            description: '由于该项目状态异常，无法处理该业务，请返回上一级菜单，刷新页面重试',
            duration:6,
        });
    }else if(result.resultFlag == 5){
        notification['error']({
            message: '系统异常',
        });
    }else if(error){
        success = false;
    }

    yield put(adminAction.SuccRequest(success));
}

/**附件请求*/

function* AdminAffixRequest(action) {
    //正在加载中提示
        // yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/accessory/queryAllAccessoriesByProjId?projId='+action.projId,
        headers:{
            'Content-Type': 'application/json'
        },
        method:'get'
    });
    // console.log('附件请求',result)
    if(error){
        console.log(error);
        notification['error']({
            message: '工程不合法',
        });
    }

    yield put(adminAction.AdminAffixRequestRes(true,result));
}

/**增加部门*/
function* SetTingAddDepartmentActionCreator(action) {
    yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/depInfo/saveNewDepInfo',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        data:JSON.stringify({
            depName:action.depName,
        })
    });
    // console.log('部门增加',result)
    if(result.resultFlag == 1){
        success = true;   
        message.success(<span>新增部门：<span style={{color:'#FF0000',margin:'0 12px',fontWeight:'600'}}>{result.newDepInfo.depName}</span>成功！</span>,3);
    } else if(error){
        console.log(error);  
        notification['error']({       
            message: error,    
        });
    }
    // SetTingRequestActionCreator
    yield put(adminAction.SetTingRequestActionCreator(success));
}

/**获取部门列表*/

function* SetTingGetDepartmentListActionCreator() {
    //正在加载中提示
    // yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/depInfo/queryAllDepInfo',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'get'
    });
    // console.log('获取部门列表',result)
    if(result.resultFlag == 1){
        success = true;
    } else if(error){
        console.log(error);
        notification['error']({
            message: error,
        });
    }

    yield put(adminAction.SetTingGetDepartmentListResActionCreator(success,result));
}

/**删除部门*/

function* SetTingDelDepartmentListResActionCreator(action) {
    yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/depInfo/updateDepInfo',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        data:JSON.stringify({
            depId:action.depId,
            sysStatus:3
        })
    });
    // console.log('删除部门',result)
    if(result.resultFlag == 1){
        success = true;
        message.success(<span>删除部门成功！</span>);
    }else if(result.resultFlag == 2){
        message.error(<span>部门编号为空！</span>);
    }else if(result.resultFlag == 3){
        message.error(<span>部门不存在！</span>);
    } else if(error){
        console.log(error);
        notification['error']({
            message: error,
        });
    }

    yield put(adminAction.SetTingRequestActionCreator(success));
}

/**修改部门*/

function* SetTingEditDepartmentListResActionCreator(action) {
    yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/depInfo/updateDepInfo',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        data:JSON.stringify({
            depId:action.depId,
            depName:action.depName
        })
    });
    // console.log('修改部门',result)
    if(result.resultFlag == 1){
        success = true;
        message.success(<span>修改部门成功！</span>);
    } else if(result.resultFlag == 2){
        message.error(<span>部门编号为空！</span>);
    }else if(result.resultFlag == 3){
        message.error(<span>部门不存在！</span>);
    } else if(error){
        console.log(error);
        notification['error']({
            message: error,
        });
    }

    yield put(adminAction.SetTingRequestActionCreator(success));
}

/**第一次登录自动增加操作员*/

function* loginToAddUsertActionCreator(action) {
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/saveUserAndRight',
        headers:{
            'Content-Type': 'application/json'
        }, 
        method:'POST',
        data:JSON.stringify({
            user:{
                userTrueName : action.userTrueName,
                userLoginName : action.userLoginName,
                userPassword : action.userPassword,
                depId: action.depId,
                depName : action.depName,
                position : action.position,
                workerNum : action.workerNum,
                email : action.email,
                phone : action.phone,
                pquesrion : action.pquesrion,
                panswer : action.panswer,
                authorize:action.authorize,                                  
            },
            userRight:{
                userRight : action.userRight,
                ursystemId : action.ursystemId,
            }
        }) 
    });
    // console.log('增加操作员',result)
    if(result){
        success = true;
    }
    // yield put(adminAction.SetTingAddUserResponseActionCreator(success,result));
}



/**增加操作员*/

function* SetTingAddOperatorActionCreator(action) {
    // yield put(adminAction.AdminOtherRequestLoading());
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/saveUserAndRight',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        data:JSON.stringify({
            user:{
                userTrueName : action.userTrueName,
                userLoginName : action.userLoginName,
                userPassword : action.userPassword,
                depId: action.depId,
                depName : action.depName,
                position : action.position,
                workerNum : action.workerNum,
                email : action.email,
                phone : action.phone,
                pquesrion : action.pquesrion,
                panswer : action.panswer,
                authorize:action.authorize,
            },
            userRight:{
                userRight : action.userRight,
                ursystemId : action.ursystemId,
            }
        })
    });
    // console.log('增加操作员',result)
    if(result){
        success = true;
        message.success(<span>新增操作员：<span style={{color:'#FF0000',margin:'0 12px',fontWeight:'600'}}>{result.user.userLoginName}</span>成功！</span>,3);
    }
    yield put(adminAction.SetTingAddUserResponseActionCreator(success,result));
    
}


/**删除操作员*/

function* SetTingDelOperatorActionCreator(action) {
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/delUserById',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        data:JSON.stringify({
            id:action.userID
        })
    });
    // console.log('删除操作员',result)
    // console.log('删除操作员',error)
    if(result.del == 'success'){
        success = true;
        message.success(<span>删除成功！</span>,3);
    }else if(error){
        message.error(<span>删除失败！</span>,3);
    }

    yield put(adminAction.SetTingGetUserListActionCreator());
    // yield put(adminAction.SetTingDelOperatorCodeActionCreator(success));
}


/**修改操作员*/

function* SetTingEditOperatorActionCreator(action) {
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/saveUserAndRight',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        data:JSON.stringify({
            user:{
                id:action.id,
                userTrueName : action.userTrueName,
                userLoginName : action.userLoginName,
                userPassword : action.userPassword,
                depId: action.depId,
                depName : action.depName,
                position : action.position,
                workerNum : action.workerNum,
                email : action.email,
                phone : action.phone,
                pquesrion : action.pquesrion,
                panswer : action.panswer,
                authorize:action.authorize,
            },
            userRight:{
                urId:action.UrId,
                userRight : action.userRight,
                ursystemId : action.ursystemId,
            }
        })
    });
    // console.log('修改操作员',result)
    // console.log('修改操作员',error)
    if(result){
        success = true;
        message.success(<span>修改操作员成功！</span>,3);
    }

    // yield put(adminAction.SetTingAddUserResponseActionCreator(success,result));
    yield put(adminAction.SetTingEditOperatorCodeActionCreator(success,result));
}



/**启用操作员*/

function* SetTingStartOrStopOperatorActionCreator(action) {
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/openUserAuthorize',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'POST',
        data:JSON.stringify({
            id:action.id,
            authorize : action.authorize,
        })
    });
    // console.log('启用操作员',result)
    // console.log('启用操作员',error)
    if(result){
        success = true;
        message.success(<span>操作成功！</span>,3);
    }
    yield put(adminAction.SetTingGetUserListActionCreator());
    // yield put(adminAction.SetTingEditOperatorCodeActionCreator(success,result));
}




/**查询单个用户信息*/

function* SetTingSearchUserInfoActionCreator(action) {
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/getOneUserById?id='+action.id,
        headers:{
            'Content-Type': 'application/json'
        },
        method:'get'
    });
    if(result){
        success = true;
    }
    // console.log('查询单个用户信息',result)
    // console.log('查询单个用户信息',error)

    yield put(adminAction.SetTingSearchUserInfoResActionCreator(success,result));
}



/**获取用户列表*/

function* SetTingGetUserListActionCreator() {
    yield delay(1000);
    let success = false;
    let {result, error} = yield call(Ajax, {
        url: 'http://127.0.0.1:8084/bzSystem-1.0/api/user/getUserList',
        headers:{
            'Content-Type': 'application/json'
        },
        method:'get',
    });
    // console.log('获取用户列表',result)
    if(result){
        success = true;
    } else if(error){
        
        notification['error']({
            message: error,
        });
    }
    yield put(adminAction.SetTingGetUserListInfoActionCreator(success,result));
}

/**watch*/
export default function* watchAdminAsync() {
    yield takeLatest(adminAction.NEW_BUSINESS, AddNewBusiness);
    yield takeLatest(adminAction.ADMINEDIT_BUSINESS, EditNewBusiness);
    yield takeLatest(adminAction.ADMIN_DESI_RETURNTOTALNUM, AdminReturnTotalNum);
    yield takeLatest(adminAction.ADMIN_TASKSLIST, AdminLoadTasksList);
    yield takeLatest(adminAction.ADMIN_QUERY_ID, AdminLoadIDInfo);
    yield takeLatest(adminAction.DESIGN_DIAOPEI, Designdiaopei);
    yield takeLatest(adminAction.ADMIN_PAGENUM, adminPagenumActionCreator);
    yield takeLatest(adminAction.DESI_KANCHA_REQUEST, Designkancha);
    yield takeLatest(adminAction.DESI_TUZHISHEJI_REQUEST, DesignTuzhiSheji);
    yield takeLatest(adminAction.DESI_SHEJIXIAODUI_REQUEST, DesignShejigaoxiaodui);
    yield takeLatest(adminAction.AUDIT_SHEJISH_REQUEST, AuditShejiSH);
    yield takeLatest(adminAction.AUDIT_SHEJISD_REQUEST, AuditShejiSD);
    yield takeLatest(adminAction.WORK_JIAOFEI_REQUEST, WorkJiaoFei);
    yield takeLatest(adminAction.ADMIN_AFFIX_REQUEST, AdminAffixRequest);
    yield takeLatest(adminAction.SETTING_ADD_DEPARTMENT, SetTingAddDepartmentActionCreator);
    yield takeLatest(adminAction.SETTING_GETLIST_DEPARTMENT, SetTingGetDepartmentListActionCreator);
    yield takeLatest(adminAction.SETTING_DEL_DEPARTMENT, SetTingDelDepartmentListResActionCreator);
    yield takeLatest(adminAction.SETTING_EDIT_DEPARTMENT, SetTingEditDepartmentListResActionCreator);
    yield takeLatest(adminAction.SETTING_ADD_OPERATOR, SetTingAddOperatorActionCreator);
    yield takeLatest(adminAction.SETTING_GETUSERLIST_REQUEST, SetTingGetUserListActionCreator);
    yield takeLatest(adminAction.SETTING_DEL_OPERATOR, SetTingDelOperatorActionCreator);
    yield takeLatest(adminAction.SETTING_SEARCH_USERINFO, SetTingSearchUserInfoActionCreator);
    yield takeLatest(adminAction.SETTING_EDIT_OPERATOR, SetTingEditOperatorActionCreator);
    yield takeLatest(adminAction.FIRST_LOGIN_ADDUSER, loginToAddUsertActionCreator);
    yield takeLatest(adminAction.SETTING_STOPORSTART_OPERATOR, SetTingStartOrStopOperatorActionCreator);
}