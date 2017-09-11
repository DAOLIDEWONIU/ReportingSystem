'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import { Pagination , Icon , Radio , Button , Tooltip , Spin , Modal} from 'antd';
import {AdminLoadIDInfo,AdminLoadIDQueryRes,adminPagenumActionCreator,SuccRequest,AuditShejiSH,AdminAffixRequest,activeClassName} from '../../../../../actions/admin';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Loading from '../../../../../common/components/common/loading';
class auditContChild extends React.Component {
    constructor() {
        super();
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.AuditShejiSH = this.AuditShejiSH.bind(this);
        this.SuccRequest = this.SuccRequest.bind(this);
        this.formsubmit = this.formsubmit.bind(this);
        this.AdminAffixRequest = this.AdminAffixRequest.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.AffixRequest = this.AffixRequest.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
        this.state = {
            auditId : false ,
            adviceShow : false,  
            chooseId:'1',
            previewVisible: false,
            previewImage:null,
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
    /**工程设计审核*/
    AuditShejiSH(desiBookId,desiCheckingFlag,checkComment){
        this.props.dispatch(AuditShejiSH(desiBookId,desiCheckingFlag,checkComment))
    }
    // 分页操作
    adminPagenumActionCreator(resultFlag,page){
        this.props.dispatch(adminPagenumActionCreator(resultFlag,page))
    }
    /**附件请求*/

    AdminAffixRequest(projId){
        this.props.dispatch(AdminAffixRequest(projId))
    }
    SuccRequest(SRequest){
        this.props.dispatch(SuccRequest(SRequest))
    }

    AffixRequest() {
        this.AdminAffixRequest(Number(this.props.params.id))
    }  

    componentWillMount() {
        this.AdminLoadIDInfo(this.props.params.id);
    }

    activeClassName(markId){
        this.props.dispatch(activeClassName(markId))
    }

    adviceonChange(e) {
        this.setState({
            chooseId:e.target.value
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
    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview(e) {
        console.log(e.target.getAttribute('data-url'))
        this.setState({
            previewImage : e.target.getAttribute('data-url'),
            previewVisible: true,
        });
    }
    formsubmit() {
        let adviceVal = null;
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
        this.AuditShejiSH(this.props.QueryRes.desiBooks[0].id,Number(this.state.chooseId),adviceVal)
    }
    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.SRequest){
            /**重新获取列表数据*/
            this.props.AdminReturnTotalNum(1);
            this.SuccRequest(false);
            this.adminPagenumActionCreator(1,0);
            if(!nextProps.adminLoading){
                browserHistory.replace('/audit/gongchengsheji-sh');
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
        const props = {
            status : true
        }
        const { previewVisible, previewImage } = this.state;
        const auditId = this.state.auditId ? <div className='auditId-com auditId-true' /> : <div className='auditId-com auditId-false' /> ;
        const adviceClassName = this.state.adviceShow ? 'advice' : 'advice hide';
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
                            设计审核 {this.props.params.id}
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
                                        <span className='name' style={{marginTop:'3px'}}>设计图纸：</span>   
                                        <span className='mes-info'>
                                            {     
                                                QueryRes.baseInfo.accessoryList.length > 0  ? <div>
                                                    <div style={{display:'inline-block',color:'rgb(52, 152, 219)',cursor:'pointer',marginBottom:'12px',padding: '6px 12px',border:'1px solid #d2eafb',background:'#ecf6fd',borderRadius:'4px'}} onClick={this.AffixRequest}>点击获取附件列表</div>
                                                    <div className="uploadOuter">
                                                        {

                                                            affixRes == null ? null : affixRes.accessList.map((ele,i) => {
                                                                return (
                                                                    <div className="AFFIX clearfloat" key={i} >
                                                                        <div className="AFFIX-col">
                                                                            <span className="AFFIX-Name">{ele.accesName}</span>
                                                                            <div style={{textAlign: 'center'}}>
                                                                                <a className="AFFIX-handle" href={ele.fullAccessFileURL} download>
                                                                                    <Button type="primary" icon="cloud-download" >下载</Button>
                                                                                </a>
                                                                                <Button icon="eye" data-url={ele.fullAccessFileURL} onClick={this.handlePreview} disabled={/\.(png|jp[e]?g|gif)$/.test(ele.accesName.substr(ele.accesName.indexOf('.'), ele.accesName.length)) ? false :true }>查看</Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div> : '无'
                                            }
                                            <Modal visible={previewVisible} width='800px' footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                            </Modal>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='mes-group ipt-mes-group'>
                                <div className='mes-group-cont'>
                                    <div className='mes-across'>
                                        <span className='name' style={{verticalAlign:'0'}}>处理意见：</span>
                                        <span className='mes-group-cont' style={{position:'relative'}}>
                                            <RadioGroup onChange={this.adviceonChange.bind(this)} defaultValue="1" size='large'>
                                                <RadioButton value="1">审核通过</RadioButton>
                                                <RadioButton value="2">审核不通过</RadioButton>
                                            </RadioGroup>
                                            <div className={adviceClassName}>
                                                <div className="advice-in">
                                                    <div className='pionter'></div>
                                                    <textarea placeholder='请输入原因' ref="Advice" style={{height:'80px'}} />
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name' style={{verticalAlign:'0'}}></span>
                                        <span className='mes-info-btn'>
                                            <button onClick={this.formsubmit}>提交</button>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='bottomHandle'>
                                <div className='bottomHandle-in'>
                                    <div className='Radio'>
                                        <span className='Radio-title'>审核意见：</span>
                                        <RadioGroup onChange={this.adviceonChange.bind(this)} defaultValue="1" size='large'>
                                            <RadioButton value="1">审核通过</RadioButton>
                                            <RadioButton value="2">审核不通过</RadioButton>
                                        </RadioGroup>
                                        <div className={adviceClassName}>
                                            <div className='pionter'></div>
                                            <textarea placeholder='请输入原因' style={{height:'80px'}} />
                                        </div>
                                    </div>
                                    <div className='btn'>
                                        <button onClick={this.formsubmit}>提交</button>
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
    affixRes: state.adminReducer.affixRes,
}))(auditContChild);