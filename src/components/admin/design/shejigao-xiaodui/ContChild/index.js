'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import { Spin , Icon , Radio , Button , Modal } from 'antd';
import './index.scss';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import {AdminLoadIDInfo,AdminLoadIDQueryRes,DesignShejigaoxiaodui,SuccRequest,adminPagenumActionCreator,AdminAffixRequest,activeClassName} from '../../../../../actions/admin';
import Loading from '../../../../../common/components/common/loading';
// import AddWater from './addWater';
// import Upload from './upload';

class auditContshejigaoChild extends React.Component {
    constructor() {
        super();
        this.AdminLoadIDInfo = this.AdminLoadIDInfo.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.DesignShejigaoxiaodui = this.DesignShejigaoxiaodui.bind(this);
        this.SuccRequest = this.SuccRequest.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.AdminAffixRequest = this.AdminAffixRequest.bind(this);
        this.AffixRequest = this.AffixRequest.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
        this.state = {
            auditId : false ,
            chooseId : 1 ,
            previewVisible: false,
            previewImage:null,
        }
    }
    onclicktoback() {
        browserHistory.go(-1);
        this.AdminLoadIDQueryRes(null);
    }
    
    AdminLoadIDQueryRes(QueryRes) {
        this.props.dispatch(AdminLoadIDQueryRes(QueryRes))
    }
    AdminLoadIDInfo(QueryId){
        this.props.dispatch(AdminLoadIDInfo(QueryId))
    }
    SuccRequest(SRequest){
        this.props.dispatch(SuccRequest(SRequest))
    }
    /**图纸校对请求*/
    DesignShejigaoxiaodui(projId,drawingRevisionFlag,reconReason){
        this.props.dispatch(DesignShejigaoxiaodui(projId,drawingRevisionFlag,reconReason))
    }

    // 分页操作
    adminPagenumActionCreator(resultFlag,page){
        this.props.dispatch(adminPagenumActionCreator(resultFlag,page))
    }
    /**附件请求*/

    AdminAffixRequest(projId){
        this.props.dispatch(AdminAffixRequest(projId))
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
            
    /**提交*/
    formSubmit() {

        let adviceVal = null;
        if(this.state.chooseId == '2'){
            if(this.refs.Advice.value.length == 0){
                this.refs.Advice.focus();
                Modal.warning({
                    title: '设计稿校对不通过原因不能为空！',
                    content: '这里输入设计稿校对没有通过的原因，以便上一环节人员能及时有效更改.',
                    okText:'确定'
                });
                return false;
            }else {
                adviceVal = this.refs.Advice.value
            }
        }
        this.DesignShejigaoxiaodui(this.props.QueryRes.desiBooks[0].id,Number(this.state.chooseId),adviceVal);
    }
    componentWillMount() {
        this.AdminLoadIDInfo(this.props.params.id);
    }

    AffixRequest() {
        this.AdminAffixRequest(Number(this.props.params.id))
    }

    handleCancel = () => this.setState({ previewVisible: false })
    handlePreview(e) {
        console.log(e.target.getAttribute('data-url'))
        this.setState({
            previewImage : e.target.getAttribute('data-url'),
            previewVisible: true,
        });
    }
    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.SRequest){
            /**重新获取列表数据*/
            this.props.AdminReturnTotalNum(this.props.TasksListId);
            this.SuccRequest(false);
            this.adminPagenumActionCreator(this.props.TasksListId,0);
            if(!nextProps.adminLoading){
                browserHistory.replace('/design/shejigao-xiaodui');
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
        const {TasksListId,QueryRes,affixRes} = this.props;
        const { previewVisible, previewImage } = this.state;
        const adviceClassName = this.state.adviceShow ? 'advice' : 'advice hide';
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
                            图纸校对 {this.props.params.id}
                            {
                                TasksListId == 2 ?  <div className="codeMark succ"></div> :  TasksListId == 3 ? <div className="codeMark stop"></div> : null
                            }
                        </h3>
                        <div className='mes'>
                            <div className='mes-group'>
                                <h3>项目信息
                                    <i className='iconfont icon-project' />
                                </h3>
                                <div className='mes-group-cont'>
                                    <div className='mes-across'>
                                        <span className='name'>项目名称：</span>
                                        <span className='mes-info' style={{fontWeight:'600'}}>{decodeURI(QueryRes.baseInfo.acceptName)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>用水类型：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.waterType)}</span>
                                    </div>                
                                    <div className='mes-across'>
                                        <span className='name'>客户名称：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.cuName)}</span>
                                    </div>                
                                    <div className='mes-across'>
                                        <span className='name'>客户地址：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.cuAddress)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>设计人员：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.desiName)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>完成时间：</span>
                                        <span className='mes-info'>{QueryRes.baseInfo.desiTime}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>工程说明：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.remark)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name'>变更原因：</span>
                                        <span className='mes-info'>{decodeURI(QueryRes.baseInfo.desiExplain)}</span>
                                    </div>
                                    <div className='mes-across'>
                                        <span className='name' style={{marginTop:'3px'}}>设计图纸：</span>
                                        <span className='mes-info' >      
                                            {
                                               QueryRes.baseInfo.accessoryList.length > 0  ? <div>
                                                        <div style={{display:'inline-block',color:'rgb(52, 152, 219)',cursor:'pointer',marginBottom:'12px',padding: '6px 12px',border:'1px solid #d2eafb',background:'#ecf6fd',borderRadius:'4px'}} onClick={this.AffixRequest}>点击获取附件列表</div>
                                                        <div className="uploadOuter">
                                                            {

                                                                affixRes == null ? null : affixRes.accessList.map((ele,i) => {
                                                                    return (
                                                                        <div className="AFFIX" key={i} >
                                                                            <div className="AFFIX-col">
                                                                                <span className="AFFIX-Name">{ele.accesName}</span>
                                                                                <div style={{textAlign:'center'}}>
                                                                                    <a className="AFFIX-handle" href={ele.fullAccessFileURL} download>
                                                                                        <Button icon="cloud-download" type="primary">下载</Button>
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
                            {
                                TasksListId == 2 ? null : <div className='mes-group ipt-mes-group'>
                                    <div className='mes-group-cont'>
                                        <div className='mes-across'>
                                            <span className='name' style={{verticalAlign:'0'}}>处理意见：</span>
                                        <span className='mes-group-cont' style={{position:'relative'}}>
                                            <RadioGroup onChange={this.adviceonChange.bind(this)} defaultValue="1" size='large'>
                                                <RadioButton value="1">完成校对</RadioButton>
                                                <RadioButton value="2">校对有疑问</RadioButton>
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
                                            <button onClick={this.formSubmit.bind(this)}>提交</button>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className='bottomHandle'>
                                <div className='bottomHandle-in'>
                                    <div className='Radio'>
                                        <span className='name' style={{verticalAlign:'0'}}>处理意见：</span>
                                        <span className='mes-group-cont' style={{position:'relative'}}>
                                            <RadioGroup onChange={this.adviceonChange.bind(this)} defaultValue="1" size='large'>
                                                <RadioButton value="1">审核通过</RadioButton>
                                                <RadioButton value="2">审核不通过</RadioButton>
                                            </RadioGroup>
                                        </span>
                                        
                                        <span className='Radio-title'>处理意见：</span>
                                        <RadioGroup onChange={this.adviceonChange.bind(this)} defaultValue="1" size='large'>
                                            <RadioButton value="1">完成校对</RadioButton>
                                            <RadioButton value="2">校对有疑问</RadioButton>
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
    res: state.adminReducer.res,
    QueryId: state.adminReducer.QueryId,
    ResSucc: state.adminReducer.ResSucc,
    QueryRes: state.adminReducer.QueryRes,
    requestLoading: state.adminReducer.requestLoading,
    TasksListId: state.adminReducer.TasksListId,
    adminLoading: state.adminReducer.adminLoading,
    Pagesucc: state.adminReducer.Pagesucc,
    SRequest: state.adminReducer.SRequest,
    OtherIsLoading: state.adminReducer.OtherIsLoading,
    affixRes: state.adminReducer.affixRes,
    markId: state.adminReducer.markId,
}))(auditContshejigaoChild);