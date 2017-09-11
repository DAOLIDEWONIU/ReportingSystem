'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import { Pagination , Spin , Table , Icon} from 'antd';
import {connect} from 'react-redux';
import {AdminLoadTasksList,AdminLoadIDQueryRes,adminPagenumActionCreator} from '../../../../actions/admin';
// import './index.scss';

class gongchengbiangeng extends React.Component {
    constructor() {
        super();
        this.AdminLoadIDQueryRes = this.AdminLoadIDQueryRes.bind(this);
        this.AdminLoadTasksList = this.AdminLoadTasksList.bind(this);
        this.adminPagenumActionCreator = this.adminPagenumActionCreator.bind(this);
        this.pageChange = this.pageChange.bind(this);
    }

    AdminLoadIDQueryRes(QueryRes) {
        this.props.dispatch(AdminLoadIDQueryRes(QueryRes))
    }
    AdminLoadTasksList(TasksListId){
        this.props.dispatch(AdminLoadTasksList(TasksListId))
    }
    // 分页操作
    adminPagenumActionCreator(resultFlag,page){
        this.props.dispatch(adminPagenumActionCreator(resultFlag,page))
    }


    componentWillMount() {
        /**获取列表*/
        // this.adminPagenumActionCreator(this.props.TasksListId,0);
        this.AdminLoadTasksList(this.props.TasksListId);
        /**loading 状态*/
        this.AdminLoadIDQueryRes(null);
    }
    /**分页切换*/
    pageChange(pageNumber) {
        this.adminPagenumActionCreator(this.props.TasksListId,pageNumber-1);
    }


    render() {
        function onChange(pageNumber) {
            console.log('Page: ', pageNumber);
        }
        const loadStyle = {
            backgroundColor: '#d1f0ff',
            color:'#08c'
        };
        if(this.props.res == null || this.props.res.图纸修改的任务 == null){
            return (
                <div className="load"><Spin size="large" tip="正在加载中..."/></div>
            );
        }else {
            if(this.props.res.图纸修改的任务.dataSize == undefined || this.props.res.图纸修改的任务.dataSize == 0){
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
            <Spin spinning={this.props.adminLoading} tip="正在加载中..." size="large" delay={500}>
                <div className="MainRightContIn">
                    <div className="MainRightContIn-in">
                        <div className='MainRightCont-tips'>
                            <table>
                                <tbody>
                                {
                                    this.props.ListLoading ? <tr><td colSpan="3" style={loadStyle}>正在获取最新数据...</td></tr> : <tr>
                                        <td className="projId">项目ID</td>
                                        <td>项目标题</td>
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
                                    this.props.res.图纸修改的任务.data.map((ele,i)=>{
                                        return <tr key={i}>
                                            <td className="projId">
                                                <span className="projId-in" style={{background:colorList[i]}}>{ele.id}</span>
                                            </td>
                                            <td><Link to={'/design/gongcheng-biangeng/'+ele.id}>{decodeURI(ele.acceptName)}</Link></td>
                                            <td className='deltime'>{ele.acceptTime}</td>
                                            <td className='delcode'>{delcode}</td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                            <div className='Pagination'>
                                <Pagination showQuickJumper defaultCurrent={1} defaultPageSize={15} total={this.props.ResponseNum.设计分配的任务数量} onChange={this.pageChange}  />
                            </div>
                        </div>
                    </div>

                </div>
            </Spin>
        );
    }
}
export default connect(state => ({
    TasksListId: state.adminReducer.TasksListId,
    res: state.adminReducer.res,
    QueryRes: state.adminReducer.QueryRes,
    SRequest: state.adminReducer.SRequest,
    adminLoading: state.adminReducer.adminLoading,
    ResponseNum: state.adminReducer.ResponseNum,
    ListLoading: state.adminReducer.ListLoading,
}))(gongchengbiangeng);