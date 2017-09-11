/**
 * Created by Administrator on 2017-02-14.
 */
'use strict';
/**解决移动端300毫秒延迟*/
import FastClick from 'fastclick';
FastClick.attach(document.body);
import React from 'react';
import {render} from 'react-dom';
import {Redirect , Router, Route, IndexRoute, browserHistory} from 'react-router';
import LoginContainer from './components/login';
import Layout from './components/Layout';
import './common/css/common.scss';
import {connect} from 'react-redux';
import * as mAction from './actions/m';
import NoMatch from './common/components/common/NoMatch';
import { notification  } from 'antd';
/**
 * 按需加载*
 * es5 写法 require 后面不用加‘.default’
 * es6 写法 require 后面加‘.default’
 * 不然就加载不了
 * */
/*父路由*/
const addCont = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/add').default)
    },'addCont')
};
const designCont = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design').default)
    },'designCont')
};
const auditCont = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/audit').default)
    },'auditCont')
};
const workCont = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/work').default)
    },'workCont')
};
/*
 * 设置
 */
const settingCont = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/setting').default)
    },'settingCont')
};
/*
 设计
 */
/*1、业务勘测*/
const yewukance = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/yewu-kance').default)
    },'yewukance')
};
const yewukanceChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/yewu-kance/ContChild').default)
    },'yewukanceChild')
};
/*2.图纸设计*/
const tuzhisheji = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/tuzhi-sheji').default)
    },'tuzhisheji')
};
const tuzhishejiChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/tuzhi-sheji/ContChild').default)
    },'tuzhishejiChild')
};
/*3.设计稿校对*/
const shejigaoxiaodui = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/shejigao-xiaodui').default)
    },'shejigaoxiaodui')
};
const shejigaoxiaoduiChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/shejigao-xiaodui/ContChild').default)
    },'shejigaoxiaoduiChild')
};



/*图纸变更*/
const gongchengbiangeng = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/gongcheng-biangeng').default)
    },'gongchengbiangeng')
};
const gongchengbiangengChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/gongcheng-biangeng/ContChild').default)
    },'gongchengbiangengChild')
};
/*设计调配*/
const shejidiaopei = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/sheji-diaopei').default)
    },'shejidiaopei')
};
const shejidiaopeiChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/design/sheji-diaopei/ContChild').default)
    },'shejidiaopeiChild')
};
/*
 * 审核
 * */
/*设计审核*/
const gongchengshejish = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/audit/gongchengsheji-sh').default)
    },'gongchengshejish')
};
const gongchengshejishChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/audit/gongchengsheji-sh/ContChild').default)
    },'gongchengshejishChild')
};
/*设计审定*/
const gongchengshejisd = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/audit/gongchengsheji-sd').default)
    },'gongchengshejisd')
};
const gongchengshejisdChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/audit/gongchengsheji-sd/ContChild').default)
    },'gongchengshejisdChild')
};






/*
 * 施工
 * */

/*工程缴费*/
const gongchengjiaofei = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/work/gongcheng-jiaofei').default)
    },'gongchengjiaofei')
};
const gongchengjiaofeiChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/work/gongcheng-jiaofei/ContChild').default)
    },'gongchengjiaofeiChild')
};

/*工程缴费*/
const gongchengjiaofeiQR = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/work/gongcheng-jiaofeiQR').default)
    },'gongchengjiaofeiQR')
};
const gongchengjiaofeiQRChild = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/admin/work/gongcheng-jiaofeiQR/ContChild').default)
    },'gongchengjiaofeiQRChild')
};





class AppContainer extends React.Component {
    constructor() {
        super();
        this.nowIsLoadingActionCreator = this.nowIsLoadingActionCreator.bind(this);
        this.nowIsStopLoadingActionCreator = this.nowIsStopLoadingActionCreator.bind(this);
        this.AddAuth = this.AddAuth.bind(this);
        this.SettingAuth = this.SettingAuth.bind(this);
        this.designAuth = this.designAuth.bind(this);
    }
    nowIsLoadingActionCreator() {
        this.props.dispatch(mAction.nowIsLoadingActionCreator());
    }
    nowIsStopLoadingActionCreator() {
        this.props.dispatch(mAction.nowIsStopLoadingActionCreator());
    }
     openNotificationWithIcon(type)  {
        notification[type]({
            message: '无此权限！',
            description: '你没有访问该链接的权限，如有需要请联系系统管理员！'
        });
    };

    //权限控制的中间服务
     AddAuth(nextState, replace, next) {
        //获取传输过来的数据
        let response = JSON.parse(sessionStorage.getItem('res'));
        if(response == null){
            browserHistory.push('/login');
            return false;
        }else{
            if (response.loginRight[0] == 1) {
                next();
            } else {
                this.openNotificationWithIcon('warning');
                replace('/404');
                next();
            }
        }

        
    }
    designAuth(nextState, replace, next) {
        //获取传输过来的数据
        let response = JSON.parse(sessionStorage.getItem('res'));
        if(response == null){
             browserHistory.push('/login');
            return false;
        }else{
            if (response.loginRight[1] == 1 || response.loginRight[5] == 1) {
                next();
            } else {
                this.openNotificationWithIcon('warning');
                replace('/404');
                next();
            }
        }
        
    }
     SettingAuth(nextState, replace, next) {
        let response = JSON.parse(sessionStorage.getItem('res'));
    
        if(response == null){
             browserHistory.push('/login');
            return false;
        }else{
             //获取传输过来的数据
            if (response.loginRight[6] == 1 ) {
                next();
            } else {
                this.openNotificationWithIcon('warning');
                replace('/404');
                next();
            }
        }
       
    }


    render() {
        /*
        权限控制可以依据这个，动态控制路由配置，渲染不同的路由，没有路由时，跳转到404页面
        */ 
        return (
            <Router history={browserHistory} >
                <Route path="login" component={LoginContainer} />
                <Route path="/" component={Layout}>
                    <Route path='add' getComponent={addCont} onEnter={this.AddAuth}/>
                    <Route path='design' getComponent={designCont} onEnter={this.designAuth}>
                        <Route path='yewu-kance' getComponent={yewukance} />
                        <Route path='yewu-kance/:id' getComponent={yewukanceChild} />
                        <Route path='tuzhi-sheji' getComponent={tuzhisheji} />
                        <Route path='tuzhi-sheji/:id' getComponent={tuzhishejiChild} />
                        <Route path='shejigao-xiaodui' getComponent={shejigaoxiaodui} />
                        <Route path='shejigao-xiaodui/:id' getComponent={shejigaoxiaoduiChild} />
                        <Route path='gongcheng-biangeng' getComponent={gongchengbiangeng} />
                        <Route path='gongcheng-biangeng/:id' getComponent={gongchengbiangengChild} />
                        <Route path='sheji-diaopei' getComponent={shejidiaopei} />
                        <Route path='sheji-diaopei/:id' getComponent={shejidiaopeiChild} />
                    </Route>
                    <Route path='audit' getComponent={auditCont} >
                        <Route path='gongchengsheji-sh' getComponent={gongchengshejish} />
                        <Route path='gongchengsheji-sh/:id' getComponent={gongchengshejishChild} />
                        <Route path='gongchengsheji-sd' getComponent={gongchengshejisd} />
                        <Route path='gongchengsheji-sd/:id' getComponent={gongchengshejisdChild} />
                    </Route>
                    <Route path='work' getComponent={workCont} >
                        <Route path='gongcheng-jiaofei' getComponent={gongchengjiaofei} />
                        <Route path='gongcheng-jiaofei/:id' getComponent={gongchengjiaofeiChild} />
                        <Route path='gongcheng-jiaofeiQR' getComponent={gongchengjiaofeiQR} />
                        <Route path='gongcheng-jiaofeiQR/:id' getComponent={gongchengjiaofeiQRChild} />
                        
                    </Route>
                    <Route path='setting' getComponent={settingCont} onEnter={this.SettingAuth}/>

                    <Route path='404' component={NoMatch} />
                    {/* 其他重定向到 404 */}
                    <Redirect from='*' to='404' /> 
                </Route>
            </Router>
        )  
    }  
}
export default connect(state => ({
    isloading: state.mReducer.isloading,
    res:state.loginReducer.res
}))(AppContainer);

//

{/*

 <Route path='add' getComponent={addCont} />
 <Route path='design' getComponent={designCont} >

 </Route>
 <Route path='audit' getComponent={auditCont} >

 </Route>
 <Route path='work' getComponent={workCont} >

 </Route>
*/}
{/*
                    {
                        routerdatafather.map((ele,i)=>{
                            return <Route key={"index"+i} path={ele.path} getComponent={ ele.component }>
                                        <Route path={ele.child.path} getComponent={ ele.child.component }/>
                                   </Route>
                        })
                    }
*/}
//     function openNotificationWithIcon(type) {
//         notification[type]({
//             message: '无此权限！',
//             description: '你没有访问该链接的权限，如有需要请联系系统管理员！'
//         });
//     };
//
//     let res = JSON.parse(sessionStorage.getItem('res'));
//     // console.log(res);
//     //权限控制的中间服务
//
//     function SettingAuth(nextState, replace, next) {
//         console.log(nextState.location.pathname)
//         //获取传输过来的数据
//         if (res.loginRight[6] == 1) {
//             next();
//         } else {
//             openNotificationWithIcon('warning');
//             replace('/404');
//             next();
//         }
//     }
//        function AddAuth(nextState, replace, next) {
//            console.log(nextState)
//         //获取传输过来的数据
//          if(res.loginRight[0] == 1){
//                 next();
//             }else{
//                 openNotificationWithIcon('warning');
//                 replace('/404');
//                 next();
//             }
//     }
// export default (
//     <div>
//         <Route path="login" component={LoginContainer} />
//         <Route path="/" component={Layout}>
//             <Route path='add' getComponent={addCont} onEnter={AddAuth}/>
//
//             <Route path='design' getComponent={designCont} >
//                 <Route path='yewu-kance' getComponent={yewukance} />
//                 <Route path='yewu-kance/:id' getComponent={yewukanceChild} />
//                 <Route path='tuzhi-sheji' getComponent={tuzhisheji} />
//                 <Route path='tuzhi-sheji/:id' getComponent={tuzhishejiChild} />
//             </Route>
//             <Route path='audit' getComponent={auditCont} >
//
//             </Route>
//             <Route path='work' getComponent={workCont} >
//                 <Route path=':id' getComponent={workContChild} />
//             </Route>
//             <Route path='setting' getComponent={settingCont} onEnter={SettingAuth}/>
//
//             <Route path='404' component={NoMatch} />
//             {/* 其他重定向到 404 */}
//             <Redirect from='*' to='404' />
//         </Route>
//     </div>
// )