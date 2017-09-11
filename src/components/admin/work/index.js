/**
 * Created by Administrator on 2017-06-20.
 */
'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {AdminReturnTotalNum,AdminLoadTasksList} from '../../../actions/admin';
import { Select , Progress , Menu , Spin , Icon , Badge , Radio } from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Loading from '../../../common/components/common/loading';
class work extends React.Component {
    constructor() {
        super();
        this.AdminLoadTasksList = this.AdminLoadTasksList.bind(this);
        this.AdminReturnTotalNum = this.AdminReturnTotalNum.bind(this);
        this.state = {
            SelectValInit:null,
            ChooseId:'1',
        }
    }
    AdminReturnTotalNum(DoperFlag){
        this.props.dispatch(AdminReturnTotalNum(DoperFlag))
    }
    AdminLoadTasksList(TasksListId){
        this.props.dispatch(AdminLoadTasksList(TasksListId))
    }

    // RadioChange(e) {
    //     this.AdminLoadTasksList(e.target.value);
    //     this.AdminReturnTotalNum(e.target.value);
    // }

    componentWillMount() {
        this.AdminReturnTotalNum(this.props.TasksListId);

        // let seletVla = sessionStorage.getItem('Selected');
        // this.setState({
        //     SelectValInit : seletVla
        // })
    }

    RadioChange(e) {
        this.setState({
            ChooseId : e.target.value
        });
    }

    onmenuSelect({ item, key, selectedKeys }){
        this.setState({
            SelectValInit : key
        })
        // sessionStorage.setItem('Selected',key);

    }
    

    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.ChooseId !== this.props.TasksListId){
            this.AdminLoadTasksList(nextState.ChooseId);
            this.AdminReturnTotalNum(nextState.ChooseId);
            browserHistory.push('/work');
            this.setState({
                SelectValInit : null
            })
        }
        return true;
    }

    render() {
        let GCjiaofeitipsNum = 0,
            GCshigongtipsNum = 0,
            GCanzhuangtipsNum = 0;
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
                GCjiaofeitipsNum = this.props.ResponseNum.缴费的任务数量;
                GCshigongtipsNum = this.props.ResponseNum.施工的任务数量;
                GCanzhuangtipsNum = this.props.ResponseNum.需要安装水表的任务数量;
            }
        }
        const MainNavlist = [
            {
                id:'401',
                to:'/work/gongcheng-jiaofei',
                content:'工程待缴费',
                tipsNum: GCjiaofeitipsNum
            },
            {
                id:'402',
                to:'/work/gongcheng-jiaofeiQR',
                content:'工程缴费确认',
                tipsNum: GCshigongtipsNum
            },
            // {
            //     id:'403',
            //     to:'/work/gongcheng-anzhuang',
            //     content:'工程安装水表',
            //     tipsNum: GCanzhuangtipsNum
            // }
        ];
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
                            <div className='MainNav-choose'>
                                <RadioGroup defaultValue="1" onChange={this.RadioChange.bind(this)} size="large" style={{margin:"0 auto"}}>
                                    <RadioButton value="1" style={{width:'50%'}}>未完成</RadioButton>
                                    <RadioButton value="3" style={{width:'50%'}}>已终止</RadioButton>
                                </RadioGroup>    
                            </div>
                            <div className='nav-test' style={{display:'block'}}>
                                <Menu
                                    selectedKeys={[this.state.SelectValInit]}
                                    onSelect={this.onmenuSelect.bind(this)}
                                >
                                    {
                                        MainNavlist.map((ele,i)=>{
                                            return <Menu.Item key={ele.id} >
                                                <Link to={{pathname:ele.to}} activeClassName="active">{ele.content}</Link>
                                                    <span className='tipsNum'>
                                                        <Badge count={ele.tipsNum} overflowCount={10}/>
                                                    </span>
                                            </Menu.Item>
                                        })
                                    }
                                </Menu>

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
                                        AdminReturnTotalNum : this.AdminReturnTotalNum,
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
}))(work);