/**
 * Created by Administrator on 2017-06-20.
 */
'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Loading from '../../../common/components/common/loading';
import {AdminReturnTotalNum,AdminLoadTasksList} from '../../../actions/admin';
import { Select , Progress , Icon , Spin , Menu , Badge , Radio } from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Audit extends React.Component {
    constructor() {
        super();
        this.AdminLoadTasksList = this.AdminLoadTasksList.bind(this);
        this.AdminReturnTotalNum = this.AdminReturnTotalNum.bind(this);
        this.state = {
            SelectValInit:''
        }
    }

    AdminReturnTotalNum(DoperFlag){
        this.props.dispatch(AdminReturnTotalNum(DoperFlag))
    }
    AdminLoadTasksList(TasksListId){
        this.props.dispatch(AdminLoadTasksList(TasksListId))
    }

    componentWillMount() {
        this.AdminReturnTotalNum(1);
        browserHistory.push('/audit');
        // let seletVla = sessionStorage.getItem('Selected');
        // this.setState({
        //     SelectValInit : seletVla
        // })
    }    
    handleClick(e){
        // sessionStorage.setItem('Selected',e.key);
    }
    navhandleClick(e){
        var rect = e.target.getBoundingClientRect()
        console.log('rect',rect)
    }

    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        // if(nextState.ChooseId !== this.props.TasksListId){
        //     this.AdminLoadTasksList(nextState.ChooseId);
        //     this.AdminReturnTotalNum(nextState.ChooseId);
        //     browserHistory.push('/work');
        //     this.setState({
        //         SelectValInit : null
        //     })
        // }
        return true;
    }
    
    render() {
        let  kanchashenhetipsNum = 0,
            shejishtipsNum = 0,
            shejisdtipsNum = 0,
            kanchashendingtipsNum = 0;
        const props = {
            status : true
        }
        if(this.props.Error){
            return (
                <div className="load" style={{fontSize:'16px',color:'#666'}}>服务器出错，请刷新页面再试！</div>
            )
        }else {
            if(this.props.ResponseNum == null){
                return (
                    <Loading {...props}/>
                );
            }else {
                // kanchashenhetipsNum = this.props.ResponseNum.未完成设计分配的任务数量;
                shejishtipsNum = this.props.ResponseNum.审核的任务数量;
                shejisdtipsNum = this.props.ResponseNum.审定的任务数量;
                // kanchashendingtipsNum = this.props.ResponseNum.未完成图纸设计的任务数量;
            }
        }

        const MainNavlist = [
            // {
            //     id:'01001',
            //     to:'/audit/kancha-shenhe',
            //     content:'工程勘测审核',
            //     tipsNum: 0
            // },
            {
                id:'01003',
                to:'/audit/gongchengsheji-sh',
                content:'工程设计审核',
                tipsNum: shejishtipsNum
            },
            {
                id:'01004',
                to:'/audit/gongchengsheji-sd',
                content:'工程设计审定',
                tipsNum: shejisdtipsNum
            },
            // {
            //     id:'01005',
            //     to:'/audit/gongchengkancha-shending',
            //     content:'工程勘察审定',
            //     tipsNum: 0
            // }
        ]

        function handleChange(value) {
            console.log(`Selected: ${value}`);
        }
        const handleLoading = {
            status : this.props.adminLoading || this.props.requestLoading ? true : false
        }
        return (
            <div className="MainContent fixedHeight">
                <div className="MainContent-In">
                    <div className='MainleftNav'>
                        <div className="MainleftNav-in">
                            <div className='MainNav-title'>
                                <h3>搜索查询</h3>
                            </div>
                            <div className='MainNav-search'>
                                <input type="text" placeholder='输入搜索内容' />
                                <div className='searchIcon'>
                                    <Icon type="search" />
                                </div>
                            </div>
                        </div>
                        <div className="MainleftNav-in">
                            <div className='MainNav-title'>
                                <h3>任务选项{this.props.OtherIsLoading ? <span style={{marginLeft:'12px',fontSize:'14px',color:'#08c',fontWeight:'500'}}>(正在更新列表中...)</span> : null}</h3>
                            </div>
                            <div className='nav-test' style={{display:'block'}}>
                                <Menu
                                    defaultSelectedKeys={[this.state.SelectValInit]}
                                    onClick={this.handleClick.bind(this)}
                                >
                                    {
                                        MainNavlist.map((ele,i)=>{
                                            return <Menu.Item key={ele.id}>
                                                <Link to={{pathname:ele.to}} onClick={this.navhandleClick.bind(this)} activeClassName="active">{ele.content}</Link>
                                                    <span className='tipsNum'>
                                                        <Badge count={ele.tipsNum} overflowCount={10}/>
                                                    </span>
                                            </Menu.Item>
                                        })
                                    }
                                </Menu>

                            </div>
                            <div className='MainNav-list' ref='navList' style={{display:'none'}}>
                                <Select
                                    size='large'
                                    defaultValue="请选择任务类型"
                                    onChange={handleChange}
                                    style={{ width: '100%' }}
                                    getPopupContainer={()=>this.refs.navList}
                                >
                                    {
                                        MainNavlist.map((ele,i)=>{
                                            return <Option key={ele.id}>
                                                <Link to={ele.to} activeClassName="active">{(i+1)+'、'}{ele.content}</Link>
                                            <span className='tipsNum'>
                                                <Badge count={ele.tipsNum} />
                                            </span>
                                            </Option>
                                        })
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className="MainleftNav-in" style={{display:'none'}}>
                            <div className='MainNav-title'>
                                <h3>任务进度</h3>
                            </div>
                            <div className='MainNav-Progress'>
                                <Progress type="circle" percent={75} />
                                <div className='Progress-mes'>总共100，<br/>已完成75，<br/>还剩余25个未处理</div>
                            </div>
                        </div>
                        <div className="leftBG"></div>
                    </div>
                    <div className="MainRightCont">
                        <div style={{position:'absolute',overflow:'hidden',top:'0',left:'0',right:'0',bottom:'0'}}>
                            <div className={ this.props.adminLoading || this.props.requestLoading ? 'LoadingOuter Isloading' : 'LoadingOuter'}>
                                <div style={{position:'relative',width:'100%',height:'100%'}}>
                                    <Loading {...handleLoading}/>
                                </div>
                                <div className="LoadingBlur">
                                </div>
                            </div>
                        </div>
                        <div style={{position:'absolute',overflow:'auto',top:'0',left:'0',right:'0',bottom:'0'}}>
                            {
                                this.props.children && React.cloneElement(
                                    this.props.children , {
                                        AdminReturnTotalNum : this.AdminReturnTotalNum
                                    })
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }  
}  
export default connect(state => ({
    res: state.adminReducer.res,
    TasksListId: state.adminReducer.TasksListId,
    Error: state.adminReducer.Error,
    ResponseNum: state.adminReducer.ResponseNum,
    OtherIsLoading: state.adminReducer.OtherIsLoading,
    adminLoading: state.adminReducer.adminLoading,
    requestLoading: state.adminReducer.requestLoading,
}))(Audit);