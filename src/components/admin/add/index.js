/**
 * Created by Administrator on 2017-06-20.
 */
'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {connect} from 'react-redux';
import {AddNewBusiness,adminResultActionCreator,AdminLoadTasksList,AdminLoadIDQueryRes,AdminLoadIDInfo,EditNewBusiness} from '../../../actions/admin';
import { DatePicker , Select , Modal , Icon , Radio , Alert , Button , Badge} from 'antd';
const RadioGroup = Radio.Group;
import './index.scss';
const Option = Select.Option;
import  FileUpload from './succtips';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
import Loading from '../../../common/components/common/loading';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.clearInput = this.clearInput.bind(this);
        this.AddNewBusiness = this.AddNewBusiness.bind(this);
        this.adminResultActionCreator = this.adminResultActionCreator.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.AdminLoadTasksList = this.AdminLoadTasksList.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.EditSubmit = this.EditSubmit.bind(this);
        this.EditNewBusiness = this.EditNewBusiness.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.state={
            visible: false,
            chooseValue: null,
            showTips:false,
            editReason:null,
            form: {//valid表示该值的有效状态，value表示该表单具体的值，error表示错误提示信息：
                acceptName: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''    
                },
                acceptId: {              
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                regDate: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                acceptTime: {   
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                cuName: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                cuPhone: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                waterType: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                inAddress: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                linkmanName: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                linkmanPhone: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                cuAddress: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                linkmanIDCARD: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''
                },
                linkmanZip: {
                    valid: false,
                    value: '',
                    tips:null,
                    error: ''                 
                },

            }
        };
    }

    // 根据id号查找 返回的内容QueryRes
    AdminLoadIDQueryRes(QueryRes) {
        this.props.dispatch(AdminLoadIDQueryRes(QueryRes))
    }
    // 根据id号查找
    AdminLoadIDInfo(QueryId){
        this.props.dispatch(AdminLoadIDInfo(QueryId))
    }
    /**修改业务*/
    EditNewBusiness(id,busiStatus,version, acceptName, acceptId, regDate, acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip, remark) {
        this.props.dispatch(EditNewBusiness(id,busiStatus,version, acceptName, acceptId, regDate, acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip, remark));
    }

    /*新增业务状态和结果*/
    adminResultActionCreator(succform,formdata) {
        this.props.dispatch(adminResultActionCreator(succform,formdata));
    }  
    
    AddNewBusiness(acceptName, acceptId, regDate, acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip, remark) {
        this.props.dispatch(AddNewBusiness(acceptName, acceptId, regDate, acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip, remark, true));
    }
    AdminLoadTasksList(TasksListId){
        this.props.dispatch(AdminLoadTasksList(TasksListId))
    }
    componentWillMount(){
        this.AdminLoadTasksList(1);
        this.AdminLoadIDQueryRes(null);
    }
    clearInput() {

        this.refs.remark.value = '';
        this.AdminLoadIDQueryRes(null);
        // this.AdminLoadTasksList(1);
        this.setState({
            form: {//valid表示该值的有效状态，value表示该表单具体的值，error表示错误提示信息：
                acceptName: {
                    valid: false,
                    value: '',
                    error: ''
                },
                acceptId: {
                    valid: false,
                    value: '',
                    error: ''
                },
                regDate: {
                    valid: false,
                    value: '',
                    error: ''
                },
                acceptTime: {
                    valid: false,
                    value: '',
                    error: ''
                },
                cuName: {
                    valid: false,
                    value: '',
                    error: ''
                },
                cuPhone: {
                    valid: false,
                    value: '',
                    error: ''
                },
                waterType: {
                    valid: false,
                    value: '',
                    error: ''
                },
                inAddress: {
                    valid: false,
                    value: '',
                    error: ''
                },
                linkmanName: {
                    valid: false,
                    value: '',
                    error: ''
                },
                linkmanPhone: {
                    valid: false,
                    value: '',
                    error: ''
                },
                cuAddress: {
                    valid: false,
                    value: '',
                    error: ''
                },
                linkmanIDCARD: {
                    valid: false,
                    value: '',
                    error: ''
                },
                linkmanZip: {
                    valid: false,
                    value: '',
                    error: ''
                },
            }
        })
    }
    
        /*生命周期的Hook,用来决定该组件是否重新Render。*/
    // shouldComponentUpdate(nextProps, nextState) {
    //     const {form: {acceptName, acceptId, regDate ,acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip}} = this.state;
    //
    //     let _self = this;
    //     if (nextProps.succform) {s
    //         const props = {
    //             result : nextProps.formdata
    //         };
    //         Modal.success({
    //             width :'600px',
    //             title : '新业务创建成功！',
    //             okText :'关闭',
    //             onOk :() => {
    //                 _self.clearInput();
    //                 _self.adminResultActionCreator(false,null);
    //             },
    //             content : <FileUpload {...props}/>
    //         });
    //     }
    //     return true;
    // }

    handleValueChange (field, value, type = 'string') {

        if (type === 'number') {
            value = +value;
        }
        const {form} = this.state;
        const newFieldObj = {value, valid: true, error: ''};
        switch (field) {
            case 'acceptName': {
                if (value.length == 0) {
                    newFieldObj.error = '项目名称不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;  
            }
            case 'regDate': {
                if(value.length == 0){
                    newFieldObj.error = '登记日期不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }
            case 'acceptId':{
                if(value.length == 0){
                    newFieldObj.error = '受理号码不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else if(!(/^[0-9]*$/.test(value))){
                    newFieldObj.error = '受理号码只能为数字';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }
            case 'acceptTime':{             
                if(value.length == 0){
                    newFieldObj.error = '受理时间不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }
            case 'cuName':{
                if(value.length == 0){
                    newFieldObj.error = '客户名称不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }
            case 'cuPhone':{
                if(value.length == 0){
                    newFieldObj.error = '客户电话不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else if(!(/^1[34578]\d{9}$/.test(value))){
                    newFieldObj.error = '电话号码格式错误';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }                
            case 'waterType':{
                if(value == undefined){
                    newFieldObj.error = '申请类型不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }  
            case 'inAddress':{
                if(value.length == 0){
                    newFieldObj.error = '接水地址不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }
            case 'linkmanName':{
                if(value.length == 0){
                    newFieldObj.error = '联系人姓名不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;   
            }   
            case 'cuAddress':{
                if(value.length == 0){
                    newFieldObj.error = '联系人地址不能为空';  
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                } else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;                                                       
            }  
            
            case 'linkmanPhone':{// /^(0[0-9]{2,3}/-)?([2-9][0-9]{6,7})+(/-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])/d{8}$)/
            //(/^1[34578]\d{9}$/)
                if(value.length == 0){  
                    newFieldObj.error = '联系人电话不能为空';  
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else if(!(/^1[34578]\d{9}$/.test(value))){
                    newFieldObj.error = '电话号码格式错误';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }  
            case 'linkmanIDCARD':{
                if(value.length == 0){
                    newFieldObj.error = '身份证号码不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else if(!(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(value))){
                    newFieldObj.error = '身份证号码格式错误';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;                             
                    newFieldObj.tips = true;
                }
                break;                  
            }
            case 'linkmanZip':{
                if(value.length == 0){
                    newFieldObj.error = '邮政编码不能为空';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else if(!(/^[1-9][0-9]{5}$/.test(value))){
                    newFieldObj.error = '邮政编码错误';
                    newFieldObj.valid = false;
                    newFieldObj.tips = false;
                }else {
                    newFieldObj.error = '';
                    newFieldObj.valid = true;
                    newFieldObj.tips = true;
                }
                break;
            }
        }
        this.setState({
            form: {
                ...form,
                [field]: newFieldObj
            }
        });
    }    
          
    /*提交按钮*/        
    handleSubmit() {  
        const {form: {acceptName, acceptId, regDate ,acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip}} = this.state;
        if (!acceptName.valid || !acceptId.valid || !regDate.valid || !acceptTime.valid || !cuName.valid || !cuPhone.valid || !waterType.valid || !inAddress.valid || !linkmanName.valid || !linkmanPhone.valid || !cuAddress.valid || !linkmanIDCARD.valid || !linkmanZip.valid) {
            this.setState({
                form: {
                    acceptName: {
                        valid: acceptName.value.length !== 0 ,
                        value:acceptName.value,
                        tips: acceptName.value.length !== 0 ,
                        error: acceptName.value.length == 0 ? '项目名称不能为空' : '',
                    },
                    acceptId: {
                        valid: acceptId.value.length !== 0 ,
                        value:acceptId.value,
                        tips: acceptId.value.length !== 0 ,
                        error: acceptId.value.length == 0 ? '受理号码不能为空' : '',
                    },
                    regDate: {
                        valid: regDate.value.length !== 0 ,
                        value:regDate.value,
                        tips: regDate.value.length !== 0 ,
                        error: regDate.value.length == 0 ? '登记日期不能为空' : '',
                    },
                    acceptTime: {
                        valid: acceptTime.value.length !== 0 ,
                        value:acceptTime.value,
                        tips: acceptTime.value.length !== 0 ,
                        error: acceptTime.value.length == 0 ? '受理时间不能为空' : '',
                    },
                    cuName: {
                        valid: cuName.value.length !== 0 ,
                        value:cuName.value,
                        tips: cuName.value.length !== 0 ,
                        error: cuName.value.length == 0 ? '客户名称不能为空' : '',
                    },
                    cuPhone: {
                        valid: !(cuPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(cuPhone.value))),
                        value:cuPhone.value,
                        tips: !(cuPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(cuPhone.value))),
                        error: cuPhone.value.length == 0 ? '客户电话不能为空' : !(/^1[34578]\d{9}$/.test(cuPhone.value)) ? '请输入正确的电话号码' : '',
                    },
                    waterType: {
                        valid: waterType.value.length !== 0 ,
                        value:waterType.value,
                        tips: waterType.value.length !== 0 ,
                        error: waterType.value.length == 0 ? '申请类型不能为空' : '',
                    },
                    inAddress: {
                        valid: inAddress.value.length !== 0 ,
                        value:inAddress.value,
                        tips: inAddress.value.length !== 0 ,
                        error: inAddress.value.length == 0 ? '接水地址不能为空' : '',
                    },
                    linkmanName: {
                        valid: linkmanName.value.length !== 0,
                        value:linkmanName.value,
                        tips: linkmanName.value.length !== 0,
                        error: linkmanName.value.length == 0 ? '联系人姓名不能为空' : '',
                    },
                    linkmanPhone: {
                        valid: !(linkmanPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(linkmanPhone.value))) ,
                        value:linkmanPhone.value,
                        tips: !(linkmanPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(linkmanPhone.value))) ,
                        error: linkmanPhone.value.length == 0 ? '联系电话不能为空' : !(/^1[34578]\d{9}$/.test(linkmanPhone.value)) ? '请输入正确的电话号码' : '',
                    },       
                    cuAddress: {
                        valid: cuAddress.value.length !== 0,
                        value: cuAddress.value,
                        tips: cuAddress.value.length !== 0,
                        error: cuAddress.value.length == 0 ? '客户地址不能为空' : '',
                    },
                    linkmanIDCARD: {
                        valid: !(linkmanIDCARD.value.length == 0 || !(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(linkmanIDCARD.value))),
                        value:linkmanIDCARD.value,
                        tips: !(linkmanIDCARD.value.length == 0 || !(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(linkmanIDCARD.value))),
                        error: linkmanIDCARD.value.length == 0 ? '身份证号码不能为空' : !(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(linkmanIDCARD.value)) ? '请输入正确的身份证号码' : '',
                    },
                    linkmanZip: {
                        valid: !(linkmanZip.value.length == 0 || !(/^[1-9][0-9]{5}$/.test(linkmanZip.value))),
                        value:linkmanZip.value,
                        tips: !(linkmanZip.value.length == 0 || !(/^[1-9][0-9]{5}$/.test(linkmanZip.value))),
                        error: linkmanZip.value.length == 0 ? '邮政编码不能为空' : !(/^[1-9][0-9]{5}$/.test(linkmanZip.value)) ? '请输入正确的邮政编码' : '',
                    },
                }
            })
            return
        }
        this.AddNewBusiness(encodeURI(acceptName.value), acceptId.value, regDate.value, acceptTime.value, encodeURI(cuName.value), cuPhone.value, encodeURI(waterType.value), encodeURI(inAddress.value), encodeURI(linkmanName.value), linkmanPhone.value, encodeURI(cuAddress.value), linkmanIDCARD.value, linkmanZip.value, encodeURI(this.refs.remark.value))

    }
    /**修改业务*/
    handleEdit() {
        const {form: {acceptName, acceptId, regDate ,acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip}} = this.state;
        if (!acceptName.valid || !acceptId.valid || !regDate.valid || !acceptTime.valid || !cuName.valid || !cuPhone.valid || !waterType.valid || !inAddress.valid || !linkmanName.valid || !linkmanPhone.valid || !cuAddress.valid || !linkmanIDCARD.valid || !linkmanZip.valid) {

            this.setState({
                form: {
                    acceptName: {
                        valid: acceptName.value.length !== 0 ,
                        value:acceptName.value,
                        tips: acceptName.value.length !== 0 ,
                        error: acceptName.value.length == 0 ? '项目名称不能为空' : '',
                    },
                    acceptId: {
                        valid: acceptId.value.length !== 0 ,
                        value:acceptId.value,
                        tips: acceptId.value.length !== 0 ,
                        error: acceptId.value.length == 0 ? '受理号码不能为空' : '',
                    },
                    regDate: {
                        valid: regDate.value !== null ,
                        value:regDate.value,
                        tips: regDate.value !== null ,
                        error: regDate.value == null ? '登记日期不能为空' : '',
                    },
                    acceptTime: {
                        valid: acceptTime.value !== null ,
                        value:acceptTime.value,
                        tips: acceptTime.value !== null ,
                        error: acceptTime.value == null ? '受理时间不能为空' : '',
                    },
                    cuName: {
                        valid: cuName.value.length !== 0 ,
                        value:cuName.value,
                        tips: cuName.value.length !== 0 ,
                        error: cuName.value.length == 0 ? '客户名称不能为空' : '',
                    },
                    cuPhone: {
                        valid: !(cuPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(cuPhone.value))),
                        value:cuPhone.value,
                        tips: !(cuPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(cuPhone.value))),
                        error: cuPhone.value.length == 0 ? '客户电话不能为空' : !(/^1[34578]\d{9}$/.test(cuPhone.value)) ? '请输入正确的电话号码' : '',
                    },
                    waterType: {
                        valid: waterType.value.length !== 0 ,
                        value:waterType.value,
                        tips: waterType.value.length !== 0 ,
                        error: waterType.value.length == 0 ? '申请类型不能为空' : '',
                    },
                    inAddress: {
                        valid: inAddress.value.length !== 0 ,
                        value:inAddress.value,
                        tips: inAddress.value.length !== 0 ,
                        error: inAddress.value.length == 0 ? '接水地址不能为空' : '',
                    },
                    linkmanName: {
                        valid: linkmanName.value.length !== 0,
                        value:linkmanName.value,
                        tips: linkmanName.value.length !== 0,
                        error: linkmanName.value.length == 0 ? '联系人姓名不能为空' : '',
                    },
                    linkmanPhone: {
                        valid: !(linkmanPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(linkmanPhone.value))) ,
                        value:linkmanPhone.value,
                        tips: !(linkmanPhone.value.length == 0 || !(/^1[34578]\d{9}$/.test(linkmanPhone.value))) ,
                        error: linkmanPhone.value.length == 0 ? '联系电话不能为空' : !(/^1[34578]\d{9}$/.test(linkmanPhone.value)) ? '请输入正确的电话号码' : '',
                    },
                    cuAddress: {
                        valid: cuAddress.value.length !== 0,
                        value: cuAddress.value,
                        tips: cuAddress.value.length !== 0,
                        error: cuAddress.value.length == 0 ? '客户地址不能为空' : '',
                    },
                    linkmanIDCARD: {
                        valid: !(linkmanIDCARD.value.length == 0 || !(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(linkmanIDCARD.value))),
                        value:linkmanIDCARD.value,
                        tips: !(linkmanIDCARD.value.length == 0 || !(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(linkmanIDCARD.value))),
                        error: linkmanIDCARD.value.length == 0 ? '身份证号码不能为空' : !(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(linkmanIDCARD.value)) ? '请输入正确的身份证号码' : '',
                    },
                    linkmanZip: {
                        valid: !(linkmanZip.value.length == 0 || !(/^[1-9][0-9]{5}$/.test(linkmanZip.value))),
                        value:linkmanZip.value,
                        tips: !(linkmanZip.value.length == 0 || !(/^[1-9][0-9]{5}$/.test(linkmanZip.value))),
                        error: linkmanZip.value.length == 0 ? '邮政编码不能为空' : !(/^[1-9][0-9]{5}$/.test(linkmanZip.value)) ? '请输入正确的邮政编码' : '',
                    },
                }
            })
            return
        }
        this.EditNewBusiness(Number(this.state.chooseValue),0,this.props.QueryRes.baseInfo.version,encodeURI(acceptName.value), acceptId.value,regDate.value,acceptTime.value , encodeURI(cuName.value), cuPhone.value, waterType.value, encodeURI(inAddress.value), encodeURI(linkmanName.value), linkmanPhone.value, encodeURI(cuAddress.value), linkmanIDCARD.value, linkmanZip.value, encodeURI(this.refs.remark.value))
    }
    componentWillReceiveProps(nextProps) {

        let _self = this;
        if(nextProps.succform){
            const props = {
                result : nextProps.formdata
            };
            Modal.success({      
                width :'600px',
                title : '新业务创建成功！',
                okText :'关闭',
                onOk :() => {
                    this.AdminLoadTasksList(1);
                    _self.clearInput();
                    _self.adminResultActionCreator(false,null);
                },
                content : <FileUpload {...props}/>
            });
        } else if(nextProps.QueryRes !== null){
            _self.setState({
                form:{
                    acceptName:{
                        value:decodeURI(nextProps.QueryRes.baseInfo.acceptName),
                        tips:nextProps.QueryRes.baseInfo.acceptName !== 0,
                        valid:true,
                        error:''
                    },
                    regDate:{
                        value:null,
                        tips:false,
                        valid:false,
                        error:'登记日期不能为空'
                    },
                    acceptId:{
                        value:nextProps.QueryRes.baseInfo.acceptId,
                        tips:nextProps.QueryRes.baseInfo.acceptId !== 0,
                        valid:true,
                        error:''
                    },
                    acceptTime:{
                        value:null,
                        valid:false,
                        tips:false,
                        error:'受理时间不能为空'
                    },
                    cuName:{
                        value:decodeURI(nextProps.QueryRes.baseInfo.cuName),
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.cuName !== 0,
                        error:''
                    },
                    cuPhone:{
                        value:nextProps.QueryRes.baseInfo.cuPhone,
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.cuPhone !== 0,
                        error:''
                    },
                    waterType:{
                        value:nextProps.QueryRes.baseInfo.waterType,
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.waterType !== 0,
                        error:''
                    },
                    inAddress:{
                        value:decodeURI(nextProps.QueryRes.baseInfo.inAddress),
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.inAddress !== 0,
                        error:''
                    },
                    linkmanName:{
                        value:decodeURI(nextProps.QueryRes.baseInfo.linkmanName),
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.linkmanName !== 0,
                        error:''
                    },
                    linkmanPhone:{
                        value:nextProps.QueryRes.baseInfo.linkmanPhone,
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.linkmanPhone !== 0,
                        error:''
                    },
                    cuAddress:{
                        value:decodeURI(nextProps.QueryRes.baseInfo.cuAddress),
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.cuAddress !== 0,
                        error:''
                    },      
                    linkmanIDCARD:{
                        value:nextProps.QueryRes.baseInfo.linkmanIDCARD,
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.linkmanIDCARD !== 0,
                        error:''
                    },
                    linkmanZip:{
                        value:nextProps.QueryRes.baseInfo.linkmanZip,
                        valid:true,
                        tips:nextProps.QueryRes.baseInfo.linkmanZip !== 0,
                        error:''
                    },                             
                }
            })        
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return true
    }

    handleOk = () => {  
        this.setState({   
            visible: true,
            value:null,
        });
    }
    handleCancel = () => {
        this.setState({      
            visible: false,       
            value:null,
            showTips : false,   
         });
    }

    RadioOnChange = (e) => {
        this.setState({
            chooseValue: e.target.value,
        });
    }
    /**修改内容提交*/
    EditSubmit() {
        let _self = this;  
        if(this.state.chooseValue == null){
            _self.setState({
                showTips : true,
            })        
            return false;
        }
        this.AdminLoadIDInfo(this.state.chooseValue);
        setTimeout(() =>
            _self.setState({
                visible : false,
             }),
            1000);
    }
    render() {
        const props = {                      
            status : true
        }
        if(this.props.res == null){
            return (         
                <Loading {...props}/>         
            );
        }  
        const {visible,form: {acceptName, acceptId, regDate ,acceptTime, cuName, cuPhone, waterType, inAddress, linkmanName, linkmanPhone, cuAddress, linkmanIDCARD, linkmanZip}} = this.state;

        const handleLoading = {  
            status : this.props.adminLoading ? true : false
        }                  
        return (

                <div className="MainContent">
                    <div className="MainContent-In">
                        <div style={{position:'absolute',overflow:'auto',top:'0',left:'0',right:'0',bottom:'0'}}>
                            <div className={ this.props.adminLoading ? 'LoadingOuter Isloading' : 'LoadingOuter'}>
                                <div style={{position:'relative',width:'100%',height:'100%'}}>
                                    <Loading {...handleLoading}/>
                                </div> 
                                <div className="LoadingBlur">
                                </div>
                            </div>    
                        </div>
                        <div className='addOut' ref="addOut">
                            {
                                this.props.res.正在重新受理的任务 == undefined || this.props.res.正在重新受理的任务.dataSize == 0 ?　null :  <div className="fixedBtn">
                                    <div className="Btn" style={{background:'#3498db'}} onClick={this.clearInput}>新增</div>
                                    <Badge count={this.props.res.正在重新受理的任务.dataSize}>
                                        <div className="Btn" style={{background:'#00a854'}} onClick={this.handleOk}>修改</div>
                                    </Badge>
                                    <Modal
                                        visible={visible}
                                        title="修改项目"
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                        maskClosable={false}
                                        footer={null}
                                    >
                                        <div className='editOuter'>
                                            <div className='EditHead'>
                                                <h4>请选择需要修改的项目{this.state.showTips ? <span style={{color:'#F04134'}}>（必须选择一项）</span> : null}</h4>
                                            </div>
                                            <div className='EditBody'>
                                                <RadioGroup onChange={this.RadioOnChange} value={this.state.chooseValue}>
                                                    {
                                                        this.props.res.正在重新受理的任务.data.map((ele,i)=>{
                                                            return (
                                                                <Radio key={ele.id} value={ele.id}>{decodeURI(ele.acceptName)+'（ID：'+ele.id+'）'}</Radio>
                                                            )
                                                        })
                                                    }
                                                </RadioGroup>
                                            </div>
                                            <div className='Editfoot'>
                                                <Button className='sure' onClick={this.EditSubmit} loading={this.props.OtherIsLoading}>确定</Button>
                                                <button className='exit' onClick={this.handleCancel}>取消</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            }

                            <div className='TopTitle'>
                                <div className='iconOut'></div>
                                <h3 className='pageTitle'>发布新业务</h3>
                            </div>
                            {
                                this.props.QueryRes == null ? null : <div className='editReason'>
                                    <Alert message="重新调派原因"
                                           description={decodeURI(this.props.QueryRes.baseInfo.remark)}
                                           type="error"
                                           closable
                                    />
                                </div> 
                            }
                            <div className='form-group'>
                                <div className='form-group-in clearfloat'>
                                    <div className='ipt-list'>
                                        <h3 className='formTitle'><i className='iconfont icon-project' />项目信息</h3>
                                        <div className='formCont'>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>

                                                    <label className="iptName"><span>项目名称：</span></label>
                                                    <div className={acceptName.tips == null ? 'form-ipt' : acceptName.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" className='ipt'
                                                               placeholder='请输入项目名称'
                                                               value={acceptName.value}
                                                               onChange={(e) => this.handleValueChange('acceptName', e.target.value)}
                                                        />
                                                        {               
                                                            acceptName.tips == null ? null : acceptName.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        
                                                        <div className='ipt-mes'>{!acceptName.valid && <span>{acceptName.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>登记日期：</span></label>
                                                    <div className={regDate.tips == null ? 'right-cont' : regDate.tips == false ? 'right-cont right-cont-error' : 'right-cont right-cont-right'} >
                                                        <DatePicker
                                                            size='large'
                                                            format={dateFormat}
                                                            placeholder="请选择登记日期"
                                                            value={regDate.value ? moment(regDate.value, "YYYY-MM-DD HH:mm:ss") : null}
                                                            getCalendarContainer={() => this.refs.markTimes}
                                                            onChange={(value,dateString) => this.handleValueChange('regDate', dateString)}
                                                        />
                                                        <div className='popupdate' >
                                                            <div className='popupdateIn' ref='markTimes'></div>
                                                        </div>
                                                        <div className='ipt-mes'>{!regDate.valid && <span>{regDate.error}</span>}</div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>受理号码：</span></label>
                                                    <div className={acceptId.tips == null ? 'form-ipt' : acceptId.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" className='ipt'
                                                               value={acceptId.value}
                                                               onChange={(e) => this.handleValueChange('acceptId', e.target.value)}
                                                               placeholder='请输入受理号码'/>
                                                        {
                                                            acceptId.tips == null ? null : acceptId.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!acceptId.valid && <span>{acceptId.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>受理时间：</span></label>
                                                    <div className={acceptTime.tips == null ? 'right-cont' : acceptTime.tips == false ? 'right-cont right-cont-error' : 'right-cont right-cont-right'}>
                                                        <DatePicker
                                                            showTime
                                                            format="YYYY-MM-DD HH:mm:ss"
                                                            placeholder="请选择受理时间"
                                                            value={acceptTime.value ? moment(acceptTime.value, "YYYY-MM-DD HH:mm:ss") : null}
                                                            onChange={(value,dateString) => this.handleValueChange('acceptTime', dateString)}
                                                            getCalendarContainer={() => this.refs.Times}
                                                        />
                                                        <div className='popupdate' >
                                                            <div className='popupdateIn' ref='Times'></div>
                                                        </div>
                                                        <div className='ipt-mes'>{!acceptTime.valid && <span>{acceptTime.error}</span>}</div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                    <div className='ipt-list'>
                                        <h3 className='formTitle'><i className='iconfont icon-userInfo' />客户信息</h3>
                                        <div className='formCont'>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>客户名称：</span></label>
                                                    <div className={cuName.tips == null ? 'form-ipt' : cuName.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" className='ipt'
                                                               value={cuName.value}
                                                               onChange={(e) => this.handleValueChange('cuName', e.target.value)}
                                                               placeholder='请输入客户名称'/>
                                                        {
                                                            cuName.tips == null ? null : cuName.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!cuName.valid && <span>{cuName.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>客户电话：</span></label>
                                                    <div className={cuPhone.tips == null ? 'form-ipt' : cuPhone.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" maxLength='11'
                                                               value={cuPhone.value}
                                                               onChange={(e) => this.handleValueChange('cuPhone', e.target.value)}
                                                               className='ipt'  placeholder='请输入客户电话'/>
                                                        {
                                                            cuPhone.tips == null ? null : cuPhone.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!cuPhone.valid && <span>{cuPhone.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>申请类型：</span></label>
                                                    <div className={waterType.tips == null ? 'right-cont' : waterType.tips == false ? 'right-cont right-cont-select-error' : 'right-cont right-cont-select-right'}>
                                                        <Select
                                                            style={{ width: '100%',height: '100%',display: 'block'}}
                                                            allowClear={true}
                                                            placeholder="选择申请类型"
                                                            value={waterType.value ? waterType.value : undefined}
                                                            defaultValue="0001"
                                                            optionFilterProp="children"
                                                            onChange={(value) => this.handleValueChange('waterType', value)}
                                                            getPopupContainer={() => this.refs.applyType}
                                                            dropdownStyle={{textAlign:'left'}}
                                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                        >
                                                            <Option value="0001">56</Option>
                                                            <Option value="0002">Lucy</Option>
                                                            <Option value="0003">Tom</Option>
                                                        </Select>
                                                        <div className='popupdate' >
                                                            <div className='popupdateIn' ref='applyType'></div>
                                                        </div>
                                                        <div className='ipt-mes'>{!waterType.valid && <span>{waterType.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>接水地址：</span></label>
                                                    <div className={inAddress.tips == null ? 'form-ipt' : inAddress.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text"
                                                               className='ipt'
                                                               value={inAddress.value}
                                                               onChange={(e) => this.handleValueChange('inAddress', e.target.value)}
                                                               placeholder='请输入接水地址'/>
                                                        {
                                                            inAddress.tips == null ? null : inAddress.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!inAddress.valid && <span>{inAddress.error}</span>}</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='ipt-list'>
                                        <h3 className='formTitle'><i className='iconfont icon-tel' />联系人信息</h3>
                                        <div className='formCont'>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>联系人姓名：</span></label>
                                                    <div className={linkmanName.tips == null ? 'form-ipt' : linkmanName.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" className='ipt'
                                                               value={linkmanName.value}
                                                               onChange={(e) => this.handleValueChange('linkmanName', e.target.value)}
                                                               placeholder='请输入联系人姓名'/>
                                                        {
                                                            linkmanName.tips == null ? null : linkmanName.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!linkmanName.valid && <span>{linkmanName.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>联系地址：</span></label>
                                                    <div className={cuAddress.tips == null ? 'form-ipt' : cuAddress.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" className='ipt'
                                                               value={cuAddress.value}
                                                               onChange={(e) => this.handleValueChange('cuAddress', e.target.value)}
                                                               placeholder='请输入联系地址'/>
                                                        {
                                                            cuAddress.tips == null ? null : cuAddress.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!cuAddress.valid && <span>{cuAddress.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>联系电话：</span></label>
                                                    <div className={linkmanPhone.tips == null ? 'form-ipt' : linkmanPhone.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="tel" maxLength='11'
                                                               className='ipt'
                                                               value={linkmanPhone.value}
                                                               onChange={(e) => this.handleValueChange('linkmanPhone', e.target.value)}
                                                               placeholder='请输入联系电话'/>
                                                        {
                                                            linkmanPhone.tips == null ? null : linkmanPhone.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!linkmanPhone.valid && <span>{linkmanPhone.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>身份证号码：</span></label>
                                                    <div className={linkmanIDCARD.tips == null ? 'form-ipt' : linkmanIDCARD.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" className='ipt' maxLength="18"
                                                               value={linkmanIDCARD.value}
                                                               onChange={(e) => this.handleValueChange('linkmanIDCARD', e.target.value)}
                                                               placeholder='请输入身份证号码'
                                                        />
                                                        {
                                                            linkmanIDCARD.tips == null ? null : linkmanIDCARD.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!linkmanIDCARD.valid && <span>{linkmanIDCARD.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='formCont-ipt-list'>
                                                <div className='ipt-list-out' style={{height:'46px'}}>
                                                    <label className="iptName"><span>邮政编码：</span></label>
                                                    <div className={linkmanZip.tips == null ? 'form-ipt' : linkmanZip.tips == false ? 'form-ipt form-ipt-error' : 'form-ipt form-ipt-right'}>
                                                        <input type="text" className='ipt' maxLength='6'
                                                               value={linkmanZip.value}
                                                               onChange={(e) => this.handleValueChange('linkmanZip', e.target.value)}
                                                               placeholder='请输入邮政编码'/>
                                                        {
                                                            linkmanZip.tips == null ? null : linkmanZip.tips == false ? <div className="TipsIcon">
                                                                <Icon type="close-circle" />
                                                            </div> :<div className="TipsIcon">
                                                                <Icon type="check-circle" />
                                                            </div>
                                                        }
                                                        <div className='ipt-mes'>{!linkmanZip.valid && <span>{linkmanZip.error}</span>}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ipt-list' style={{border:'2px solid transparent'}}>
                                        <h3 className='formTitle'><i className='iconfont icon-other' />其他</h3>
                                        <div className='formCont'>
                                            <div className='formCont-ipt-list' style={{width:'100%'}}>
                                                <div className='ipt-list-out'>
                                                    <label className="iptName" >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label>
                                                    <div className='form-ipt'>
                                                        <textarea type="text" ref="remark" className='ipt' placeholder='请输入备注'/>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="form-btn">
                                        {
                                            this.props.QueryRes == null ? <button onClick={this.handleSubmit.bind(this)}>立即发布</button> : <button onClick={this.handleEdit.bind(this)}>确认修改</button>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className='tips'>Tips：为保障用户数据的安全、真实性，请认真填写每一项.</div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default connect(state => ({
    adminLoading: state.adminReducer.adminLoading,
    succform: state.adminReducer.succform,
    formdata: state.adminReducer.formdata,
    ResponseNum: state.adminReducer.ResponseNum,
    QueryRes: state.adminReducer.QueryRes,
    res: state.adminReducer.res,
    OtherIsLoading: state.adminReducer.OtherIsLoading,
}))(Add);