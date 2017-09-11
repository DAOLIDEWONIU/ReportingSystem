'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import { Pagination , Icon , Radio , Tooltip , Spin , Select , Modal} from 'antd';
import {AdminLoadIDInfo,AdminLoadIDQueryRes,adminPagenumActionCreator,SuccRequest,AuditShejiSD,activeClassName} from '../../../../../actions/admin';
// import './index.scss';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import Loading from '../../../../../common/components/common/loading';
class auditContChild extends React.Component {
    constructor() {
        super();
        this.adviceonChange = this.adviceonChange.bind(this);
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.AuditShejiSD = this.AuditShejiSD.bind(this);
        this.SuccRequest = this.SuccRequest.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
        this.state = {
            auditId : false ,
            adviceShow : false,
            groupInit : false ,
            chooseId:'1',
            fixgroup:'1',
            fixgroupVal:'龙虎山小分队'

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
    // 分页操作
    adminPagenumActionCreator(resultFlag,page){
        this.props.dispatch(adminPagenumActionCreator(resultFlag,page))
    }
    /**工程设计审定请求*/
    AuditShejiSD(desiBookId,desiApproFlag,apprReason,impleTeam){
        this.props.dispatch(AuditShejiSD(desiBookId,desiApproFlag,apprReason,impleTeam))
    }

    SuccRequest(SRequest){
        this.props.dispatch(SuccRequest(SRequest))
    }

    componentWillMount() {
        this.AdminLoadIDInfo(this.props.params.id);
    }
    activeClassName(markId){
        this.props.dispatch(activeClassName(markId))
    }
    adviceonChange(e) {
        this.setState({
            chooseId : e.target.value
        })
        if(e.target.value == '2'){
            this.setState({
                adviceShow : true
            })
        }else{
             this.setState({
                adviceShow : false
            })
        }
    }
    fixgroup(e){
        this.setState({
            fixgroup : e.target.value
        })
        if(e.target.value == '2'){
            this.setState({
                groupInit : true
            })
        }else{
             this.setState({
                groupInit : false
            })
        }
    }
    fixgrouphandleChange(value) {
        this.setState({
            fixgroupVal : value
        })
    }

    formSubmit() {
        let adviceVal = null;
        let fixgroupVal = null;

        if(this.state.fixgroup == '2'){
            // return false;
            fixgroupVal = this.state.fixgroupVal;
        }
        if(this.state.chooseId == '2'){
            if(this.refs.Advice.value.length == 0){
                this.refs.Advice.focus();
                Modal.warning({
                    title: '审核不通过原因不能为空！',
                    content: '这里输入审核没有通过的原因，以便上一环节人员能及时有效更改.',
                    okText:'确定'
                });
                return false;
            }else {
                adviceVal = this.refs.Advice.value
            }
        }
        //
        // console.log('adviceVal',adviceVal)
        // console.log('chooseId',this.state.chooseId)
        // console.log('fixgroupVal',fixgroupVal)

        this.AuditShejiSD(this.props.QueryRes.desiBooks[0].id,Number(this.state.chooseId),adviceVal,fixgroupVal);

    }

    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.SRequest){
            /**重新获取列表数据*/
            this.props.AdminReturnTotalNum(1);
            this.SuccRequest(false);
            this.adminPagenumActionCreator(1,0);
            if(!nextProps.adminLoading){
                browserHistory.replace('/audit/gongchengsheji-sd');
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

        const {affixRes,QueryRes,requestLoading} = this.props;
        const auditId = this.state.auditId ? <div className='auditId-com auditId-true' /> : <div className='auditId-com auditId-false' /> ;
        const adviceClassName = this.state.adviceShow ? 'advice' : 'advice hide';

        const props = {
            status : true
        }
        if(QueryRes == null ){
            return (
                <Loading {...props}/>
            );
        }

        function handleChange(value) {
            console.log(`selected ${value}`);
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
                            设计审定 {this.props.params.id}
                            <div className='auditId'>{ auditId }</div>
                        </h3>
                        <div className='mes'>
                            <div className='mes-group'>
                                <h3>
                                    项目信息
                                    <i className='iconfont icon-project' />
                                </h3>
                                <div className='mes-group-cont'>
                                    <div className='mes-across'>
                                        <span className='name'>项目名称：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.acceptName)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>客户名称：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.cuName)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计号码：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.desiId}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计人员：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.desiName)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计指派时间：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.desiSentTime}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计完成时间：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.desiTime}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计进度：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.desiOver}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>工程说明：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.desiExplain)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>变更原因：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.desiChangeReason)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>审核意见：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.checkComment)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计图纸：</span>
                                        <span className='mes-info'>设计图纸</span>
                                    </div>
                                </div>
                            </div>
                            <div className='mes-group ipt-mes-group'>
                                <h3>安装<i className='iconfont icon-other' /></h3>
                                <div className='mes-group-cont'>
                                    <div className='mes-across'>
                                        <span className='name' style={{verticalAlign:'0'}}>指定安装队：</span>
                                        <span className='mes-info-noIpt'>
                                             <RadioGroup onChange={this.fixgroup.bind(this)} defaultValue="1" size='large'>
                                                <RadioButton value="1">单位内部</RadioButton>
                                                <RadioButton value="2">合作单位</RadioButton>
                                            </RadioGroup>
                                            <div className="hideChoose" style={{display:this.state.groupInit ?'block':'none'}}>
                                                <div className="hideChoose-in">
                                                    <Select defaultValue="龙虎山小分队" size='large' style={{ width: 120 }} onChange={this.fixgrouphandleChange.bind(this)}>
                                                      <Option value="龙虎山小分队">xxxx队</Option>
                                                      <Option value="海椒市小分队">wwwww队</Option>
                                                      <Option value="无名氏小分队" disabled>qqqqqq队</Option>
                                                    </Select>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>审核意见：</span>
                                        <span className='mes-group-cont' style={{position:'relative'}}>
                                            <RadioGroup onChange={this.adviceonChange} defaultValue="1" size='large'>
                                                <RadioButton value="1">审定通过</RadioButton>
                                                <RadioButton value="2">审定不通过</RadioButton>
                                            </RadioGroup>
                                            <div className={adviceClassName}>
                                                <div className="advice-in">
                                                    <div className='pionter'></div>
                                                    <textarea placeholder='请输入意见' ref="Advice" style={{height:'80px'}}/>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'></span>
                                        <span className='mes-info-btn'>
                                             <button onClick={this.formSubmit.bind(this)}>提交</button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='bottomHandle'>
                                <div className='bottomHandle-in'>
                                    <div className='Radio'>
                                        <span className='Radio-title'>审核意见：</span>
                                        <RadioGroup onChange={this.adviceonChange} defaultValue="1" size='large'>
                                            <RadioButton value="1">审定通过</RadioButton>
                                            <RadioButton value="2">审定不通过</RadioButton>
                                        </RadioGroup>
                                        <div className={adviceClassName}>
                                            <div className='pionter'></div>
                                            <textarea placeholder='请输入意见'  style={{height:'80px'}}/>
                                        </div>
                                    </div>
                                    <div className='btn'>
                                        <button onClick={this.formSubmit.bind(this)}>提交</button>
                                    </div>
                                    <div className='pageJump'>
                                        <button style={{marginBottom:'12px'}}>上一条</button>
                                        <button>下一条</button>
                                    </div>
                                </div>
                            </div>

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
}))(auditContChild);