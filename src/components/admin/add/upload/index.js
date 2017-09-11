import React from 'react';
import './index.scss';
import { Button, Input , Select ,Modal , message, Icon , Upload} from 'antd';
import reqwest from 'reqwest';
class upload extends React.Component {
    constructor() {
        super();
        this.state = {
            Loading: false,
            visible: false,

            fileList: [],
            uploading: false,     
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

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach((file) => {
            console.log(file.type);
            formData.append('origFiles', file);/*这里的 name=》"origFiles" 必须和后台对应，否则会出现上传显示成功，其实没有上传成功*/
        });
        
        console.log('===FormData最终==');
        this.setState({
            uploading: true, 
        });
        reqwest({
            url: 'http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/uploadAccessies',
            contentType:'multipart/form-data',
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
                console.log(err);
                this.setState({
                    uploading: false,
                });
                message.error('上传失败！');
            },
        });
    }
    render() {

        // console.log(this.props.UploadInit);
        /*指定参数*/
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
                console.log(file);
                const isLt2M = file.size / 1024 / 1024 < 20;
                if (!isLt2M) {
                    message.error('上传文件大小不超过 20MB!');
                }else {
                    this.setState(({ fileList }) => ({
                        fileList: [...fileList, file],
                    }));

                    return false;
                }
                return isLt2M ;
            },
            fileList: this.state.fileList,
        };

        return (
            <div className='uploadOut'>
                 <Button onClick={this.showModal.bind(this)}>
                    <Icon type="upload" /> 上传
                </Button>
                <Modal
                    visible={this.state.visible}
                    title="上传附件"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width='600px' 
                    wrapClassName="Upload"
                    maskClosable={false}    
      
                >
                    <div className="form-col-ipt"> 
                        <div className="title">上传人员:</div>
                        <div className="ipt">
                            <Input size="large" placeholder="上传人员" />
                        </div>
                    </div> 
                    <div className="form-col-ipt">
                        <div className="title">附件说明:</div>
                        <div className="ipt">
                            <textarea  placeholder="附件说明" />
                        </div>
                    </div>
                    <div className="form-col-ipt">
                        <div className="title">附件上传:</div>
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
                     
                    
                    
                </Modal>
            </div>
        );
    }
}

export default upload;

{/*
      footer={[
                    <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.Loading} onClick={this.handleOk.bind(this)}>提交</Button>
                    ]}
*/}


{/*
    <Upload
                                className="avatar-uploader"
                                name= 'file'
                                action="http://127.0.0.1:8084/bzSystem-1.0/api/baseInfo/uploadAccessies"
                                showUploadList={{
                                    showPreviewIcon : true, showRemoveIcon: true 
                                }} 
                                data={(file) =>{ return file}}
                                fileList={this.state.fileList}
                                multiple={true}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange} 
                            >
                                 <div className='upload-out'>
                                     <div className='upload-out-in'>
                                        <Icon type="plus" />
                                        <div className="ant-upload-text">Upload</div>
                                     </div>
                                </div>
                            </Upload>
*/}

{
    /*

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


    */
}