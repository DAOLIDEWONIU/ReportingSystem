/**
 * Created by liliwen on 2017/2/1.
 */
'use strict';

/**常量*/
export const CHECK_SINGLE_ADMIN = 'CHECK_SINGLE_ADMIN';
export const CHECK_ALL_ADMIN = 'CHECK_ALL_ADMIN';
export const SET_ADDUSER_MODAL = 'SET_ADDUSER_MODAL'; // 增加管理员
export const NEW_BUSINESS= 'NEW_BUSINESS'; // 添加新业务、
export const ADMINEDIT_BUSINESS= 'ADMINEDIT_BUSINESS'; // 修改业务、

export const ADMIN_RESULT= 'ADMIN_RESULT'; // 主页请求状态
export const ADMIN_ISLOADING= 'ADMIN_ISLOADING'; // 主页加载中状态
export const ADMIN_TASKLISTRESULT= 'ADMIN_TASKLISTRESULT'; // 主页列表结果
export const ADMIN_TASKSLIST= 'ADMIN_TASKSLIST'; // 主页任务列表
export const ADMIN_QUERY_ID= 'ADMIN_QUERY_ID'; // 根据项目id返回详细内容
export const ADMIN_QUERY_ID_RES= 'ADMIN_QUERY_ID_RES'; // 根据项目id返回详细内容
export const ADMIN_DESI_RETURNTOTALNUM= 'ADMIN_DESI_RETURNTOTALNUM'; // 根据operFlag返回设计列表各个项目总数
export const ADMIN_DESI_RETURN_NUM_RES= 'ADMIN_DESI_RETURN_NUM_RES'; // 根据operFlag返回设计列表各个项目总数结果
export const ADMIN_PAGENUM= 'ADMIN_PAGENUM'; // 分页
export const ADMIN_REFRESH= 'ADMIN_REFRESH'; // 分页刷新
export const ADMIN_REQUESTLOADING= 'ADMIN_REQUESTLOADING'; // 主页请求加载状态
export const ADMIN_LIST_LOADING= 'ADMIN_LIST_LOADING'; // 主页列表加载状态

export const ADMIN_AFFIX_REQUEST= 'ADMIN_AFFIX_REQUEST'; // 附件请求
export const ADMIN_OTHER_REQUEST_LOADING= 'ADMIN_OTHER_REQUEST_LOADING'; // 其他请求加载状态
export const ADMIN_AFFIX_REQUEST_RES= 'ADMIN_AFFIX_REQUEST_RES'; // 附件请求结果状态


/**设计类*/
export const DESIGN_DIAOPEI= 'DESIGN_DIAOPEI'; // 设计调配请求           
export const SUCC_REQUEST= 'SUCC_REQUEST'; // 请求成功后
export const DESI_KANCHA_REQUEST= 'DESI_KANCHA_REQUEST'; // 业务勘察请求
export const DESI_TUZHISHEJI_REQUEST= 'DESI_TUZHISHEJI_REQUEST'; // 图纸设计请求
export const DESI_SHEJIXIAODUI_REQUEST= 'DESI_SHEJIXIAODUI_REQUEST'; // 设计稿校对请求

/**审核类*/
export const AUDIT_KANCE_REQUEST= 'AUDIT_KANCE_REQUEST'; // 工程勘测审核
export const AUDIT_SHEJISH_REQUEST= 'AUDIT_SHEJISH_REQUEST'; // 工程设计审核
export const AUDIT_SHEJISD_REQUEST= 'AUDIT_SHEJISD_REQUEST'; // 工程设计审定
export const AUDIT_KANCHA_REQUEST= 'AUDIT_KANCHA_REQUEST'; // 工程勘察审定

/**施工类*/

export const WORK_JIAOFEI_REQUEST= 'WORK_JIAOFEI_REQUEST'; // 工程缴费
export const WORK_WORKING_REQUEST= 'WORK_WORKING_REQUEST'; // 工程施工中
export const WORK_SETWATER_REQUEST= 'WORK_SETWATER_REQUEST'; // 工程安装水表


/**系统设置类*/

export const SETTING_ADD_DEPARTMENT= 'SETTING_ADD_DEPARTMENT'; // 增加部门
export const SETTING_ADD_POST= 'SETTING_ADD_POST'; // 增加职位

export const FIRST_LOGIN_ADDUSER = 'FIRST_LOGIN_ADDUSER';/*第一次登录自动增加admin操作员*/

export const SETTING_ADD_OPERATOR= 'SETTING_ADD_OPERATOR'; // 增加操作员
export const SETTING_DEL_OPERATOR= 'SETTING_DEL_OPERATOR'; // 删除操作员

export const SETTING_STOPORSTART_OPERATOR= 'SETTING_STOPORSTART_OPERATOR'; // 启用关闭操作员

export const SETTING_EDIT_OPERATOR= 'SETTING_EDIT_OPERATOR'; // 修改操作员
export const SETTING_EDIT_OPERATOR_CODE= 'SETTING_EDIT_OPERATOR_CODE'; // 修改操作员状态


export const SETTING_SEARCH_USERINFO= 'SETTING_SEARCH_USERINFO'; // 查询单个操作员信息
export const SETTING_SEARCH_USERINFO_RES= 'SETTING_SEARCH_USERINFO_RES'; // 查询单个操作员信息返回结果


export const SETTING_REQUEST_CODE= 'SETTING_REQUEST_CODE'; // 设置请求状态
export const SETTING_ADDUSER_REQUEST_RESPONSE= 'SETTING_ADDUSER_REQUEST_RESPONSE'; // 设置增加操作员请求结果

export const SETTING_GETLIST_DEPARTMENT= 'SETTING_GETLIST_DEPARTMENT'; // 获取部门列表
export const SETTING_GETLIST_DEPARTMENT_RES= 'SETTING_GETLIST_DEPARTMENT_RES'; // 获取部门列表结果

export const SETTING_DEL_DEPARTMENT= 'SETTING_DEL_DEPARTMENT'; // 删除部门
export const SETTING_EDIT_DEPARTMENT= 'SETTING_EDIT_DEPARTMENT'; // 修改部门

export const SETTING_GETUSERLIST_REQUEST= 'SETTING_GETUSERLIST_REQUEST'; // 获取用户列表
export const SETTING_GETUSERLIST_RESPONSE= 'SETTING_GETUSERLIST_RESPONSE'; // 获取用户列表结果


/**其他*/

export const ACTIVEBACKCLASS= 'ACTIVEBACKCLASS'; // 点击返回样式

export function activeClassName(markId) {
    return {
        type: ACTIVEBACKCLASS,
        markId
    };
}


/**Action Creator*/
// export function checkSingleAdminActionCreator(id) {
//     return {
//         type: CHECK_SINGLE_ADMIN,
//         id
//     };
// }


/**主页列表请求加载状态*/
export function adminListLoadingActionCreator() {
    return {
        type: ADMIN_LIST_LOADING,
    };
}

/**添加新业务*/
export function AddNewBusiness(acceptName, acceptId, regDate, acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip, remark ) {
    return {
        type: NEW_BUSINESS,
        acceptName,
        acceptId,
        regDate,
        acceptTime,
        cuName,
        cuPhone,
        waterType,
        inAddress,
        linkmanName,
        linkmanPhone,
        cuAddress,
        linkmanIDCARD,
        linkmanZip,
        remark,
    };
}
/**修改业务*/


export function EditNewBusiness(id,busiStatus,version,acceptName, acceptId, regDate, acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip, remark ) {
    return {
        type: ADMINEDIT_BUSINESS,
        id,
        busiStatus,
        version,
        acceptName,
        acceptId,
        regDate,
        acceptTime,
        cuName,
        cuPhone,
        waterType,
        inAddress,
        linkmanName,
        linkmanPhone,
        cuAddress,
        linkmanIDCARD,
        linkmanZip,
        remark
    };
}




/**主页新增业务请求状态*/
export function adminResultActionCreator(succform,formdata) {
    return {
        type: ADMIN_RESULT,
        succform,
        formdata
    };
}

/**主页加载状态*/
export function adminLoadingActionCreator() {
    return {
        type: ADMIN_ISLOADING,
    };
}
/**主页请求加载状态*/
export function adminRequestLoadingActionCreator() {
    return {
        type: ADMIN_REQUESTLOADING,
    };
}

/**主页停止加载状态.设计页面返回列表数*/
export function adminstopLoadingActionCreator(Error,res) {
    return {
        type: ADMIN_TASKLISTRESULT,
        Error,
        res
    };
}

/**主页根据operFlag返回的列表各个项目总数*/
export function AdminReturnTotalNum(DoperFlag) {
    return {
        type: ADMIN_DESI_RETURNTOTALNUM,
        DoperFlag
    };
}

/**主页根据operFlag返回的列表各个项目总数*/
export function AdminReturnTotalNumResponse(Error,ResponseNum) {
    return {
        type: ADMIN_DESI_RETURN_NUM_RES,
        Error,
        ResponseNum
    };
}

/**主页根据id号获取任务列表*/
export function AdminLoadTasksList(TasksListId) {
    return {
        type: ADMIN_TASKSLIST,
        TasksListId
    };
}


/**分页*/
export function adminPagenumActionCreator(resultFlag,page) {
    return {
        type: ADMIN_PAGENUM,
        resultFlag,
        page
    };
}

/**分页刷新操作*/
export function adminPagenumrefreshActionCreator(Pagesucc,res) {
    return {
        type: ADMIN_REFRESH,
        Pagesucc,
        res
    };
}

/**主页根据id号获取详细内容*/
export function AdminLoadIDInfo(QueryId) {
    return {
        type: ADMIN_QUERY_ID,
        QueryId
    };
}

/**主页根据id号返回的详细内容*/
export function AdminLoadIDQueryRes(QueryRes) {
    return {
        type: ADMIN_QUERY_ID_RES,
        QueryRes
    };
}

/**设计调配*/
export function Designdiaopei(projId,desiId,designerName,remark,operFlag) {
    return {
        type: DESIGN_DIAOPEI,
        projId,
        desiId,
        designerName,
        remark,
        operFlag
    };
}
/**请求成功*/
export function SuccRequest(SRequest) {
    return {
        type: SUCC_REQUEST,
        SRequest
    };
}
/**业务勘察请求*/
export function Designkancha(projId,surveyAndDesignFlag,surveyRecord) {
    return {
        type: DESI_KANCHA_REQUEST,
        projId,
        surveyAndDesignFlag,
        surveyRecord
    };
}

/**图纸设计请求*/
export function DesignTuzhiSheji(projId,designDrawingFlag,desiExplain) {
    return {
        type: DESI_TUZHISHEJI_REQUEST,
        projId,
        designDrawingFlag,
        desiExplain
    };
}

/**设计稿校对请求*/
export function DesignShejigaoxiaodui(projId,drawingRevisionFlag,reconReason) {
    return {
        type: DESI_SHEJIXIAODUI_REQUEST,
        projId,
        drawingRevisionFlag,
        reconReason
    };
}

/**工程设计审核请求*/
export function AuditShejiSH(desiBookId,desiCheckingFlag,checkComment) {
    return {
        type: AUDIT_SHEJISH_REQUEST,
        desiBookId,
        desiCheckingFlag,
        checkComment
    };
}



/**工程设计审定请求*/
export function AuditShejiSD(desiBookId,desiApproFlag,apprReason,impleTeam) {
    return {
        type: AUDIT_SHEJISD_REQUEST,
        desiBookId,
        desiApproFlag,
        apprReason,
        impleTeam
    };
}

/**附件请求加载*/

export function AdminAffixRequest(projId) {
    return {
        type: ADMIN_AFFIX_REQUEST,
        projId
    };
}
/**附件请求结果状态*/

export function AdminAffixRequestRes(Succaffix,affixRes) {
    return {
        type: ADMIN_AFFIX_REQUEST_RES,
        Succaffix,
        affixRes
    };
}

/**其他请求加载状态*/
export function AdminOtherRequestLoading() {
    return {
        type: ADMIN_OTHER_REQUEST_LOADING,
    };
}



/**工程缴费请求*/

export function WorkJiaoFei(projId,notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,usPhone,exceeds,preMoney,payTime,remark,operFlag) {
    return {
        type: WORK_JIAOFEI_REQUEST,
        projId,
        notifyMoney,
        payerName,
        payerPhone,
        notifyPayTime,
        handler,
        asseId,
        projBudget,
        cuPhone,
        sendTime,
        usPhone,
        exceeds,
        preMoney,
        payTime,
        remark,
        operFlag
    };
}



/**设置页面增加操作员（蒙版显示）*/
export function adminSetAddUser(show) {
    return {
        type: SET_ADDUSER_MODAL,
        show,
    };
}


/**设置增加部门*/
export function SetTingAddDepartmentActionCreator(depName) {
    return {
        type: SETTING_ADD_DEPARTMENT,
        depName
    };
}    
   
/**设置增加职位*/
export function SetTingAddPostActionCreator() {                                          
    return {                                                 
        type: SETTING_ADD_POST,            
    };
}    
/**第一次登录自动增加admin*/

export function loginToAddUsertActionCreator(userTrueName,userLoginName,userPassword,depId,depName,position,workerNum,email,phone,pquesrion,panswer,authorize,userRight,ursystemId) {
    return {
        type: FIRST_LOGIN_ADDUSER,
        userTrueName,
        userLoginName,
        userPassword,
        depId,
        depName,
        position,
        workerNum,
        email,
        phone,
        pquesrion,
        panswer,
        authorize,
        userRight,
        ursystemId
    };
}

/**设置增加操作员*/
export function SetTingAddOperatorActionCreator(userTrueName,userLoginName,userPassword,depId,depName,position,workerNum,email,phone,pquesrion,panswer,authorize,userRight,ursystemId) {
    return {
        type: SETTING_ADD_OPERATOR,
        userTrueName,
        userLoginName,
        userPassword,
        depId,
        depName,
        position,
        workerNum,
        email,
        phone,
        pquesrion,
        panswer,
        authorize,
        userRight,
        ursystemId
    };
}

/**删除操作员*/

export function SetTingDelOperatorActionCreator(userID) {
    return {
        type: SETTING_DEL_OPERATOR,
        userID
    }

}

/**修改操作员*/

export function SetTingEditOperatorActionCreator(id,userTrueName,userLoginName,userPassword,depId,depName,position,workerNum,email,phone,pquesrion,panswer,authorize,UrId,userRight,ursystemId) {
    return {
        type: SETTING_EDIT_OPERATOR,
        id,
        userTrueName,
        userLoginName,
        userPassword,
        depId,
        depName,
        position,
        workerNum,
        email,
        phone,
        pquesrion,
        panswer,
        authorize,
        UrId,
        userRight,
        ursystemId
    }
}

/**启用操作员*/

export function SetTingStartOrStopOperatorActionCreator(id,authorize) {
    return {
        type: SETTING_STOPORSTART_OPERATOR,
        id,
        authorize
    }
}

/**修改操作员状态*/

export function SetTingEditOperatorCodeActionCreator(editUserSucc,editUserInfo) {
    return {
        type: SETTING_EDIT_OPERATOR_CODE,
        editUserSucc,
        editUserInfo
    }
}


/**查询单个操作员信息*/

export function SetTingSearchUserInfoActionCreator(id) {
    return {
        type: SETTING_SEARCH_USERINFO,
        id
    }
}

/**查询单个操作员信息结果*/

export function SetTingSearchUserInfoResActionCreator(singleUserSucc,singleUserInfo) {
    return {
        type: SETTING_SEARCH_USERINFO_RES,
        singleUserSucc,
        singleUserInfo
    }
}


/**设置请求状态*/
export function SetTingRequestActionCreator(Setsucc) {
    return {
        type: SETTING_REQUEST_CODE,
        Setsucc
    };
}

/**获取部门列表*/

export function SetTingGetDepartmentListActionCreator() {
    return {
        type: SETTING_GETLIST_DEPARTMENT,
    };
}

/**获取部门结果*/

export function SetTingGetDepartmentListResActionCreator(DepartmentListcode,DepartmentListRes) {
    return {
        type: SETTING_GETLIST_DEPARTMENT_RES,
        DepartmentListcode,
        DepartmentListRes
    };
}

/**修改部门*/

export function SetTingEditDepartmentListResActionCreator(depId,depName) {
    return {
        type: SETTING_EDIT_DEPARTMENT,
        depId,
        depName
    };
}

/**删除部门*/

export function SetTingDelDepartmentListResActionCreator(depId) {
    return {
        type: SETTING_DEL_DEPARTMENT,
        depId,
    };
}


/**设置请求结果*/
export function SetTingAddUserResponseActionCreator(addUserSucc,addUserRes) {
    return {
        type: SETTING_ADDUSER_REQUEST_RESPONSE,
        addUserSucc,
        addUserRes
    };
}

/**获取用户列表请求*/
export function SetTingGetUserListActionCreator() {
    return {
        type: SETTING_GETUSERLIST_REQUEST,
    };
}

/**获取用户列表结果*/
export function SetTingGetUserListInfoActionCreator(userListSucc,userListInfo) {
    return {
        type: SETTING_GETUSERLIST_RESPONSE,
        userListSucc,
        userListInfo
    };
}
