/**
 * Created by Administrator on 2017-06-20.
 */
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import {adminSetAddUser,SetTingGetDepartmentListActionCreator,SetTingAddOperatorActionCreator,SetTingGetUserListActionCreator} from '../../../../actions/admin';
import './index.scss';
import md5 from 'md5';
import { Icon , Pagination , Modal , Button , Input , message , Tree , Select , AutoComplete} from 'antd';
const Option = AutoComplete.Option;
const TreeNode = Tree.TreeNode;
class addUser extends React.Component {
    constructor() {
        super();
        this.adminSetAddUser = this.adminSetAddUser.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.SetTingGetDepartmentListActionCreator = this.SetTingGetDepartmentListActionCreator.bind(this);
        /**增加操作员*/
        this.SetTingAddOperatorActionCreator = this.SetTingAddOperatorActionCreator.bind(this);
        this.SetTingGetUserListActionCreator = this.SetTingGetUserListActionCreator.bind(this);
        this.state = {
            Loading: false,
            result: [],
            selectedKeys:[''],
            depName:null,
            userRight:null,//用户权限
            form: {//valid表示该值的有效状态，value表示该表单具体的值，error表示错误提示信息：
                userTrueName: {//,,,,,,,,
                    valid: false,
                    value: '',
                    error: ''
                },
                userLoginName: {
                    valid: false,
                    value: '',
                    error: ''
                },
                userPassword: {
                    valid: false,
                    value: '',
                    error: ''
                },
                depId:{
                    valid: false,
                    value: '',
                    error: ''
                },
                position: {
                    valid: false,
                    value: '',
                    error: ''
                },
                workerNum: {
                    valid: false,
                    value: '',
                    error: ''
                },
                email: {
                    valid: false,
                    value: '',
                    error: ''
                },
                phone: {
                    valid: false,
                    value: '',
                    error: ''
                },
                pquesrion: {
                    valid: false,
                    value: '',
                    error: ''
                },
                panswer: {
                    valid: false,
                    value: '',
                    error: ''
                },
            }
        }
    }
    /**获取所有部门*/
    SetTingGetDepartmentListActionCreator(){              
        this.props.dispatch(SetTingGetDepartmentListActionCreator())// authorize:action.authorize,
    }
    SetTingAddOperatorActionCreator(userTrueName,userLoginName,userPassword,depId,depName,position,workerNum,email,phone,pquesrion,panswer,authorize,userRight,ursystemId){
        this.props.dispatch(SetTingAddOperatorActionCreator(userTrueName,userLoginName,userPassword,depId,depName,position,workerNum,email,phone,pquesrion,panswer,authorize,userRight,ursystemId))
    }


    componentWillMount() {
        this.SetTingGetDepartmentListActionCreator();
    }
    adminSetAddUser(show) {
        this.props.dispatch(adminSetAddUser(show));
    }

    handleOk() {
        this.setState({ Loading: true });
        setTimeout(() => {
            this.setState({ Loading: false});
            this.adminSetAddUser(false);
        }, 3000);
    }
    handleCancel() {
        this.adminSetAddUser(false);
    }
    onCheck = (checkedKeys, info) => {
        let add = checkedKeys.indexOf('0-0') == -1 ? '0,' : '1,';
        let desiPople = checkedKeys.indexOf('0-1-0') == -1 ? '0,' : '1,';
        let desiDP = checkedKeys.indexOf('0-1-1') == -1 ? '0,' : '1,';
        let SHPople = checkedKeys.indexOf('0-2-0') == -1 ? '0,' : '1,';
        let SDPople = checkedKeys.indexOf('0-2-1') == -1 ? '0,' : '1,';
        let Work = checkedKeys.indexOf('0-3') == -1 ? '0,' : '1,';
        let Seting = checkedKeys.indexOf('0-4') == -1 ? '0' : '1';
        this.setState({
            selectedKeys : checkedKeys,
            userRight : (add+desiPople+desiDP+SHPople+SDPople+Work+Seting),
        })

    }
    /**表单操作*/
    handleValueChange (field, value, type = 'string') {
        if (type === 'number') {
            value = +value;
        }
        const {form} = this.state;
        const newFieldObj = {value, valid: true, error: ''};
  
        switch (field) {
            case 'userTrueName': {
                if (value.length == 0) {
                    newFieldObj.error = '真实姓名不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'userLoginName': {
                if(value.length == 0){
                    newFieldObj.error = '登录名称不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'userPassword':{
                if(value.length == 0){
                    newFieldObj.error = '登录密码不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'depId':{
                if(value.length == 0){
                    newFieldObj.error = '部门不能为空';
                    newFieldObj.valid = false;
                }
            }
            case 'position':{
                if(value.length == 0){
                    newFieldObj.error = '职位不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'workerNum':{
                if(value.length == 0){
                    newFieldObj.error = '员工编号不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'email':{
                if(value.length == 0){
                    newFieldObj.error = 'E-mail不能为空';
                    newFieldObj.valid = false;
                }else if(!(/^([a-zA-Z0-9_\.-]+)@([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})$/.test(value))){
                    newFieldObj.error = 'E-mail格式错误';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'phone':{
                if(value.length == 0){
                    newFieldObj.error = '电话号码不能为空';    
                    newFieldObj.valid = false;
                }else if(!(/^0\d{2,3}-?\d{7,8}|1[34578]\d{9}$/.test(value))){
                    newFieldObj.error = '电话号码格式错误';
                    newFieldObj.valid = false;
                }
                break;  
            }
            case 'pquesrion':{
                if(value.length == 0){
                    newFieldObj.error = '提示问题不能为空';
                    newFieldObj.valid = false;
                }
                break;
            }
            case 'panswer':{
                if(value.length == 0){
                    newFieldObj.error = '密码答案不能为空';
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
    addUser() {
        const {userRight,form: {userTrueName,userLoginName,userPassword,depId,position,workerNum,email,phone,pquesrion,panswer}} = this.state;
        message.config({
            top: 24,
        });
        if(!userTrueName.valid || !userLoginName.valid || !userPassword.valid || !depId.valid || !position.valid || !workerNum.valid || !email.valid || !phone.valid || !pquesrion.valid || !panswer.valid){
            message.warning('请填写正确的表单信息！');
            return
        }else if(userRight == null){

            message.warning('请选择添加用户权限！');
            return
        }

        console.log('获取的权限',this.state.userRight)
        this.SetTingAddOperatorActionCreator(userTrueName.value,userLoginName.value,md5(userPassword.value),Number(depId.value),this.state.depName,position.value,workerNum.value,email.value,phone.value,pquesrion.value,panswer.value,1,this.state.userRight,3)
    }

    handleSearch = (value) => {
        let result;
        if (!value || value.indexOf('@') >= 0) {
          result = [];
        } else {
          result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
        }
        this.setState({ result });
    }

    /**获取用户列表*/
    SetTingGetUserListActionCreator(){
        this.props.dispatch(SetTingGetUserListActionCreator());
    }

    componentWillReceiveProps(nextProps){
        let _self = this;
        if(nextProps.addUserSucc){
            this.SetTingGetUserListActionCreator();
            _self.setState({
                depName:null,
                selectedKeys:[''],
                form: {
                    userTrueName: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    userLoginName: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    userPassword: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    depId:{
                        valid: false,
                        value: '',
                        error: ''
                    },
                    position: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    workerNum: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    email: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    phone: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    pquesrion: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                    panswer: {
                        valid: false,
                        value: '',
                        error: ''
                    },
                }
            })
        }
    }

    onSelect(value, option){
        this.setState({
            depName : option.props.children
        })
    }
    
    
    render() {
        const {result,form: {userTrueName,userLoginName,userPassword,depId,position,workerNum,email,phone,pquesrion,panswer}} = this.state;
        const dataSource = ['我的生日？（xx年xx月xx日）','我配偶的生日？（xx年xx月xx日）', '我最喜欢的地方？', '我的居住地？'];
        return (
            <div>
                <Modal
                    visible={this.props.show} 
                    title="新增操作员"
                    onOk={this.handleOk.bind(this)}      
                    onCancel={this.handleCancel.bind(this)}
                    width='800px'   
                    wrapClassName="addUser"
                    maskClosable={false}
                    footer={null}
                > 
                    <div className='leftForm'>
                        <div className='title'><i className='iconfont icon-quanxian' style={{marginRight:'6px'}} />权限设置</div>
                        <div className='leftpower-list'>
                             <Tree
                                checkable
                                showLine={true}
                                checkedKeys={this.state.selectedKeys}
                                onCheck={this.onCheck}
                            >
                                <TreeNode title="受理" key="0-0" />
                                <TreeNode title="设计" key="0-1">
                                    <TreeNode title="设计人员" key="0-1-0" />
                                    <TreeNode title="设计调派" key="0-1-1" />
                                </TreeNode>
                                <TreeNode title="审核" key="0-2">
                                    <TreeNode title="审核人员" key="0-2-0" />
                                    <TreeNode title="审定人员" key="0-2-1" />
                                </TreeNode>
                                <TreeNode title="实施" key="0-3" />
                                <TreeNode title="设置" key="0-4" />
                            </Tree>
                        </div>
                    </div>
                    <div className='rightForm'>
                        <div className="form-col-ipt">
                            <div className="title">真实姓名:{userTrueName.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{userTrueName.error}）</span>}</div>
                            <div className="ipt">
                                <Input
                                    size="large"
                                    value={userTrueName.value}
                                    onChange={(e) => this.handleValueChange('userTrueName', e.target.value)}
                                    placeholder="请输入您的真实姓名" />       
                            </div>        
                        </div>
                        <div className="form-col-ipt">                    
                            <div className="title">登录名:{userLoginName.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{userLoginName.error}）</span>}</div>
                            <div className="ipt">
                                <Input
                                    size="large"
                                    value={userLoginName.value}
                                    onChange={(e) => this.handleValueChange('userLoginName', e.target.value)}
                                    placeholder="请输入您的用户登录名" />
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">登录密码:{userPassword.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{userPassword.error}）</span>}</div>
                            <div className="ipt">
                                <Input
                                    size="large"
                                    value={userPassword.value}
                                    type="password"
                                    onChange={(e) => this.handleValueChange('userPassword', e.target.value)}
                                    placeholder="请输入您的用户登录密码" />
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">部门:{depId.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{depId.error}）</span>}</div>
                            <div className="ipt">
                                <Select
                                    placeholder='请选择部门'
                                    style={{ width: '100%' ,height : 40}}
                                    value={depId.value ? depId.value : undefined}
                                    onSelect={this.onSelect.bind(this)}
                                    onChange={(value) => this.handleValueChange('depId', value)}
                                >

                                    {
                                        this.props.DepartmentListRes == null ? null : this.props.DepartmentListRes.allDepInfo.map((ele,i) => {
                                            return (
                                                <Select.Option key={ele.depId} value={ele.depId.toString()}>{ele.depName}</Select.Option>
                                            )
                                        })
                                    } 
                                </Select>
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">职位:{position.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{position.error}）</span>}</div>
                            <div className="ipt">
                                <Input
                                    size="large"
                                    value={position.value}
                                    onChange={(e) => this.handleValueChange('position', e.target.value)}
                                    placeholder="请输入职位" />
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">员工编号:{workerNum.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{workerNum.error}）</span>}</div>
                            <div className="ipt">
                                <Input
                                    size="large"
                                    value={workerNum.value}
                                    onChange={(e) => this.handleValueChange('workerNum', e.target.value)}
                                    placeholder="请输入员工编号" />
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">电子邮件:{email.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{email.error}）</span>}</div>
                            <div className="ipt">
                                <AutoComplete
                                    style={{ width: '100%' }}
                                    onSearch={this.handleSearch}
                                    value={email.value}
                                    onChange={(value) => this.handleValueChange('email', value)}
                                    placeholder="请输入您的电子邮件"
                                >
                                    {
                                        result.map((email) => {
                                                return <Option key={email}>{email}</Option>;
                                            })
                                    }
                                </AutoComplete>
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">电话号码:{phone.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{phone.error}）</span>}</div>
                            <div className="ipt">
                                <Input
                                    size="large"
                                    value={phone.value}
                                    maxLength='11'
                                    onChange={(e) => this.handleValueChange('phone', e.target.value)}
                                    placeholder="请输入您的电话号码" />
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">密码提示问题:{pquesrion.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{pquesrion.error}）</span>}</div>
                            <div className="ipt">
                                <AutoComplete
                                    style={{ width: '100%' }}
                                    dataSource={dataSource}
                                    value={pquesrion.value}
                                    onChange={(value) => this.handleValueChange('pquesrion', value)}
                                    placeholder="请输入您的密码提示问题？"
                                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                />
                            </div>
                        </div>
                        <div className="form-col-ipt">
                            <div className="title">密码回答答案:{panswer.error == '' ? null : <span style={{color:'rgb(240, 65, 52)'}}>（{panswer.error}）</span>}</div>
                            <div className="ipt">
                                <Input
                                    size="large"
                                    value={panswer.value}
                                    onChange={(e) => this.handleValueChange('panswer', e.target.value)}
                                    placeholder="请输入您的密码回答答案" />
                            </div>
                        </div>
                        <div className="form-col-ipt" style={{width:'100%'}}>
                            <div className="title"></div>
                            <div className="ipt" style={{textAlign:'center'}}>
                                <Button  className='submit' size='large' onClick={this.addUser.bind(this)}>提交</Button >
                            </div>
                        </div>
                    </div> 
                </Modal>      
            </div>
        );
    }
}
export default connect(state => ({
    show: state.adminReducer.show,
    DepartmentListRes: state.adminReducer.DepartmentListRes,
    addUserSucc: state.adminReducer.addUserSucc,
    addUserRes: state.adminReducer.addUserRes,
}))(addUser);