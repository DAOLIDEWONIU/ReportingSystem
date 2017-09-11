'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { Spin , Icon , Radio , message , Modal , Input , Select} from 'antd';
import {AdminLoadIDInfo,AdminLoadIDQueryRes,Designdiaopei,SuccRequest,adminPagenumActionCreator,activeClassName} from '../../../../../actions/admin';
import Loading from '../../../../../common/components/common/loading';
import './index.scss';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import '../../../../../common/components/common/effect';
class auditContshejidiaopeiChild extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.Designdiaopei = this.Designdiaopei.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);//分页刷新方法
        this.SuccRequest = this.SuccRequest.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
        this.state = {
            auditId : false ,
            desiName : null ,
            chooseInit : 1 ,              
            lableTipsNum : false,
            lableTipsName : false,
            form: {//valid表示该值的有效状态，value表示该表单具体的值，error表示错误提示信息：
                desiId: {
                    valid: false,
                    value: '',
                    error: ''
                },
                designerName: {
                    valid: false,
                    value: '',
                    error: ''
                },
            }
        }    
    }
    onclicktoback() {
        this.AdminLoadIDQueryRes(null);
        browserHistory.go(-1);
    }    
    AdminLoadIDInfo(QueryId){
        this.props.dispatch(AdminLoadIDInfo(QueryId))
    }
    AdminLoadIDQueryRes(QueryRes) {
        this.props.dispatch(AdminLoadIDQueryRes(QueryRes))
    }
    /**设计调配请求*/
    Designdiaopei(projId,desiId,designerName,remark,operFlag) {
        this.props.dispatch(Designdiaopei(projId,desiId,designerName,remark,operFlag))
    }
    SuccRequest(SRequest){
        this.props.dispatch(SuccRequest(SRequest))
    }
    activeClassName(markId){
        this.props.dispatch(activeClassName(markId))
    }

    // 分页操作
    adminPagenumActionCreator(resultFlag,page){
        this.props.dispatch(adminPagenumActionCreator(resultFlag,page))
    }

    componentWillMount() {
        this.AdminLoadIDInfo(this.props.params.id);
    }
    /*设计人员选择*/
    // 处理意见
    onChange(e) {
        this.setState({
            chooseInit : e.target.value
        })
    }

    handleValueChange (field, value, type = 'string') {
        if (type === 'number') {
            value = +value;
        }
        const {form} = this.state;

        const newFieldObj = {value, valid: true, error: ''};

        switch (field) {
            case 'desiId': {
                if (value.length == 0) {
                    newFieldObj.error = '设计号码不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'designerName': {
                if(value.length == 0){
                    newFieldObj.error = '设计人员不能为空';
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





    submit() {
        const {chooseInit,form: {desiId, designerName}} = this.state;
        if(chooseInit == 1){
            if (!desiId.valid || !designerName.valid) {
                Modal.error({
                    title: '请填写正确的信息重试',
                    okText:'确定'
                });
                return
            }
        }else if(chooseInit == 3){
            if(this.refs.remark.value.length == 0){
                this.refs.remark.focus();
                Modal.error({
                    title: '请填写工程备注',
                    okText:'确定'
                });
                return
            }

        }
        /*操作标志位*/
        this.Designdiaopei(Number(this.props.params.id),desiId.value,designerName.value,encodeURI(this.refs.remark.value),Number(this.state.chooseInit));
        return true;
    }

    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.SRequest){

            

            /**重新获取列表数据*/
            this.props.AdminReturnTotalNum(this.props.TasksListId);
            this.SuccRequest(false);
            this.adminPagenumActionCreator(this.props.TasksListId,0);
            if(!nextProps.adminLoading){
                browserHistory.replace('/design/sheji-diaopei');
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
        const {TasksListId,QueryRes} = this.props;
        const {form: {desiId, designerName}} = this.state;
        const TipsStyle = {     
            color:'#d9534f',
            marginLeft:'6px'
        }
        const props = {
            status : true
        }
        if(QueryRes == null ){
            return (
                <Loading {...props}/>
            );
        }       
        return (
            <div className='taskInfo'>
                <div className='taskInfo-in'>
                    <div className='backicon' onClick={this.onclicktoback.bind(this)}>
                                        <span className="icon-f">
                                            <Icon type="arrow-left" />
                                        </span>
                    </div>
                    <h3 className='toptitle'>
                        设计调配 {this.props.params.id}
                        {
                            TasksListId == 2 ?  <div className="codeMark succ"></div> : null
                        }
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
                                    <span className='mes-info' style={{fontWeight:'600'}}>{decodeURI(QueryRes.baseInfo.acceptName)}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>受理号码：</span>
                                    <span className='mes-info'>{QueryRes.baseInfo.acceptId}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>受理时间：</span>
                                    <span className='mes-info'>{QueryRes.baseInfo.acceptTime}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>用水类型：</span>
                                    <span className='mes-info'>{QueryRes.baseInfo.waterType}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>接水地址：</span>
                                    <span className='mes-info'>{decodeURI(QueryRes.baseInfo.inAddress)}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>用户姓名：</span>
                                    <span className='mes-info'>{decodeURI(QueryRes.baseInfo.cuName)}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>通讯地址：</span>
                                    <span className='mes-info'>{decodeURI(QueryRes.baseInfo.cuAddress)}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>邮政编码：</span>
                                    <span className='mes-info'>{QueryRes.baseInfo.linkmanZip}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>联系人：</span>
                                    <span className='mes-info'>{decodeURI(QueryRes.baseInfo.linkmanName)}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>联系人电话：</span>
                                    <span className='mes-info'>{QueryRes.baseInfo.linkmanPhone}</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>备注：</span>
                                    <span className='mes-info'>{decodeURI(QueryRes.baseInfo.remark)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mes-group ipt-mes-group">
                            <h3>设计信息<i className='iconfont icon-other' /></h3>
                            <div className='mes-group-cont'>
                                <div className='mes-across'>
                                    <span className='name' style={{verticalAlign:'0'}}>设计号码：</span>
                                    {
                                        TasksListId == 2 ? <span className='mes-info'>{QueryRes.baseInfo.desiId}</span> : <span className='mes-info' >
                                                                                                                                <Input size="large"
                                                                                                                                       placeholder="请输入设计号码"
                                                                                                                                       onChange={(e) => this.handleValueChange('desiId', e.target.value)}
                                                                                                                                       autoFocus
                                                                                                                                       disabled={this.state.chooseInit == 3 ? true : false}
                                                                                                                                />
                                            {!desiId.valid && <span style={TipsStyle}>{desiId.error}</span>}
                                                                                                                                <label className="lableTips" style={{display: 'none'}}>
                                                                                                                                    <div className="lableTips-cont">
                                                                                                                                        <div className="lableTips-arrow"></div>
                                                                                                                                        <div className="lableTips-word">设计号码不能为空</div>
                                                                                                                                    </div>
                                                                                                                                </label>
                                                                                                                            </span>
                                    }
                                </div>
                                <div className='mes-across'>
                                    <span className='name' style={{verticalAlign:'0'}}>设计人员：</span>
                                    {
                                        TasksListId == 2 ? <span className='mes-info'>{QueryRes.baseInfo.desiName}</span> : <span className='mes-info' ref="SelectDesign">
                                                                                                                                                                        <Select
                                                                                                                                                                            style={{ width: '288px' ,height : 40}}
                                                                                                                                                                            onChange={(value) => this.handleValueChange('designerName', value)}
                                                                                                                                                                            placeholder="请选择设计人员"
                                                                                                                                                                            getPopupContainer={() => this.refs.SelectDesign}
                                                                                                                                                                            disabled={this.state.chooseInit == 3 ? true : false}
                                                                                                                                                                        >
                                                                                                                                                                                <Select.Option value="李逍遥">李逍遥</Select.Option>
                                                                                                                                                                                <Select.Option value="西充">西充</Select.Option>
                                                                                                                                                                                <Select.Option value="管理员">管理员</Select.Option>
                                                                                                                                                                        </Select>
                                            {!designerName.valid && <span style={TipsStyle}>{designerName.error}</span>}
                                                                                                                                                                        <label className="lableTips" style={{display:'none'}}>
                                                                                                                                                                            <div className="lableTips-cont">
                                                                                                                                                                                <div className="lableTips-arrow"></div>
                                                                                                                                                                                <div className="lableTips-word">设计人员不能为空</div>
                                                                                                                                                                            </div>
                                                                                                                                                                        </label>
                                                                                                                                                                    </span>
                                    }   
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>工程备注：</span>
                                    {
                                        TasksListId == 2 ?  <span className='mes-info'>{decodeURI(QueryRes.baseInfo.remark)}</span> : <span className='mes-info'>
                                                                                                                                                                    <textarea placeholder='请输入工程备注' ref='remark' />
                                                                                                                                                                </span>
                                    }
                                </div>
                                {
                                    TasksListId == 2 ? null :  <div className='mes-across'>
                                        <span className='name' style={{verticalAlign:'0'}}>处理意见：</span>
                                                                                                <span className='mes-group-cont'>
                                                                                                    <RadioGroup onChange={this.onChange.bind(this)} defaultValue="1" size='large'>
                                                                                                        <RadioButton value="1" style={{width:'120px',textAlign:'center'}}>设计任务调配单</RadioButton>
                                                                                                        <RadioButton value="2" style={{width:'120px',textAlign:'center',display:'none'}}>设计任务书</RadioButton>
                                                                                                        <RadioButton value="3" style={{width:'120px',textAlign:'center'}}>重新受理</RadioButton>
                                                                                                    </RadioGroup>
                                                                                                </span>
                                    </div>
                                }
                                {
                                    TasksListId == 2 ? null :  <div className='mes-across'>
                                        <span className='name' />
                                                                                                <span className='mes-info-btn'>
                                                                                                    <button ref='submitBtn' onClick={this.submit.bind(this)}>提交</button>
                                                                                                </span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='bottomHandle'>
                            <div className='bottomHandle-in'>
                                <div className='Radio'>
                                    <span className='Radio-title'>处理意见：</span>
                                    <RadioGroup onChange={this.onChange.bind(this)} defaultValue="1" size='large'>
                                        <RadioButton value="1">设计任务调配单</RadioButton>
                                        <RadioButton value="2">设计任务书</RadioButton>
                                        <RadioButton value="3">重新受理</RadioButton>
                                    </RadioGroup>
                                </div>
                                <div className='btn'>
                                    <button onClick={this.submit.bind(this)}>提交</button>
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
    QueryId: state.adminReducer.QueryId,
    QueryRes: state.adminReducer.QueryRes,
    adminLoading: state.adminReducer.adminLoading,
    requestLoading: state.adminReducer.requestLoading,
    SRequest: state.adminReducer.SRequest,
    Pagesucc: state.adminReducer.Pagesucc,
    markId: state.adminReducer.markId,
}))(auditContshejidiaopeiChild);