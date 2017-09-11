'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import { Pagination , Spin , Icon} from 'antd';
import {connect} from 'react-redux';
import {AdminLoadIDQueryRes,AdminLoadTasksList,adminPagenumActionCreator,activeClassName} from '../../../../actions/admin';
import Loading from '../../../../common/components/common/loading';
class tuzhisheji extends React.Component {
    constructor() {
        super();
        this.AdminLoadTasksList = this.AdminLoadTasksList.bind(this);
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.activeClassName = this.activeClassName.bind(this);
    }
    AdminLoadIDQueryRes(QueryRes) {
        this.props.dispatch(AdminLoadIDQueryRes(QueryRes))
    }
    /**获取任务列表*/
    AdminLoadTasksList(TasksListId){
        this.props.dispatch(AdminLoadTasksList(TasksListId))
    }

    componentWillMount() {
        this.AdminLoadTasksList(this.props.TasksListId);
        this.AdminLoadIDQueryRes(null);
    }
    // 分页操作
    adminPagenumActionCreator(resultFlag,page){
        this.props.dispatch(adminPagenumActionCreator(resultFlag,page))
    }
                     
    /**分页切换*/  
    pageChange(pageNumber) {
        this.adminPagenumActionCreator(this.props.TasksListId,pageNumber-1);
    }

    activeClassName(markId){
        this.props.dispatch(activeClassName(markId))
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.markId !== null) {
            setTimeout(()=>{
                this.activeClassName(null);
            },2400)
        }
    }
    render() {
        const { markId , res , ResponseNum , ListLoading} = this.props;
        const loadStyle = {
            backgroundColor: '#d1f0ff',
            color:'#08c'
        };
        const props = {
            status : true
        }
        if(res == null || res.图纸设计的任务 == null){
            return (
                <Loading {...props}/>
            );
        }else {
            if(res.图纸设计的任务.dataSize == undefined || res.图纸设计的任务.dataSize == 0){
                return (
                    <div className="nothing">
                        <div className="iconOut">
                            <Icon type="frown-o" />
                        </div>
                        <div className="word">暂无数据</div>
                    </div>
                )
            }
        }
        let colorList = ["#E68B1A","#F07891","#9C8A30","#A3D4F5","#E274BD","#E95F7D","#A698B9","#C0E974","#8BAADC","#6F9A4E"];
        return (
           
                <div className="MainRightContIn">
                    <div className="MainRightContIn-in">
                        <div className='MainRightCont-tips'>
                            <table>
                                <tbody>
                                {
                                    ListLoading ? <tr><td colSpan="3" style={loadStyle}>正在获取最新数据...</td></tr> : <tr>
                                        <td className="projId">项目ID</td>
                                        <td colSpan="1">项目标题</td>
                                        <td className='deltime'>时间</td>
                                        <td className='delcode'>处理状态</td>
                                    </tr>
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className='MainRightCont-list'>
                            <table>
                                <tbody>
                                {
                                    res.图纸设计的任务.data.map((ele,i)=>{
                                        return <tr key={i} className={markId !== null && markId == ele.id ? 'active' : ''}>
                                            <td className="projId">
                                                <span className="projId-in" style={{background:colorList[i]}}>{ele.id}</span>
                                            </td>
                                            <td><Link to={'/design/tuzhi-sheji/'+ele.id}>{(i+1)+'、'+decodeURI(ele.acceptName)}</Link></td>
                                            <td className='deltime'>{ele.acceptTime}</td>
                                            <td className='delcode'>{ele.busiStatusMsg}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                            <div className='Pagination'>
                                <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={15} total={ResponseNum.图纸设计的任务数量} onChange={this.pageChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>

        );
    }
}
export default connect(state => ({
    res: state.adminReducer.res,
    QueryRes: state.adminReducer.QueryRes,
    TasksListId: state.adminReducer.TasksListId,
    adminLoading: state.adminReducer.adminLoading,
    ResponseNum: state.adminReducer.ResponseNum,
    ListLoading: state.adminReducer.ListLoading,
    markId: state.adminReducer.markId,
}))(tuzhisheji);