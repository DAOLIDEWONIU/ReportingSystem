'use strict';
import React from 'react';
import Link from 'react-router/lib/Link';
import {browserHistory} from 'react-router';
import { Pagination , Icon , Radio  , notification , Button , Modal } from 'antd';
import './index.scss';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import Upload from './upload';
class auditContGongChengChild extends React.Component {
    constructor() {
        super();
        this.state = {
            auditId : false ,
        }
    }
    onclicktoback() {
        browserHistory.go(-1);
    } 
    openNotificationWithIcon (type) {
        notification[type]({
            message: '输入框不能为空',
            description: '请输入用户水表号，这里不能为空！',
        });
    }
    render() {
        function onChange(e) {
            console.log(`radio checked:${e.target.value}`);
        }
        const auditId = this.state.auditId ? <div className='auditId-com auditId-true' /> : <div className='auditId-com auditId-false' /> ;
        return (
            <div className='taskInfo'>
                <div className='taskInfo-in'>
                    <div className='backicon' onClick={this.onclicktoback.bind(this)}>
                        <span className="icon-f">
                            <Icon type="arrow-left" />
                        </span>
                    </div>
                    <h3 className='toptitle'>
                        工程变更 {this.props.params.id}
                        <div className='auditId'>{ auditId }</div>
                    </h3>
                    <div className='mes'>
                        <div className='mes-group'>
                            <h3>项目信息<i className='iconfont icon-project' /></h3>
                            <div className='mes-group-cont'>
                                <div className='mes-across'>
                                    <span className='name'>项目名称：</span>
                                <span className='mes-info' style={{fontWeight:'600'}}>
                                   工程变更
                                </span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>受理号码：</span>
                                    <span className='mes-info'>00000001</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>设计号码：</span>
                                    <span className='mes-info'>20170203</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>用水类型：</span>
                                    <span className='mes-info'>一户一表</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>完成时间：</span>
                                    <span className='mes-info'>2017-07-06</span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>前次完成时间：</span>
                                    <span className='mes-info'>2017-06-03</span>
                                </div>
                            </div>
                        </div>

                        <div className='mes-group'>
                            <h3>变更信息<i className='iconfont icon-other' /></h3>
                            <div className='mes-group-cont'>
                                <div className='mes-across'>
                                    <span className='name'>工程说明：</span>
                                    <span className='mes-info'>
                                        <textarea placeholder='请输入工程说明' />
                                    </span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name'>未通过原因：</span>
                                    <span className='mes-info'>
                                        <textarea placeholder='请输入未通过原因' />
                                    </span>
                                </div>
                                <div className='mes-across'>
                                    <span className='name' style={{verticalAlign:'0'}}>添加附件：</span>
                                    <span className='mes-info upload'>
                                        <Upload />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='bottomHandle'>
                            <div className='bottomHandle-in'>
                                <div className='Radio'>
                                    <span className='Radio-title'>处理意见：</span>
                                    <RadioGroup onChange={onChange} defaultValue="a" size='large'>
                                        <RadioButton value="a">设计完成</RadioButton>
                                        <RadioButton value="b">终止工程</RadioButton>
                                    </RadioGroup>
                                </div>
                                <div className='btn'>
                                    <button>提交</button>
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
export default auditContGongChengChild;