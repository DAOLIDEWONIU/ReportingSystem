import React from 'react';
import './index.scss';
import { Button, Input , Select ,Modal , Icon , Upload} from 'antd';
class upload extends React.Component {
    constructor() {
        super();
        this.state = {
            Loading: false,
            visible: false,
            previewVisible: false,
            previewImage: '',
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

    handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange = ({ fileList }) => this.setState({ fileList })
    render() {
        function handleChange(value) {
            console.log(`selected ${value}`);
        }   
        return (
            <div >
                 <Button onClick={this.showModal.bind(this)}>
                    <Icon type="upload" /> 上传
                </Button>
                <Modal
                    visible={this.state.visible}
                    title="上传附件"
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    width='428px' 
                    wrapClassName="Upload"
                    maskClosable={false}
                    footer={[
                    <Button key="back" size="large" onClick={this.handleCancel.bind(this)}>取消</Button>,
                    <Button key="submit" type="primary" size="large" loading={this.state.Loading} onClick={this.handleOk.bind(this)}>提交</Button>
                    ]}
                >
                    <div className="form-col-ipt">
                        <div className="title">附件名称:</div>
                        <div className="ipt">
                            <Input size="large" placeholder="附件名称" />
                        </div>
                    </div>
                    <div className="form-col-ipt">
                        <div className="title">上传人员:</div>
                        <div className="ipt">
                            <Input size="large" placeholder="上传人员" />
                        </div>
                    </div>
                    <div className="form-col-ipt">
                        <div className="title">附件说明:</div>
                        <div className="ipt">
                            <textarea  placeholder="附件说明"></textarea>        
                        </div>
                    </div>
                    <div className="form-col-ipt">
                        <div className="title">附件上传:</div>
                        <div className="ipt">
                             <Upload
                                className="avatar-uploader"
                                name= 'file'
                                action="//jsonplaceholder.typicode.com/posts/"
                                showUploadList={{
                                    showPreviewIcon : true, showRemoveIcon: true 
                                }} 
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
                        </div>    
                    </div>
                    
                    
                    
                </Modal>
            </div>
        );
    }
}

export default upload;