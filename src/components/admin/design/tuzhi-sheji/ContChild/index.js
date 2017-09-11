'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { Icon , Radio , Spin , Modal } from 'antd';
import './index.scss';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {AdminLoadIDInfo,AdminLoadIDQueryRes,DesignTuzhiSheji,SuccRequest,adminPagenumActionCreator,activeClassName} from '../../../../../actions/admin';
import AddWater from './addWater';
import  FileUpload from './succtips';
import Loading from '../../../../../common/components/common/loading';
class auditContChild extends React.Component {
    constructor() {
        super();
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.DesignTuzhiSheji = this.DesignTuzhiSheji.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.SuccRequest = this.SuccRequest.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
        this.state = {
            auditId : false ,
            chooseId : 1 ,          
        }
    }    
    AdminLoadIDQueryRes(QueryRes) {
        this.props.dispatch(AdminLoadIDQueryRes(QueryRes))
    }
    AdminLoadIDInfo(QueryId){
        this.props.dispatch(AdminLoadIDInfo(QueryId))
    }
    /**图纸设计请求*/

    DesignTuzhiSheji(projId,designDrawingFlag,desiExplain) {
        this.props.dispatch(DesignTuzhiSheji(projId,designDrawingFlag,desiExplain))
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

    componentWillMount() {
        this.AdminLoadIDInfo(this.props.params.id);
    }
    onclicktoback() {
        browserHistory.go(-1);
        this.AdminLoadIDQueryRes(null);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.markId == null) {
            this.activeClassName(this.props.params.id);
        }
    }


    DiaopaiMes() {
        Modal.info({
            title: '调配详细信息:',
            okText:'确定',
            width:600,
            content: (
                <div className="modalOut">
                    <table style={{width:'100%'}}>
                        <tbody>
                            <tr>
                                <th colSpan="4" className='taskTips'>项目信息</th>
                            </tr>
                            <tr>
                                <td className='title'>项目名称</td>
                                <td>{decodeURI(this.props.QueryRes.baseInfo.acceptName)}</td>
                                <td className='title'>登记日期</td>
                                <td>{this.props.QueryRes.baseInfo.regDate}</td>
                            </tr>
                            <tr>
                                <td className='title'>受理号码</td>
                                <td>{this.props.QueryRes.baseInfo.acceptId}</td>
                                <td className='title'>受理时间</td>
                                <td>{this.props.QueryRes.baseInfo.acceptTime}</td>
                            </tr>
                            <tr>
                                <th colSpan="4" className='taskTips'>客户信息</th>
                            </tr>
                            <tr>
                                <td className='title'>客户名称</td>
                                <td>{decodeURI(this.props.QueryRes.baseInfo.cuName)}</td>
                                <td className='title'>客服电话</td>
                                <td>{this.props.QueryRes.baseInfo.cuPhone}</td>
                            </tr>
                            <tr>
                                <td className='title'>申请类型</td>
                                <td>{decodeURI(this.props.QueryRes.baseInfo.waterType)}</td>
                                <td className='title'>接水地址</td>
                                <td>{decodeURI(this.props.QueryRes.baseInfo.inAddress)}</td>
                            </tr>
                            <tr>
                                <th colSpan="4" className='taskTips'>联系人信息</th>
                            </tr>
                            <tr>
                                <td className='title'>联系人姓名</td>
                                <td>{decodeURI(this.props.QueryRes.baseInfo.linkmanName)}</td>
                                <td className='title'>联系地址</td>
                                <td>{decodeURI(this.props.QueryRes.baseInfo.cuAddress)}</td>
                            </tr>
                            <tr>
                                 <td className='title'>联系电话</td>
                                <td>{decodeURI(this.props.QueryRes.baseInfo.linkmanPhone)}</td>
                                <td className='title'>身份证号码</td>
                                <td>{this.props.QueryRes.baseInfo.linkmanIDCARD}</td>
                                
                            </tr>
                            <tr>
                                <td colSpan="1" className='title'>邮政编码</td>
                                <td colSpan="3">{this.props.QueryRes.baseInfo.linkmanZip}</td>
                            </tr>
                            <tr>
                                <th colSpan="4" className='taskTips'>其他</th>
                            </tr>
                            <tr>
                                <td colSpan="1" className='title'>备注</td>  
                                <td colSpan="3">{decodeURI(this.props.QueryRes.baseInfo.remark)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ),
            onOk() {},
        });
    }

    formSubmit() {
        // this.refs.desiExplain
        // console.log('id',this.props.params.id)
        // console.log('chooseId',this.state.chooseId)
        // console.log('desiExplain',this.refs.desiExplain)
        this.DesignTuzhiSheji(Number(this.props.params.id),Number(this.state.chooseId),encodeURI(this.refs.desiExplain.value));
    }

       
    chooseIdchange(e) {
        this.setState({
            chooseId : e.target.value
        })
    }

    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.SRequest){
            /**重新获取列表数据*/
            this.props.AdminReturnTotalNum(this.props.TasksListId);
            this.SuccRequest(false);
            this.adminPagenumActionCreator(this.props.TasksListId,0);
            if(!nextProps.adminLoading){
                browserHistory.replace('/design/tuzhi-sheji');
            }
        }
        return true;
    }

    render() {

        const {TasksListId,QueryRes} = this.props;
        const props = {
            result : this.props.params.id
        };
        const Loadingprops = {
            status : true
        }
        if(QueryRes == null ){
            return (
                <Loading {...Loadingprops}/>
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
                            图纸设计 {this.props.params.id}
                            {
                                TasksListId == 2 ?  <div className="codeMark succ"></div> :  TasksListId == 3 ? <div className="codeMark stop"></div> : null
                            }
                        </h3>
                        <div className={TasksListId == 3 ? 'mes IsStop' : 'mes'}>
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
                                        <span className='name'>设计号码：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.desiId}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>调派信息：</span>
                                        <span className='mes-info' style={{color:'#3498DB',cursor:'pointer'}} onClick={this.DiaopaiMes.bind(this)}>查看</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>完成时间：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.acceptTime}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>工程说明：</span>
                                    <span className='mes-info'>{decodeURI(QueryRes.baseInfo.remark)}</span>
                                    </div>
                                </div>
                            </div>
                            {
                                TasksListId == 3 ? null : <div className='mes-group ipt-mes-group'>
                                    <h3>
                                        其他
                                        <i className='iconfont icon-other' />
                                    </h3>
                                    <div className='mes-group-cont'>
                                        <div className='mes-across'>
                                            <span className='name' >设计说明：</span>
                                        <span className='mes-info'>
                                           <textarea placeholder="设计说明" ref='desiExplain'></textarea>
                                        </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>添加附件：</span>
                                        <span className='mes-info upload'>
                                           <FileUpload {...props}/>
                                        </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>添加表号：</span>
                                        <span className='mes-info' ref='ipt'>
                                            <AddWater />
                                        </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>处理意见：</span>
                                        <span className='mes-group-cont'>
                                            <RadioGroup onChange={this.chooseIdchange.bind(this)} defaultValue="1" size='large'>
                                                <RadioButton value="1">设计完成</RadioButton>
                                                <RadioButton value="3">终止工程</RadioButton>
                                            </RadioGroup>
                                        </span>
                                        </div>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}></span>
                                        <span className='mes-info-btn'>
                                            <button onClick={this.formSubmit.bind(this)}>提交</button>
                                        </span>
                                        </div>
                                    </div>

                                </div>
                            }

                            <div className='bottomHandle'>
                                <div className='bottomHandle-in'>
                                    <div className='Radio'>
                                        <span className='Radio-title'>处理意见：</span>
                                        <RadioGroup onChange={this.chooseIdchange.bind(this)} defaultValue="1" size='large'>
                                            <RadioButton value="1">设计完成</RadioButton>
                                            <RadioButton value="2">终止工程</RadioButton>
                                        </RadioGroup>
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
    SRequest: state.adminReducer.SRequest,
    res: state.adminReducer.res,
    QueryId: state.adminReducer.QueryId,
    ResSucc: state.adminReducer.ResSucc,
    QueryRes: state.adminReducer.QueryRes,
    requestLoading: state.adminReducer.requestLoading,
    adminLoading: state.adminReducer.adminLoading,
    Pagesucc: state.adminReducer.Pagesucc,
    markId: state.adminReducer.markId,
}))(auditContChild);