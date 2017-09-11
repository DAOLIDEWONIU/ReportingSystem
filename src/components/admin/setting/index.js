/**
 * Created by Administrator on 2017-06-20.
 */
'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {connect} from 'react-redux';
import Loading from '../../../common/components/common/loading';
import {adminSetAddUser,SetTingAddDepartmentActionCreator,SetTingGetDepartmentListActionCreator,SetTingRequestActionCreator,SetTingGetDepartmentListResActionCreator,SetTingDelDepartmentListResActionCreator,SetTingEditDepartmentListResActionCreator,SetTingGetUserListActionCreator,SetTingDelOperatorActionCreator,SetTingSearchUserInfoActionCreator,SetTingSearchUserInfoResActionCreator,SetTingStartOrStopOperatorActionCreator} from '../../../actions/admin';
import './index.scss';
import { Icon , Pagination , Avatar , Modal , Popconfirm ,Input , Button , message} from 'antd';
import AddUser from './addUser';
import EditUser from './editUser';
class setting extends React.Component {
    constructor() {
        super();
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.editBtn = this.editBtn.bind(this);
        this.editToChange = this.editToChange.bind(this);
        this.Deldepartment = this.Deldepartment.bind(this);
        this.AddUserToClick = this.AddUserToClick.bind(this);
        this.adminSetAddUser = this.adminSetAddUser.bind(this);
        this.startUerBtn = this.startUerBtn.bind(this);
        this.EditHandleCancel = this.EditHandleCancel.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.SetTingAddDepartmentActionCreator = this.SetTingAddDepartmentActionCreator.bind(this);
        this.SetTingGetDepartmentListActionCreator = this.SetTingGetDepartmentListActionCreator.bind(this);
        this.SetTingRequestActionCreator = this.SetTingRequestActionCreator.bind(this);
        this.SetTingGetDepartmentListResActionCreator = this.SetTingGetDepartmentListResActionCreator.bind(this);
        /**删除部门*/
        this.SetTingDelDepartmentListResActionCreator = this.SetTingDelDepartmentListResActionCreator.bind(this);
        /**修改部门*/
        this.SetTingEditDepartmentListResActionCreator = this.SetTingEditDepartmentListResActionCreator.bind(this);
        /**获取用户列表*/
        this.SetTingGetUserListActionCreator = this.SetTingGetUserListActionCreator.bind(this);
        /**删除操作员*/
        this.SetTingDelOperatorActionCreator = this.SetTingDelOperatorActionCreator.bind(this);
        /**查询单个用户信息*/
        this.SetTingSearchUserInfoActionCreator = this.SetTingSearchUserInfoActionCreator.bind(this);
        /**查询单个用户信息返回结果以及状态*/
        this.SetTingSearchUserInfoResActionCreator = this.SetTingSearchUserInfoResActionCreator.bind(this);
        /**启用操作员*/
        this.SetTingStartOrStopOperatorActionCreator = this.SetTingStartOrStopOperatorActionCreator.bind(this);

        this.state = {
            isfocus : false,//错误
            start : false ,
            DepartmentVisible: false,
            depId:null,
            clickID:null,
            editModalvisible:false,//修改用户显示
            form: {//valid表示该值的有效状态，value表示该表单具体的值，error表示错误提示信息：
                depName: { //缴费收到时间
                    valid: false,
                    value: '',
                    error: ''
                },
                NewdepName: {
                    valid: false,
                    value: '',
                    error: ''
                },

            }
        }
    } 
    adminSetAddUser(show) {
        this.props.dispatch(adminSetAddUser(show));                    
    }
    SetTingAddDepartmentActionCreator(depName){
        this.props.dispatch(SetTingAddDepartmentActionCreator(depName))
    }
    SetTingGetDepartmentListActionCreator(){
        this.props.dispatch(SetTingGetDepartmentListActionCreator())
    }
    SetTingRequestActionCreator(Setsucc){
        this.props.dispatch(SetTingRequestActionCreator(Setsucc))
    }
    /**获取部门结果*/
    SetTingGetDepartmentListResActionCreator(DepartmentListcode,DepartmentListRes){
        this.props.dispatch(SetTingGetDepartmentListResActionCreator(DepartmentListcode,DepartmentListRes))
    }
    /**删除部门*/
    SetTingDelDepartmentListResActionCreator(depId){
        this.props.dispatch(SetTingDelDepartmentListResActionCreator(depId))
    }
    /**修改部门*/
    SetTingEditDepartmentListResActionCreator(depId,depName){
        this.props.dispatch(SetTingEditDepartmentListResActionCreator(depId,depName));
    }
    /**获取用户列表*/
    SetTingGetUserListActionCreator(){
        this.props.dispatch(SetTingGetUserListActionCreator());
    }
    /**删除操作员*/
    SetTingDelOperatorActionCreator(userID){
        this.props.dispatch(SetTingDelOperatorActionCreator(userID));
    }
    /**修改用户取消展示*/
    EditHandleCancel() {
        // this.SetTingSearchUserInfoResActionCreator(false,null);
        this.setState({
            editModalvisible : false
        })
    }
    /**查询单个用户*/
    SetTingSearchUserInfoActionCreator(id){
        this.props.dispatch(SetTingSearchUserInfoActionCreator(id))
    }

    /**查询单个用户结果*/
    SetTingSearchUserInfoResActionCreator(singleUserSucc,singleUserInfo){
        this.props.dispatch(SetTingSearchUserInfoResActionCreator(singleUserSucc,singleUserInfo))
    }
    /**启用操作员*/
    SetTingStartOrStopOperatorActionCreator(id,authorize){
        this.props.dispatch(SetTingStartOrStopOperatorActionCreator(id,authorize))
    }
    /**编辑用户*/
    editHandle(e) {
        /**获取单个用户*/
        this.SetTingSearchUserInfoActionCreator(Number(e.target.getAttribute('data-id')));
        this.setState({
            editModalvisible : true ,
            clickID : Number(e.target.getAttribute('data-id')),
        })
    }   
    onFocus() {
        this.setState({         
            isfocus : true       
        })
    }
    onBlur() {
        this.setState({
            isfocus : false   
        })
    }       

    AddUserToClick() {
        if(this.props.DepartmentListRes == null){
            message.warning('当前部门为空，请先增加部门',4);
            return
        }else if(this.props.DepartmentListRes.allDepInfo.length === 0){
            message.warning('当前部门为空，请先增加部门',4);
            return
        }
        this.adminSetAddUser(true);
    }

    /**修改部门*/
    editToChange(e) {
        const { DepartmentVisible , form:{NewdepName}} = this.state;
        if(!NewdepName.valid){
            message.config({
                top: 24,
            });
            message.warning('新增部门名称不能为空！');
            return;
        }
        this.SetTingEditDepartmentListResActionCreator(Number(e.target.getAttribute('data-depId')),NewdepName.value);
    }
    /**取消修改*/

    CancelEdit() {
        this.setState({
            depId:'',
        })
    }
    startUerBtn(e){
        let authorize = e.target.getAttribute('data-authorize');
        if(authorize == 1){
            this.SetTingStartOrStopOperatorActionCreator(e.target.getAttribute('data-id'),0);
        }else if(authorize == 0 || authorize == null){
            this.SetTingStartOrStopOperatorActionCreator(e.target.getAttribute('data-id'),1);
        }
    }

    AddDepartmentToClick() {
        this.setState({ DepartmentVisible: true });
        /**获取所有部门*/
        this.SetTingGetDepartmentListActionCreator();
    }

    handleValueChange (field, value, type = 'string') {
        if (type === 'number') {
            value = +value;
        }
        const {form} = this.state;
            
        const newFieldObj = {value, valid: true, error: ''};
        switch (field) {
            case 'depName': {
                if (value.length == 0) {
                    newFieldObj.error = '部门名称不能为空';
                    newFieldObj.valid = false;
                }else if(/\s/.test(value)){
                    newFieldObj.error = '不能输入空格';
                    newFieldObj.valid = false; 
                }
                break;
            }   
            case 'NewdepName':{
                if (value.length == 0) {
                    newFieldObj.error = '修改部门名称不能为空';
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

    addDepartmentBtn() {
        const { DepartmentVisible , form:{depName}} = this.state;
        if(!depName.valid){
            message.warning('部门名称不能为空或者错误');
            return;
        }
        this.SetTingAddDepartmentActionCreator(depName.value);              
    }
     
    DepartmenthandleCancel = () => {
        this.setState({ DepartmentVisible: false });
    }
      
    Deldepartment(e) {
        this.SetTingDelDepartmentListResActionCreator(Number(e.target.getAttribute('data-depId')));
    }
    Editdepartment(e) {
        this.SetTingEditDepartmentListResActionCreator(Number(e.target.getAttribute('data-depId')),)
    }
                          
    editBtn(e) {  
        this.setState({
            depId : e.target.getAttribute('data-depId'),
            form:{
                depName: { //缴费收到时间
                    valid: false,
                    value: '',
                    error: ''
                },
                NewdepName:{
                    value:e.target.getAttribute('data-depName'),
                    valid:true,
                    error: ''
                }
            }          
        })
    }       
    componentWillMount() {
        this.SetTingGetUserListActionCreator();
    }
    delUser(e) {
        let activeUser = JSON.parse(sessionStorage.getItem('res')).loginPeople;
        if(activeUser === e.target.getAttribute('data-userName')){
            message.error('不能删除当前登录用户',3);
            return
        }
        this.SetTingDelOperatorActionCreator(Number(e.target.getAttribute('data-id')));
    }
    componentWillReceiveProps(nextProps){
        let _self = this;
        if(nextProps.Setsucc){
            this.SetTingGetDepartmentListResActionCreator(false,nextProps.DepartmentListRes)
            this.SetTingGetDepartmentListActionCreator();
            _self.setState({
                depId:'',
                form:{
                    depName:{   
                        value:'',
                        valid:false
                    },
                    NewdepName:{
                        value:'',
                        valid:false
                    }
                }
            });
            if(nextProps.DepartmentListcode) {
                this.SetTingRequestActionCreator(false);
            }
        }
    }

    render() {
        const Editprops = {
            clickID:this.state.clickID,
            EditHandleCancel:this.EditHandleCancel,
            editModalvisible:this.state.editModalvisible
        }
        const searchClass = this.state.isfocus ? 'search searchFocus' : 'search';
        function onChange(pageNumber) {
                        console.log('Page: ', pageNumber);
                }


        const { DepartmentVisible , form:{depName,NewdepName}} = this.state;
        const props = {
            status : true
        }
        if(this.props.userListInfo == null){
            return (
                <Loading {...props}/>
            );   
        }
        let colorList = ["#E68B1A","#F07891","#9C8A30","#A3D4F5","#E274BD","#E95F7D","#A698B9","#C0E974","#8BAADC","#6F9A4E"];
        return (    
            <div className='MainContent fixedHeight'>
                
                <div className="MainContent-In">      
                    <div className='settingCont'>
                        <div className='settingCont-in'>
                            <div className='table-group'>                         
                                <div className='topToolBar'>
                                    <div className='topToolBar-col'>
                                        <div className='btn' ref="DepartmentT">
                                            <button onClick={this.AddDepartmentToClick.bind(this)}>新增部门</button>
                                            <Modal                   
                                                visible={DepartmentVisible}          
                                                title="新增部门"
                                                onCancel={this.DepartmenthandleCancel}     
                                                maskClosable={false}      
                                                width="600px"      
                                                footer={null}   
                                            >
                                                <div className="AddDepartmentT">                  
         
                                                    {
                                                        this.props.OtherIsLoading ?  <div className="loadingShow">
                                                            <Icon type="loading" /><span style={{marginLeft:'6px'}}>正在请求中...</span>
                                                        </div> : null
                                                    }  

                                                    <div className="AddDepartmentT-ipt">
                                                        {
                                                            depName.error == '' ? null : <span className="tipsError">{depName.error}</span>
                                                        }
                                                        <div className="iptOuter">
                                                            <Input size="large"
                                                                   value={depName.value}                
                                                                   autoFocus
                                                                   onKeyDown={(event) => {if(event.keyCode == 32) return false}}
                                                                   onChange={(e) => this.handleValueChange('depName', e.target.value)}
                                                                   placeholder="请输入新增部门名称"
                                                            />
                                                            <div className="BtnOuter">
                                                                <Button  className='sure' size='large' onClick={this.addDepartmentBtn.bind(this)} >确定</Button >
                                                            </div>   
                                                        </div>  
                                                            
                                                    </div>
                                                    <div className="AddDepartmentT-list">
                                                        <table>
                                                            <thead>     
                                                                <tr>
                                                                    <th>部门名称</th>
                                                                    <th className="handle">操作</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {
                                                                    this.props.DepartmentListRes == null ? <tr><td colSpan="2" style={{textAlign:'center'}}>正在加载部门列表...</td></tr> : this.props.DepartmentListRes.allDepInfo.length == 0 ? <tr><td colSpan="2" style={{textAlign:'center'}}>暂无部门</td></tr> : this.props.DepartmentListRes.allDepInfo.map((ele,i) => {
                                                                        return (
                                                                            <tr key={ele.depId}>
                                                                                <td>
                                                                                    {
                                                                                        this.state.depId == ele.depId ? <div className="iptEdit">
                                                                                                                            <Input size="large"
                                                                                                                                 value={NewdepName.value}
                                                                                                                                 onChange={(e) => this.handleValueChange('NewdepName', e.target.value)}
                                                                                                                                 placeholder="请输入新的部门名称"
                                                                                                                            />
                                                                                                                            <div className="Btn">
                                                                                                                                <Button size='large' type="primary" data-depId={ele.depId} onClick={this.editToChange}>保存</Button>
                                                                                                                                <Button size='large' type="danger" data-depId={ele.depId} onClick={this.CancelEdit.bind(this)}>取消</Button>
                                                                                                                            </div>
                                                                                        </div> : ele.depName
                                                                                    }   
                                                                                </td>  
                                                                                <td className="handle">
                                                                                    <Button size='large' icon="edit" title='修改' data-depId={ele.depId} type="primary" ghost data-depName={ele.depName} onClick={this.editBtn} />
                                                                                    <Button size='large' icon="delete" title='删除' data-depId={ele.depId} type="danger" ghost onClick={this.Deldepartment} />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>

                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                        <div className='btn'>
                                            <button onClick={this.AddUserToClick}>新增操作员</button>
                                        </div>
                                        <div className={searchClass}>
                                            <input type="text" onFocus={this.onFocus} onBlur={this.onBlur} placeholder='输入搜索内容' />
                                            <div className='searchIcon'>
                                                <Icon type="search" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='table-cont'>
                                    <div className='table-head'>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>姓名</th>
                                                    <th>部门</th>
                                                    <th>员工编号</th>
                                                    <th className="userRight">权限</th>
                                                    <th>职位</th>
                                                    <th className='operation'>操作</th>
                                                </tr> 
                                            </thead>
                                        </table>             
                                    </div>
                                    <div className='table-body'>   
                                        <table>
                                            <tbody>
                                            { 
                                                this.props.userListInfo.map((ele,i) => {
                                                    return (    
                                                        <tr key={i}>
                                                            <td><Avatar size="small" style={{ backgroundColor: colorList[i] ,verticalAlign:'middle'}} icon="user" /><span style={{display:'inline-block',verticalAlign:'middle',marginLeft:'8px',fontWeight:'700'}}>{ele.user.userLoginName}</span></td>
                                                            <td>{ele.user.depName}</td>     
                                                            <td>{ele.user.workerNum}</td>  
                                                            <td className="userRight">
                                                                {
                                                                    ele.userRight.userRight !== null && ele.userRight.userRight.split(',')[0] == '1' ? <span className="power">新增</span> : null
                                                                }
                                                                {
                                                                    ele.userRight.userRight !== null && ele.userRight.userRight.split(',')[1] == '1' ? <span className="power">设计</span> : null
                                                                }
                                                                {
                                                                    ele.userRight.userRight !== null && ele.userRight.userRight.split(',')[2] == '1' ? <span className="power">设计调配</span> : null
                                                                }
                                                                {
                                                                    ele.userRight.userRight !== null && ele.userRight.userRight.split(',')[3] == '1' ? <span className="power">审核</span> : null
                                                                }
                                                                {
                                                                    ele.userRight.userRight !== null && ele.userRight.userRight.split(',')[4] == '1' ? <span className="power">审定</span> : null
                                                                }
                                                                {
                                                                    ele.userRight.userRight !== null && ele.userRight.userRight.split(',')[5] == '1' ? <span className="power">实施</span> : null
                                                                }
                                                                {
                                                                    ele.userRight.userRight !== null && ele.userRight.userRight.split(',')[6] == '1' ? <span className="power">设置</span> : null
                                                                }
                                                            </td>
                                                            <td>{ele.user.position}</td>
                                                            <td className='operation'>
                                                                {
                                                                    ele.user.userLoginName == 'admin' && JSON.parse(sessionStorage.getItem('res')).loginPeople == 'admin'? <div className='operation-in'>
                                                                        <div className='operation-col' style={{margin:'0 auto'}}>
                                                                            <button onClick={this.editHandle.bind(this)} data-id={ele.user.id} className='edit'>编辑</button>
                                                                        </div></div>: (JSON.parse(sessionStorage.getItem('res')).loginPeople == ele.user.userLoginName || JSON.parse(sessionStorage.getItem('res')).loginPeople !== 'admin') ? null : <div className='operation-in'>
                                                                        <div className='operation-col'>
                                                                            <button onClick={this.editHandle.bind(this)} data-id={ele.user.id} className='edit'>编辑</button>
                                                                        </div>
                                                                        <div className='operation-col'>
                                                                            <button  className='remove' data-id={ele.user.id} data-userName={ele.user.userLoginName} onClick={this.delUser.bind(this)}>删除</button>
                                                                        </div>
                                                                        <div className='operation-col'>
                                                                            <button className={ele.user.authorize == null || ele.user.authorize == 0　? 'start' : 'stop'} data-id={ele.user.id} data-authorize={ele.user.authorize} onClick={this.startUerBtn}>{ele.user.authorize == 1 ? '停用' : '启用'}</button>
                                                                        </div>
                                                                    </div>
                                                                }



                                                            </td>
                                                        </tr>
                                                    )
                                                })

                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='table-foot' style={{display:'none'}}>
                                        <Pagination showQuickJumper defaultCurrent={1} total={1} onChange={onChange} />
                                    </div>
                                </div>
                                <AddUser />
                                <EditUser {...Editprops}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(state => ({
    show: state.adminReducer.show,
    setTitle: state.adminReducer.setTitle,
    Setsucc: state.adminReducer.Setsucc,
    DepartmentListRes: state.adminReducer.DepartmentListRes,
    DepartmentListcode: state.adminReducer.DepartmentListcode,
    OtherIsLoading: state.adminReducer.OtherIsLoading,
    userListInfo: state.adminReducer.userListInfo,
    userListSucc: state.adminReducer.userListSucc,
    singleUserInfo: state.adminReducer.singleUserInfo,
    singleUserSucc: state.adminReducer.singleUserSucc,
}))(setting);



// {
//     (JSON.parse(sessionStorage.getItem('res')).loginPeople == ele.user.userLoginName || ele.user.userLoginName == 'admin') ? <div className='operation-in'>
//         <div className='operation-col' style={{margin:'0 auto'}}>
//             <button onClick={this.editHandle.bind(this)} data-id={ele.user.id} className='edit'>编辑</button>
//         </div>
//     </div> : <div className='operation-in'>
//         <div className='operation-col'>
//             <button onClick={this.editHandle.bind(this)} data-id={ele.user.id} className='edit'>编辑</button>
//         </div>
//         <div className='operation-col'>
//             <button  className='remove' data-id={ele.user.id} data-userName={ele.user.userLoginName} onClick={this.delUser.bind(this)}>删除</button>
//         </div>
//         <div className='operation-col'>
//             <button className={ele.user.authorize == null || ele.user.authorize == 0　? 'start' : 'stop'} data-id={ele.user.id} data-authorize={ele.user.authorize} onClick={this.startUerBtn}>{ele.user.authorize == 1 ? '停用' : '启用'}</button>
//         </div>
//     </div>
// }