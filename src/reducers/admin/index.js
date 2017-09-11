'use strict';
import * as adminAction from '../../actions/admin';

const initialState = {
    show : false ,//设置增加角色
    
    succform : false,//表单返回内容
    formdata:null,
    adminLoading: false ,
    requestLoading:false,
    TasksListId : 1 ,
    resultFlag:1,
    page:0,
    Pagesucc:false,//主页请求分页状态
    res:null,
    QueryId:null,
    QueryRes:null,
    Error:false,
    DoperFlag:1,//设计页面列表各个项目总数目（分页）
    ResponseNum:null,//返回来的数据
    SRequest:false,
    Succaffix:false,//附件请求状态
    affixRes:null,//附件请求结果
    OtherIsLoading:false,
    ListLoading:false, //主页列表加载状态
    Setsucc:false,//设置请求状态
    addUserSucc:false,//设置用户增加状态
    addUserRes:null,//设置用户增加结果
    DepartmentListRes:null,//部门列表结果
    DepartmentListcode:false,
    userListInfo:null,//用户列表
    userListSucc:false,//获取用户列表状态
    editUserSucc:false,//修改用户状态
    editUserInfo:null,//修改用户状态
    singleUserInfo:null,//查询单个用户信息
    singleUserSucc:false,//查询单个用户信息状态
    markId:null,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case adminAction.SET_ADDUSER_MODAL:
            return {
                ...state,
                show : action.show,
            };
        case adminAction.ADMIN_LIST_LOADING:
            return {
                ...state,
                ListLoading:true
            }
        case adminAction.ADMIN_ISLOADING:
            return {
                ...state,
                adminLoading:true
            };
        case adminAction.ADMIN_TASKLISTRESULT:
            return {
                ...state,
                Error:action.Error,
                res:action.res,
                ListLoading:false,
            };
        case adminAction.ADMIN_RESULT:
            return {
                ...state,
                succform:action.succform,
                formdata:action.formdata,
                adminLoading:false
            };
        case adminAction.ADMIN_TASKSLIST:
            return {
                ...state,
                TasksListId:action.TasksListId,
            };
        case adminAction.ADMIN_QUERY_ID:
            return {
                ...state,
                QueryId:action.QueryId,
            };
        case adminAction.ADMIN_QUERY_ID_RES:
            return {
                ...state,
                QueryRes:action.QueryRes,
                OtherIsLoading:false
            };
        case adminAction.ADMIN_DESI_RETURNTOTALNUM:
            return {
                ...state,
                DoperFlag:action.DoperFlag
            };
        case adminAction.ADMIN_DESI_RETURN_NUM_RES:
            return {
                ...state,
                Error:action.Error,
                ResponseNum:action.ResponseNum,
                OtherIsLoading:false
            };
        case adminAction.ADMIN_PAGENUM:
            return {
                ...state,
                resultFlag:action.resultFlag,
                page:action.page
            };
        case adminAction.ADMIN_REFRESH:
            return {
                ...state,
                Pagesucc:action.Pagesucc,
                res:action.res,
                adminLoading:false,
            }
        case adminAction.ADMIN_REQUESTLOADING://主页请求加载状态
            return {
                ...state,
                requestLoading : true
            }
        case adminAction.SUCC_REQUEST:
            return {
                ...state,
                SRequest:action.SRequest,
                requestLoading:false,
            }
        case adminAction.ADMIN_OTHER_REQUEST_LOADING:
            return {
                ...state,
                OtherIsLoading:true
            }
        case adminAction.ADMIN_AFFIX_REQUEST_RES:
            return {
                ...state,
                Succaffix:action.Succaffix,
                affixRes:action.affixRes,
            }
        case adminAction.SETTING_REQUEST_CODE:
            return {
                ...state,
                Setsucc:action.Setsucc,
                OtherIsLoading:false
            }
        case adminAction.SETTING_ADDUSER_REQUEST_RESPONSE:
            return {
                ...state,
                addUserSucc:action.addUserSucc,
                addUserRes:action.addUserRes,
            }
        case adminAction.SETTING_GETLIST_DEPARTMENT_RES:
            return {
                ...state,
                DepartmentListcode:action.DepartmentListcode,
                DepartmentListRes:action.DepartmentListRes
            }
        case adminAction.SETTING_GETUSERLIST_RESPONSE:
            return {
                ...state,
                userListSucc:action.userListSucc,
                userListInfo:action.userListInfo
            }
        case adminAction.SETTING_SEARCH_USERINFO_RES:
            return {
                ...state,
                singleUserSucc:action.singleUserSucc,
                singleUserInfo:action.singleUserInfo
            }
        case adminAction.SETTING_EDIT_OPERATOR_CODE:
            return {
                ...state,
                editUserSucc:action.editUserSucc,
                editUserInfo:action.editUserInfo,
            }
        case adminAction.ACTIVEBACKCLASS:
            return {
                ...state,
                markId:action.markId
            }
        default:
            return state;
    }
};

export default adminReducer;