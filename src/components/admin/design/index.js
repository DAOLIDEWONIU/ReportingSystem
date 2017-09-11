/**
 * Created by Administrator on 2017-06-20.
 */
'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {AdminReturnTotalNum,AdminLoadTasksList} from '../../../actions/admin';
import { Select , Spin , Menu , Progress , Icon , Badge , Radio } from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Loading from '../../../common/components/common/loading';
class Design extends React.Component {        
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
    componentWillMount() {
        this.AdminReturnTotalNum(this.props.TasksListId);
    }
    RadioChange(e) {
        this.setState({
            ChooseId : e.target.value
        });
    }
    onSelect(value) {
        console.log(`onSelect: ${value}`);
    }
    handleClick(e){
        sessionStorage.setItem('Selected',e.key);
    }
    onmenuSelect({ item, key, selectedKeys }){
        this.setState({
            SelectValInit : key
        })
    }

    /*生命周期的Hook,用来决定该组件是否重新Render。*/
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.ChooseId !== this.props.TasksListId){
            this.AdminLoadTasksList(nextState.ChooseId);
            this.AdminReturnTotalNum(nextState.ChooseId);
            browserHistory.push('/design');
            this.setState({
                SelectValInit : null
            })
            return false;
        }
        return true;
    }
    
    render() {
        const {Error , ResponseNum , adminLoading , requestLoading , OtherIsLoading , TasksListId} = this.props;

        let  diaopeitipsNum = 0,
             kancetipsNum = 0,
             shejitipsNum = 0,
             xiaoduitipsNum = 0,
             biangengtipsNum = 0;
        const props = {
            status : true
        }
 
        if(Error){
            return (
                <div className="load" style={{fontSize:'16px',color:'#666'}}>服务器出错，请刷新页面再试！</div>
                )
        }else {
            if(ResponseNum == null){
                return (
                    <Loading {...props}/>
                );
            }else {
                diaopeitipsNum = ResponseNum.设计分配的任务数量 !== undefined ? ResponseNum.设计分配的任务数量 : null;
                kancetipsNum = ResponseNum.业务勘察的任务数量;
                xiaoduitipsNum = ResponseNum.图纸校对的任务数量 !== undefined ? ResponseNum.图纸校对的任务数量 : null;
                shejitipsNum = ResponseNum.图纸设计的任务数量;
                biangengtipsNum = ResponseNum.图纸修改的任务数量 !== undefined ? ResponseNum.图纸修改的任务数量 : null;
            }
        }
        const MainNavDiaoPei = [
            {
                id:'12',
                to:'/design/sheji-diaopei',
                content:'设计调配',
                tipsNum: diaopeitipsNum
            }
        ];            
        const MainNavDesign = [
            {
                id:'12',
                to:'/design/sheji-diaopei',
                content:'设计调配',
                tipsNum: diaopeitipsNum,
            },
            {
                id:'13',
                to:'/design/yewu-kance',
                content:'业务勘测',
                tipsNum: kancetipsNum
            },
            {
                id:'14',
                to:'/design/tuzhi-sheji',
                content:'图纸设计',
                tipsNum: shejitipsNum
            },
            {
                id:'15',
                to:'/design/shejigao-xiaodui',
                content:'设计稿校对',
                tipsNum: xiaoduitipsNum
            },
            {
                id:'19',
                to:'/design/gongcheng-biangeng',
                content:'工程变更',
                tipsNum: biangengtipsNum
            },
            // {
            //     id:'16',
            //     to:'/design/sheji-zhongzhi',
            //     activeClassName:'active',
            //     content:'设计终止',
            //     tipsNum: 0
            // },
            // {
            //     id:'17',
            //     to:'/design/kancha-zhongzhi',
            //     content:'勘查终止',
            //     tipsNum: 0
            // },
            // {
            //     id:'18',
            //     to:'/design/chongxing-sheji',
            //     content:'重新设计',
            //     tipsNum: 0
            // },
        ];
        const  response = JSON.parse(sessionStorage.getItem('res'));
        function handleChange(value) {
            console.log(`Selected: ${value}`);
        }

        /*设计列表*/
        function Navlist() {   
            let MainNavlist;
            switch (true){
                case response.loginRight[1] == 1 :
                    MainNavlist = MainNavDesign;   
                    break;
                case response.loginRight[5] == 1 :
                    MainNavlist = MainNavDiaoPei;
                    break;
            }
            return MainNavlist
        }

        const  NoHandleNum = diaopeitipsNum + kancetipsNum + xiaoduitipsNum + shejitipsNum;
        const  totalNum = diaopeitipsNum + kancetipsNum + xiaoduitipsNum + shejitipsNum + ResponseNum.安装水表的任务数量 + ResponseNum.审定的任务数量 + ResponseNum.审核的任务数量 + ResponseNum.施工的任务数量 + ResponseNum.正在重新受理的任务数量 + ResponseNum.缴费的任务数量;

        const handleLoading = {
            status : adminLoading || requestLoading ? true : false
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
                                <h3>任务选项{OtherIsLoading ? <span style={{marginLeft:'12px',fontSize:'14px',color:'#08c',fontWeight:'500'}}>(正在更新列表中...)</span> : null}</h3>
                            </div>
                            <div className='MainNav-choose'>
                                <RadioGroup defaultValue="1" onChange={this.RadioChange.bind(this)} size="large" style={{margin:"0 auto"}}>
                                    <RadioButton value="1">未完成</RadioButton>
                                    <RadioButton value="2">已完成</RadioButton>
                                    <RadioButton value="3">已终止</RadioButton>
                                </RadioGroup>
                            </div>
                            <div className='nav-test' style={{display:'block'}}>  
                                <Menu
                                    selectedKeys={[this.state.SelectValInit]}
                                    onSelect={this.onmenuSelect.bind(this)}
                                >
                                    {
                                        Navlist().map((ele,i)=>{
                                            return <Menu.Item key={ele.id}  disabled={ele.tipsNum == null ? true : false}>
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
                        {
                            TasksListId == 1 ? <div className="MainleftNav-in" style={{display:'none'}}>
                                <div className='MainNav-title'>
                                    <h3>任务进度</h3>  
                                </div>     
                                <div className='MainNav-Progress'>
                                    <div className='Progress-outer'>
                                        <Progress type="circle" width={80} percent={Math.round((totalNum-NoHandleNum) / totalNum * 100)} />
                                    </div>
                                    <div className='Progress-mes'>
                                        <div className='Progress-mes-list'>
                                            <span className="name">已完成</span>
                                            <span className="num"><span style={{padding:'0 12px',border:'1px solid #cfefdf',borderRadius:'4px',color: '#00a854',backgroundColor:'#ebf8f2',fontSize:'14px',lineHeight:'20px'}}>{totalNum-NoHandleNum}</span></span>
                                        </div>
                                        <div className='Progress-mes-list'>
                                            <span className="name">剩余</span>
                                            <span className="num"><span style={{padding:'0 12px',border:'1px solid #fff3cf',borderRadius:'4px',color: '#ffbf00',backgroundColor:'#fffaeb',fontSize:'14px',lineHeight:'20px'}}>{NoHandleNum}</span></span>
                                        </div>
                                        <div className='Progress-mes-list'>
                                            <span className="name">共计</span>
                                            <span className="num"><span style={{padding:'0 12px',border:'1px solid #d2eafb',borderRadius:'4px',color: '#108ee9',backgroundColor:'#ecf6fd',fontSize:'14px',lineHeight:'20px'}}>{totalNum}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                        }
                        <div className="leftBG"></div>

                    </div>
                    <div className="MainRightCont">
                        <div style={{position:'absolute',overflow:'hidden',top:'0',left:'0',right:'0',bottom:'0'}}>
                            <div className={ adminLoading || requestLoading ? 'LoadingOuter Isloading' : 'LoadingOuter'}>
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
    
}))(Design);

// this.props.adminLoading

/**
 *   <div className={ true ? 'LoadingOuter Isloading' : 'LoadingOuter'}>
 <div style={{position:'relative',width:'100%',height:'100%'}}>
 <Loading {...handleLoading}/>
 </div>
 <div className="LoadingBlur">
 </div>
 </div>
 *
 *
 * */
