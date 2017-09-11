
'use strict';
import React from 'react';
import {connect} from 'react-redux';
import { Icon , message, Input , Button , Upload , Radio} from 'antd';
import './index.scss';
import reqwest from 'reqwest';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class FileUpload extends React.Component {
    constructor() {
        super();
        this.state={
            fileList: [],
            uploading: false,
            FileUploadinit : false,
        };
    }
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        let newFile = [];
        fileList.forEach((file) => {
            newFile.push({
                name:file.name,
            })                                         

            console.log('发送请求前file==',file);
            console.log('发送请求前',newFile);

            formData.append('origFiles', file);/*这里的 name=》"origFiles" 必须和后台对应，否则会出现上传显示成功，其实没有上传成功*/
            formData.append('projId',this.props.result);
            formData.append('destPath',this.props.result);

        });                          
        this.setState({
            uploading: true,
        });
        reqwest({
            url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/uploadAccessies',
            contentType:'multipart/form-data;charset=UTF-8',
            method: 'post',
            processData: false,
            data: formData,
            success: (data) => {
                console.log('===下面是返回来的数据===');
                console.log(data);
                this.setState({
                    uploading: false,
                });
                message.success('上传成功！');
            },
            error: (err) => {
                this.setState({
                    uploading: false,
                });
                message.error('上传失败！');
            },
        });
    };

    ChooseChange(e) {
        console.log(`radio checked:${e.target.value}`);
        console.log(e.target.value == '1');
        if(e.target.value == '1') {
            this.setState({
                FileUploadinit : true
            })
        }else {
            this.setState({
                FileUploadinit : false
            })
        }
    }

    render() {
        const { uploading } = this.state;
        const props = {
            action: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/uploadAccessies',
            multiple:true,
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                console.log(file.name);
                const isLt2M = file.size / 1024 / 1024 < 20;
                console.log(isLt2M)
                //encodeURI


                if (!isLt2M) {
                    message.error('上传文件大小不超过 20MB!');
                }else {
                    this.setState(({ fileList }) => {
                        return {
                            fileList: [...fileList, file],
                        }

                    });

                    return false;
                }
                return isLt2M ;
            },
            fileList: this.state.fileList,
        };
        console.log('上传列表为===',this.state.fileList)
        let isFile = this.state.FileUploadinit === true ? 'block' : 'none';
        return (
            <div className="choose">
                <span className="com title" style={{display:'none'}}>是否为该业务上传附件？</span>
                <span className='com' style={{display:'none'}}>
                    <RadioGroup onChange={this.ChooseChange.bind(this)} defaultValue="2">
                        <RadioButton value="1">是</RadioButton>
                        <RadioButton value="2">否</RadioButton>
                    </RadioGroup>
                </span>
                <div>
                    <div className='uploadOutOther'>
                        <div className="form-col-ipt" style={{display:'none'}}>
                            <div className="title">上传人员:</div>
                            <div className="ipt">
                                <Input size="large" placeholder="上传人员" />
                            </div>
                        </div>
                        <div className="form-col-ipt" style={{display:'none'}}>
                            <div className="title">附件说明:</div>
                            <div className="ipt">
                                <textarea  placeholder="附件说明" />
                            </div>
                        </div>
                        <div className="form-col-ipt">        
                            <div className="ipt">
                                <div>
                                    <Upload {...props}>
                                        <Button>
                                            <Icon type="upload" /> 添加文件
                                        </Button>
                                    </Upload>
                                    <Button
                                        className="upload-demo-start"
                                        type="primary"
                                        onClick={this.handleUpload}
                                        disabled={this.state.fileList.length === 0}
                                        loading={uploading}
                                        style={{margin:'12px 0'}}
                                    >
                                        {uploading ? '上传中' : '开始上传' }
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default FileUpload;