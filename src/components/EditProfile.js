/**
* 用户资料编辑
**/


import React from 'react';
import fetch from 'isomorphic-fetch';


export default class EditProfile extends React.PureComponent {
    // 处理用户资料变更
    handleClick() {
        const signature = this._signature.value.replace(/(^\s*)|(\s*$)/g, '');
        this.props.updateProfile({
            username: this.props.user.username,
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
        const user = this.props.user;
        return (
            <div className="edit-user">
                <h2>个人资料</h2>
                <p className="warning">{this.props.warning}</p>
                <div>
                    <img
                      ref={ img => this._avatar = img }
                      src={user.avatar}
                      alt="头像"
                    />
                    <input type="file" accept="image/*"
                      ref={ input => this._fileInput = input }
                      onChange={() => this.handleUpload()}
                    />
                </div>
                <p>{`昵称：${user.username}`}</p>
                <p>{`注册时间：${user.date}`}</p>
                <label htmlFor="signature">签名：</label>
                <input
                  ref={ input => this._signature = input }
                  type="text"
                  id="signature"
                  placeholder="请输入签名"
                  maxLength="25"
                  defaultValue={user.signature}
                />
                <button onClick={() => this.handleClick()}>确认</button>
                <button onClick={() => this.props.closeModal()}>取消</button>
            </div>
        );
    }
}
