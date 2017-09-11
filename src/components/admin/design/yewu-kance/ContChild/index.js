'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import { Spin , Icon , Radio , Tooltip  } from 'antd';
import {AdminLoadIDInfo,AdminLoadIDQueryRes,Designkancha,adminPagenumActionCreator,SuccRequest,activeClassName} from '../../../../../actions/admin';
// import './index.scss';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Loading from '../../../../../common/components/common/loading';
class auditContChild extends React.Component {
    constructor(props) {
        super(props);
        this.adviceonChange = this.adviceonChange.bind(this);
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.Designkancha = this.Designkancha.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.SuccRequest = this.SuccRequest.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
        this.state = {
            auditId : false ,
            adviceShow : false,
            chooseId:1,
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
    activeClassName(markId){
        this.props.dispatch(activeClassName(markId))
    }
    adviceonChange(e) {
        this.setState({
            chooseId:e.target.value
        })
        if(e.target.value == '3'){
            this.setState({
                adviceShow : true
            })
        }else{
             this.setState({
                adviceShow : false
            })
        }
    }
    componentWillMount() {
        this.AdminLoadIDInfo(this.props.params.id);
    }

    formsubmit() {
        this.Designkancha(Number(this.props.params.id),Number(this.state.chooseId),this.refs.remark.value);
    }
    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.SRequest){
            /**重新获取列表数据*/
            this.props.AdminReturnTotalNum(this.props.TasksListId);
            this.SuccRequest(false);
            this.adminPagenumActionCreator(this.props.TasksListId,0);
            if(!nextProps.adminLoading){
                browserHistory.replace('/design/yewu-kance');
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
        console.log('TasksListId',this.props.TasksListId);
        const {TasksListId,QueryRes} = this.props;
        const props = {
            status : true
        }
        if(QueryRes == null ){
            return (
                <Loading {...props}/>
            );
        }
        const adviceClassName = this.state.adviceShow ? 'advice' : 'advice hide';
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
                            业务勘测 {this.props.params.id}
                            {
                                TasksListId == 2 ?  <div className="codeMark succ"></div> :  TasksListId == 3 ? <div className="codeMark stop"></div> : null
                            }
                        </h3>
                        <div className={TasksListId == 3 ? 'mes IsStop' : 'mes'}>
                            <div className='mes-group'>
                                <h3>
                                    项目信息<i className='iconfont icon-project'></i>
                                </h3>
                                <div className='mes-group-cont'>
                                    <div className='mes-across'>
                                        <span className='name'>项目名称：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.acceptName)}</span>
                                    </div> 
                                    <div className='mes-across'>
                                        <span className='name'>受理号码：</span>
                                        <span className='mes-info'>00000001</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>登记时间：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.acceptTime}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>调派时间：</span>
                                        <span className='mes-info'>2017-02-06</span>
                                    </div>
                                </div> 
                            </div>
                            <div className='mes-group'>
                                <h3>
                                    用户信息
                                    <i className='iconfont icon-userInfo'></i>
                                </h3> 
                                <div className='mes-group-cont'>
                                    <div className='mes-across'>
                                        <span className='name'>用水类型：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.waterType}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>客户名称：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.cuName)}</span>
                                    </div>  
                                    <div className='mes-across'>
                                        <span className='name'>接水地址：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.inAddress)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>联系人员：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.linkmanName)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>联系电话：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.linkmanPhone}</span>
                                    </div>
                                </div>
                            </div>
                            {/**根据TasksListId 判断现在状态，终止状态下，底部操作区不渲染*/}
                            {
                                TasksListId == 2 ? <div className='mes-group ipt-mes-group'>
                                    <h3>
                                        其他
                                        <i className='iconfont icon-other'></i>
                                    </h3>
                                    <div className='mes-group-cont'>
                                        <div className='mes-across'>
                                            <span className='name'>勘测记录：</span>
                                            <span className='mes-info'>{decodeURI(QueryRes.baseInfo.surveyRecord)}</span>
                                        </div>
                                    </div>
                                </div> : null
                            }
                            {
                                TasksListId == 3  || TasksListId == 2 ? null :  <div className='mes-group ipt-mes-group'>
                                                                            <h3>
                                                                                其他
                                                                                <i className='iconfont icon-other'></i>
                                                                            </h3>
                                                                            <div className='mes-group-cont'>
                                                                                <div className='mes-across'>
                                                                                    <span className='name'>勘测记录：</span>
                                                                                <span className='mes-info'>
                                                                                    <textarea placeholder="请输入勘测记录" ref='remark'></textarea>
                                                                                </span>
                                                                                </div>
                                                                                <div className='mes-across'>
                                                                                    <span className='name' style={{verticalAlign:'0'}}>审核意见：</span>
                                                                                <span className='mes-group-cont'>
                                                                                    <RadioGroup onChange={this.adviceonChange} defaultValue="1" size='large'>
                                                                                        <RadioButton value="1">确认勘察</RadioButton>
                                                                                        <RadioButton value="2">重新调配</RadioButton>
                                                                                        <RadioButton value="3">终止工程</RadioButton>
                                                                                    </RadioGroup>
                                                                                </span>
                                                                                </div>
                                                                                <div className='mes-across'>
                                                                                    <span className='name'></span>
                                                                                    <span className='mes-info-btn'>
                                                                                        <button onClick={this.formsubmit.bind(this)}>提交</button>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                            }
                            <div className='bottomHandle'>
                                <div className='bottomHandle-in'>
                                    <div className='Radio'>
                                        <span className='Radio-title'>审核意见：</span>
                                        <RadioGroup onChange={this.adviceonChange} defaultValue="1" size='large'>
                                            <RadioButton value="1">确认勘察</RadioButton>
                                            <RadioButton value="2">重新调配</RadioButton>
                                            <RadioButton value="3">终止工程</RadioButton>
                                        </RadioGroup>
                                        <div className={adviceClassName}> 
                                            <div className='pionter'></div>
                                            <textarea placeholder='请输入意见'></textarea>
                                        </div>
                                    </div>  
                                    <div className='btn'>
                                        <button onClick={this.formsubmit.bind(this)}>提交</button>
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


{/*
    <div className='bottomHandle'>  
                            <div className='Radio'>
                                <RadioGroup onChange={onChange} defaultValue="a" size='large'>
                                    <RadioButton value="a">确认勘察</RadioButton>
                                    <RadioButton value="b">终止工程</RadioButton>
                                    <RadioButton value="c">重新调配</RadioButton>
                                </RadioGroup>
                            </div>
                            <div className='btn'>
                                <button>提交</button>
                            </div>
                        </div>
*/}


{/*
 <div className='empty'>
 <div className='emptyin'>
 <div className='bottomHandle'>
 <div className='bottomHandle-in'>
 <div className='Radio'>
 <span className='Radio-title'>审核意见：</span>
 <RadioGroup onChange={onChange} defaultValue="a" size='large'>
 <RadioButton value="a">确认勘察</RadioButton>
 <RadioButton value="b">终止工程</RadioButton>
 <RadioButton value="c">重新调配</RadioButton>
 </RadioGroup>
 </div>
 <div className='btn'>
 <button>提交</button>
 </div>
 <div className='pageJump'>
 <button style={{marginBottom:'12px'}}>上一条</button>
 <button>下一条</button>
 </div>
 </div>
 </div>
 </div>
 </div>
*/}