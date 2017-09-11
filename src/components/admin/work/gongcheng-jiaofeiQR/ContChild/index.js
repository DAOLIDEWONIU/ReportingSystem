'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {AdminLoadIDInfo,AdminLoadIDQueryRes,adminPagenumActionCreator,SuccRequest,WorkJiaoFei,activeClassName} from '../../../../../actions/admin';

import { DatePicker , Icon , Radio , Tooltip , InputNumber , Input , Spin , Modal} from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Loading from '../../../../../common/components/common/loading';
class workContChild extends React.Component {
    constructor() {
        super();
        this.adviceonChange = this.adviceonChange.bind(this);
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.SuccRequest = this.SuccRequest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.WorkJiaoFei = this.WorkJiaoFei.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
        this.state = {
            adviceShow : false ,
            chooseId : '2',
            form: {//valid表示该值的有效状态，value表示该表单具体的值，error表示错误提示信息：
                notifyMoney: { //缴费收到时间
                    valid: false,
                    value: '',
                    error: ''
                },
                payerName: {// 通知到的用户姓名
                    valid: false,
                    value: '',
                    error: ''
                },
                payerPhone: {// 通知到的用户电话
                    valid: false,
                    value: '',
                    error: ''
                },
                notifyPayTime: {//通知缴费时间
                    valid: false,
                    value: '',
                    error: ''
                },
                handler: {// 经办人
                    valid: false,
                    value: '',
                    error: ''
                },
                asseId: {//安装编号
                    valid: false,
                    value: '',
                    error: ''
                },
                projBudget: {//工程预算额
                    valid: false,
                    value: '',
                    error: ''
                },
                cuPhone: {//用户电话（对方）
                    valid: false,
                    value: '',
                    error: ''
                },
                usPhone: {//客服电话（我方）
                    valid: false,
                    value: '',
                    error: ''
                },
                sendTime: {// 发出时间
                    valid: false,
                    value: '',
                    error: ''
                },
                exceeds: {//期限
                    valid: false,
                    value: '',
                    error: ''
                },
                preMoney: {//缴费金额
                    valid: false,
                    value: '',
                    error: ''
                },
                payTime: {//收到缴费时间
                    valid: false,
                    value: '',
                    error: ''
                },//notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,exceeds,preMoney,payTime

            }
        }
    }
    onclicktoback() {
        browserHistory.go(-1);
        this.AdminLoadIDQueryRes(null);
    }

    // 根据id号查找 返回的内容QueryRes
    AdminLoadIDQueryRes(QueryRes) {
        this.props.dispatch(AdminLoadIDQueryRes(QueryRes))
    }
    // 根据id号查找
    AdminLoadIDInfo(QueryId){
        this.props.dispatch(AdminLoadIDInfo(QueryId))
    }
    Designkancha(projId,surveyAndDesignFlag,surveyRecord){
        this.props.dispatch(Designkancha(projId,surveyAndDesignFlag,surveyRecord))
    }
    // 分页操作
    adminPagenumActionCreator(resultFlag,page){
        this.props.dispatch(adminPagenumActionCreator(resultFlag,page))
    }         
    SuccRequest(SRequest){
        this.props.dispatch(SuccRequest(SRequest))
    }

    //工程缴费请求

    WorkJiaoFei(projId,notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,usPhone,exceeds,preMoney,payTime,remark,operFlag){
        this.props.dispatch(WorkJiaoFei(projId,notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,usPhone,exceeds,preMoney,payTime,remark,operFlag))
    }

    componentWillMount() {
        this.AdminLoadIDInfo(this.props.params.id);
    }

    adviceonChange(e) {
        this.setState({
            chooseId:e.target.value
        })
    }
    activeClassName(markId){
        this.props.dispatch(activeClassName(markId))
    }

    handleValueChange (field, value, type = 'string') {
        if (type === 'number') {
            value = +value;
        }
        const {form} = this.state;

        const newFieldObj = {value, valid: true, error: ''};

        switch (field) {//notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,exceeds,preMoney,payTime
            case 'notifyMoney': {
                if (value.length == 0) {
                    newFieldObj.error = '通知消费金额不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'payerName': {
                if(value.length == 0){
                    newFieldObj.error = '通知到的用户不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'payerPhone':{
                if(value.length == 0){
                    newFieldObj.error = '通知到的用户电话不能为空';
                    newFieldObj.valid = false;
                }else if(!(/^1[34578]\d{9}$/.test(value))){
                    newFieldObj.error = '电话号码格式错误';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'exceeds':{
                if(value == undefined){
                    newFieldObj.error = '缴费期限不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'notifyPayTime':{
                if(value.length == 0){
                    newFieldObj.error = '通知缴费时间不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }

            case 'handler':{
                if(value.length == 0){
                    newFieldObj.error = '经办人员不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'asseId':{
                if(value.length == 0){
                    newFieldObj.error = '安装编号不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'projBudget':{
                if(value.length == 0){
                    newFieldObj.error = '工程预算额不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'cuPhone':{
                if(value.length == 0){
                    newFieldObj.error = '用户电话不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'sendTime':{
                if(value.length == 0){
                    newFieldObj.error = '发出时间不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'preMoney':{
                if(value.length == 0){
                    newFieldObj.error = '缴费金额不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'usPhone':{
                if(value.length == 0){
                    newFieldObj.error = '客服电话不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }

            case 'payTime':{
                if(value.length == 0){
                    newFieldObj.error = '收到缴费时间不能为空';
                    newFieldObj.valid = false;
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

    handleSubmit() {
        const {form: {notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,usPhone,exceeds,preMoney,payTime},chooseId} = this.state;
        const { QueryRes } = this.props;
        if(chooseId == 1){
            if(!notifyMoney.valid || !payerName.valid || !payerPhone.valid || !notifyPayTime.valid || !handler.valid || !asseId.valid || !projBudget.valid || !cuPhone.valid || !usPhone.valid || !sendTime || !exceeds.valid){
                Modal.error({
                    title: '请填写正确的信息重试',
                    okText:'确定'
                });
                return
            }

        }else if(chooseId == 2){
            if(!payTime.valid || !preMoney.valid || !payerPhone.valid){
                Modal.error({
                    title: '请填写正确的信息重试',
                    okText:'确定'
                });
                return
            }

        }
        console.log('this.props.QueryRes',this.props.QueryRes)
        //projId,notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,usPhone,exceeds,preMoney,payTime,remark,operFlag
        this.WorkJiaoFei(Number(this.props.params.id),Number(QueryRes.baseInfo.notifyMoney),QueryRes.baseInfo.payerName,payerPhone.value,QueryRes.baseInfo.notifyPayTime,QueryRes.baseInfo.handler,QueryRes.baseInfo.asseId,Number(QueryRes.baseInfo.impleSchedule.projBudget),QueryRes.baseInfo.cuPhone,QueryRes.baseInfo.impleSchedule.sendTime,QueryRes.baseInfo.usPhone,Number(QueryRes.baseInfo.impleSchedule.exceeds),Number(preMoney.value),QueryRes.baseInfo.notifyPayTime,encodeURI(this.refs.remark.value),Number(this.state.chooseId))
    }

    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.SRequest){
            /**重新获取列表数据*/
            this.props.AdminReturnTotalNum(this.props.TasksListId);
            this.SuccRequest(false);
            this.adminPagenumActionCreator(this.props.TasksListId,0);
            if(!nextProps.adminLoading){
                browserHistory.replace('/work/gongcheng-jiaofei');
            }
        }
        return true;
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.markId == null) {
            this.activeClassName(this.props.params.id);
        }
    }

    render() {
        const { QueryRes,TasksListId} = this.props;
        const adviceClassName = this.state.adviceShow ? 'advice' : 'advice hide';
        const TipsStyle = {
            color:'#d9534f',
            marginLeft:'6px'
        }
        const props = {
            status : true
        }
        const {form: {notifyMoney,payerName,payerPhone,notifyPayTime,handler,asseId,projBudget,cuPhone,sendTime,usPhone,exceeds,preMoney,payTime}} = this.state;
        if(QueryRes == null ){
            return (
                <Loading {...props}/>   
            );
        }     
        return (
               
                <div className='taskInfo'>
                    <div className='taskInfo-in'>
                        <Tooltip placement="top" title="返回上一级">
                           <div className='backicon' onClick={this.onclicktoback.bind(this)}>
                                <span className="icon-f">
                                    <Icon type="arrow-left" />
                                </span>
                            </div>
                        </Tooltip>
                        <h3 className='toptitle'>
                            工程缴费 {this.props.params.id}
                            {
                                TasksListId == 2 ?  <div className="codeMark succ"></div> :  TasksListId == 3 ? <div className="codeMark stop"></div> : null
                            }
                        </h3>
                        <div className={TasksListId == 3 ? 'mes IsStop' : 'mes'}>
                            <div className='mes-group'>
                                <h3>项目信息<i className='iconfont icon-project'/></h3>
                                <div className='mes-group-cont'>
                                    <div className='mes-across'>
                                        <span className='name' style={{color:'#468847'}}>项目状态：</span>
                                        <span className='mes-info' style={{color:'#468847'}}><Icon type="check-circle"  style={{marginRight:'6px'}}/>审批已通过</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>项目名称：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.acceptName)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计号码：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.desiId}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>审核人员：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.desiBooks[0].checkAudit)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>审核时间：</span>
                                        <span className='mes-info'>{QueryRes.desiBooks[0].checkBegin}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>审定人员：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.desiBooks[0].checkAppr)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>审定时间：</span>
                                        <span className='mes-info'>{QueryRes.desiBooks[0].checkEnd}</span>
                                    </div>
                                </div>
                            </div>
                            {
                                TasksListId == 3 ? null :  <div className='mes-group ipt-mes-group'>
                                    <h3>
                                        缴费信息
                                        <i className='iconfont icon-other'/>
                                    </h3>
                                    <div className='mes-group-cont'>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:0}}>通知缴费时间：</span>
                                            <span className='mes-info' ref="InfoTimes">
                                                {QueryRes.baseInfo.notifyPayTime}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:0}}>发出时间：</span>
                                            <span className='mes-info' ref="sendTimes">
                                                {QueryRes.baseInfo.impleSchedule.sendTime}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>通知到的用户：</span>
                                            <span className='mes-info'>
                                                 {decodeURI(QueryRes.baseInfo.payerName)}
                                            </span>
                                        </div>

                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>通知缴费金额：</span>
                                            <span className='mes-info'>
                                                 {QueryRes.baseInfo.notifyMoney}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>经办人员：</span>
                                            <span className='mes-info'>
                                                 {decodeURI(QueryRes.baseInfo.handler)}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>安装号码：</span>
                                            <span className='mes-info'>
                                                {QueryRes.baseInfo.asseId}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>工程预算额：</span>
                                            <span className='mes-info'>
                                                 {QueryRes.baseInfo.impleSchedule.projBudget}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>用户电话：</span>
                                            <span className='mes-info'>
                                                 {QueryRes.baseInfo.cuPhone}
                                            </span>
                                        </div>

                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>客服电话(我方)：</span>
                                        <span className='mes-info'>
                                            {QueryRes.baseInfo.usPhone}
                                        </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>缴费期限：</span>
                                            <span className='mes-group-cont'>
                                                 {QueryRes.baseInfo.impleSchedule.exceeds}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>通知到的用户电话：</span>
                                            <span className='mes-info'>
                                                <Input size="large"
                                                       disabled={(this.state.chooseId == 1 || this.state.chooseId == 2) ? false : true}
                                                       maxLength='11'
                                                       onChange={(e) => this.handleValueChange('payerPhone', e.target.value)}
                                                       placeholder="请输入通知到的用户电话" />
                                                {!payerPhone.valid && <span style={TipsStyle}>{payerPhone.error}</span>}
                                            </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>缴费金额：</span>
                                            <span className='mes-info'>
                                                <Input size="large"
                                                       disabled={this.state.chooseId == 2 ? false : true}
                                                       onChange={(e) => this.handleValueChange('preMoney', e.target.value)}
                                                       placeholder="请输入缴费金额" />
                                                {!preMoney.valid && <span style={TipsStyle}>{preMoney.error}</span>}
                                            </span>
                                        </div>      
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:0}}>收到缴费时间：</span>
                                            <span className='mes-info' ref="receiveTimes">
                                                <DatePicker
                                                    showTime
                                                    style={{width:'288px',height:'40px'}}
                                                    format="YYYY-MM-DD HH:mm:ss"
                                                    placeholder="请选择收到缴费时间"
                                                    disabled={this.state.chooseId == 2 ? false : true}
                                                    onChange={(value,dateString) => this.handleValueChange('payTime', dateString)}
                                                    getCalendarContainer={() => this.refs.receiveTimes}
                                                />
                                                {!payTime.valid && <span style={TipsStyle}>{payTime.error}</span>}
                                            </span>
                                            
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name'>备注：</span>
                                        <span className='mes-info'>
                                            <textarea placeholder="请输入备注" ref="remark"/>
                                        </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name'>审核意见：</span>
                                        <span className='mes-group-cont' style={{position:'relative'}}>
                                            <RadioGroup onChange={this.adviceonChange} defaultValue="2" size='large'>
                                                <RadioButton value="2">缴费确认</RadioButton>
                                                <RadioButton value="3">终止工程</RadioButton>
                                            </RadioGroup>
                                        </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' />
                                        <span className='mes-info-btn'>
                                             <button onClick={this.handleSubmit}>提交</button>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
        );
    }
}
export default connect(state => ({
    TasksListId: state.adminReducer.TasksListId,
    adminLoading: state.adminReducer.adminLoading,
    Pagesucc: state.adminReducer.Pagesucc,
    QueryId: state.adminReducer.QueryId,
    QueryRes: state.adminReducer.QueryRes,
    requestLoading: state.adminReducer.requestLoading,
    SRequest: state.adminReducer.SRequest,
    markId: state.adminReducer.markId,
}))(workContChild);
