/**
* 用户资料编辑
**/


import React from 'react';


export default class EditUser extends React.PureComponent {
    // 处理用户资料变更
    handleClick() {
        const reg = this._avatar.src.match(/^http:\/\/7xnpxz.com1.z0.glb.clouddn.com\/(\S+).png$/);
        const avatar = (reg && reg[1]);
        const signature = this._signature.value.replace(/(^\s*)|(\s*$)/g, '');
        this.props.updateUser({
            username: this.props.user.username,
            avatar,
            signature
        });
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
                      src={`http://7xnpxz.com1.z0.glb.clouddn.com/${user.avatar}.png`}
                      alt="头像"
                    />
                    <span>修改头像</span>
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
                <button onClick={() => {
                    this.props.closeModal();
                    this.props.clearWarning();
                }}
                >取消</button>
            </div>
        );
    }
}
