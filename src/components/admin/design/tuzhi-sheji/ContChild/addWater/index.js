import React from 'react';
import './index.scss';
import { Button, Input , Select ,Modal } from 'antd';
class addWater extends React.Component {
    constructor() {
        super();
        this.state = {
            Loading: false,
            visible: false,
            waterData:[],
            waterType:null,
            waterModel:null,
        }
    }
    showModal() {
        this.setState({
            visible: true,
        });
    }
    handleOk() {
        this.setState({ Loading: true });
        setTimeout(() => {
            this.setState({ Loading: false, visible: false });
        }, 3000);
    }
    handleCancel() {
        this.setState({ visible: false }); 
    }

    waterTypeChange(value) {
        this.setState({
            waterType : value
        })
    }
    waterModelChange(value) {
        this.setState({
            waterModel : value
        })
    }

    render() {
        function handleChange(value) {
            console.log(`selected ${value}`);
        }   
        return (
            <div className='addwaternum'  onClick={this.showModal.bind(this)}>
                添加水表
                <Modal
                    visible={this.state.visible}
                    title="添加水表"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width='500px'
                    wrapClassName="addWater"
                    maskClosable={false}
                    footer={[
                    <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.Loading} onClick={this.handleOk.bind(this)}>提交</Button>
                    ]}
                >
                    <div className="form-col-ipt">
                        <div className="title">
                            水表型号:
                        </div>
                        <div className="ipt">
                            <Select defaultValue="all" style={{ width: 200 ,height : 40}} onChange={this.waterTypeChange.bind(this)}>
                                <Select.Option value="all">无上级</Select.Option>
                                <Select.Option value="jack">西充</Select.Option>
                                <Select.Option value="lucy">管理员</Select.Option>
                            </Select>
                        </div>
                    </div>
                     <div className="form-col-ipt">
                        <div className="title">
                            水表类型:
                        </div>
                        <div className="ipt">
                            <Select defaultValue="all" style={{ width: 200 }} onChange={this.waterModelChange.bind(this)}>
                                <Select.Option value="all">无上级</Select.Option>
                                <Select.Option value="jack">西充</Select.Option>
                                <Select.Option value="lucy">管理员</Select.Option>
                            </Select>
                        </div>
                    </div>
                    <div className="form-col-ipt">
                        <div className="title">
                            水表数量:
                        </div>
                        <div className="ipt">
                            <input type="number" placeholder="水表数量" ref="waterNum"/>
                        </div>
                    </div>
                    <div className="form-col-ipt" style={{margin:'12px 0'}}>
                        <button className='addBtn' >新增</button>
                    </div>
                    <div className='WaterList'>
                        <table>
                            <thead>
                                <tr>
                                    <th>型号</th>
                                    <th>类型</th>
                                    <th>数量</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>型号1</td>
                                    <td>型号1</td>
                                    <td>1</td>
                                    <td className='remove'><button>删除</button></td>
                                </tr>
                                <tr>
                                    <td>型号1</td>
                                    <td>型号1</td>
                                    <td>1</td>
                                    <td className='remove'><button>删除</button></td>
                                </tr>
                                <tr>
                                    <td>型号1</td>
                                    <td>型号1</td>
                                    <td>1</td>
                                    <td className='remove'><button>删除</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </Modal>
            </div>
        );
    }
}

export default addWater;