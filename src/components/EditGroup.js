/**
* 群组资料编辑
**/


import React from 'react';


export default class EditGroup extends React.PureComponent {
    // 处理提交资料
    handleSubmit(event) {
        event.preventDefault();
        const name = this._name.value.replace(/(^\s*)|(\s*$)/g, '');
        const signature = this._signature.value.replace(/(^\s*)|(\s*$)/g, '');
        this.props.createGroup({
            name,
            avatar: this._avatar.src,
            signature
        });
    }


    // 处理图片上传
    handleUpload() {
        const fileInput = this._fileInput;
        if (fileInput.files && fileInput.files[0]) {
            const body = new FormData();
            body.append('smfile', fileInput.files[0]);
            fetch(' https://sm.ms/api/upload', {
                method: 'post',
                headers: {
                    Accept: '*/*',
                },
                body
            })
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    this._avatar.src = data.data.url;
                } else {
                    this.props.changeWarning(data.msg);
                }
            })
            .catch(e => console.log('Oops, upload error', e));
        }
    }


    render() {
        return (
            <div className="edit-group">
                <h2>创建群组</h2>
                <p className="warning">{this.props.warning}</p>
                <div>
                    <img
                      ref={ img => this._avatar = img }
                      src="http://7xnpxz.com1.z0.glb.clouddn.com/groupdefault.png"
                      alt="头像"
                    />
                    <input type="file" accept="image/*"
                      ref={ input => this._fileInput = input }
                      onChange={() => this.handleUpload()}
                    />
                </div>
                <form action="#" onSubmit={ e => this.handleSubmit(e) }>
                    <input
                      ref={ input => this._name = input }
                      type="text"
                      placeholder="请输入群组名"
                      maxLength="10"
                    />
                    <textarea
                      ref={ textarea => this._signature = textarea }
                      placeholder="请输入群组简介"
                      maxLength="30"
                    ></textarea>
                    <input type="submit" value="确认" />
                    <input type="button" value="取消" onClick={() => this.props.closeModal()} />
                </form>
            </div>
        );
    }
}
