/**
 * Created by Administrator on 2017-04-01.
 */

'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import './index.scss';
import {Menu, Dropdown, Icon } from 'antd';

class leftnav extends React.Component {
    constructor() {
        super();
        this.state = {
            initnav : true ,
            navstyle : true
        };
        this.auto_control_nav = this.auto_control_nav.bind(this);
    }
    auto_control_nav() {
        var _self = this;
        if(_self.state.initnav === true) {
            _self.setState({
                initnav : false
            });
            _self.refs.index_left_nav.className = 'index_left_nav index_left_nav_change';
            _self.refs.UserImg.className = 'UserImg UserImg_change';
            _self.refs.User_ms.className = 'User_ms User_ms_change';
            _self.refs.UserHandle.className = 'UserHandle UserHandle_change';
            // _self.refs.index_left_cont.className = 'index_left_cont index_left_cont_change';

        }else {
            _self.setState({
                initnav : true
            });
            _self.refs.index_left_nav.className = 'index_left_nav';
            _self.refs.UserImg.className = 'UserImg';
            _self.refs.User_ms.className = 'User_ms';
            _self.refs.UserHandle.className = 'UserHandle';
            // _self.refs.index_left_cont.className = 'index_left_cont';
        }
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item key="1">修改密码</Menu.Item>
                <Menu.Item key="2">退出登录</Menu.Item>
            </Menu>
        );
        const AutoChangeNav = this.state.initnav ? <Icon type="menu-fold" /> : <Icon type="menu-unfold" />;
        return (
            <div className="index_left_nav" ref="index_left_nav">
                <div className="User_ms" ref="User_ms">
                    <div className="UserImg" ref="UserImg"></div>
                    <div className="UserHandle" ref="UserHandle">
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="javascript:;">张三 <Icon type="down" /></a>
                        </Dropdown>
                    </div>
                </div>
                <ul>
                    <li className="auto_control_nav" onClick={this.auto_control_nav.bind(this)}>{AutoChangeNav}</li>
                    <li><Link  activeClassName="btn" to="/index/Toll"><Icon type="pay-circle-o" />营业收费</Link></li>
                    <li><Link  activeClassName="btn" to="/index/record"><Icon type="filter" />档案管理</Link></li>
                    <li><Link  activeClassName="btn" to="/index/reading"><Icon type="edit" />抄表管理</Link></li>
                    <li><Link  activeClassName="btn" to="/index/tool"><Icon type="tag-o" />工具卡片</Link></li>
                    <li><Link  activeClassName="btn" to="/index/water"><Icon type="hdd" />用水管理</Link></li>
                    <li><Link  activeClassName="btn" to="/index/business"><Icon type="book" />营业管理</Link></li>
                    <li><Link  activeClassName="btn" to="/index/search"><Icon type="search" />数据查询</Link></li>
                    <li><Link  activeClassName="btn" to="/index/charge"><Icon type="line-chart" />营业报表</Link></li>
                    <li><Link  activeClassName="btn" to="/index/statement"><Icon type="file-text" />水表报表</Link></li>
                    <li><Link  activeClassName="btn" to="/index/system"><Icon type="setting" />系统设置</Link></li>
                </ul>
            </div>
        );
    }
}

export default leftnav;