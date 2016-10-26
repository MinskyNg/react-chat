/**
* 群组资料编辑
**/


import React from 'react';


export default class EditGroup extends React.PureComponent {
    // 处理提交资料
    handleSubmit(event) {
        event.preventDefault();
        const reg = this._avatar.src.match(/^http:\/\/7xnpxz.com1.z0.glb.clouddn.com\/(\S+).png$/);
        const avatar = (reg && reg[1]);
        const name = this._name.value.replace(/(^\s*)|(\s*$)/g, '');
        const signature = this._signature.value.replace(/(^\s*)|(\s*$)/g, '');
        this.props.createGroup({
            name,
            avatar,
            signature
        });
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
                    <span>上传头像</span>
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
                    <input type="button" value="取消" onClick={() => {
                        this.props.closeModal();
                        this.props.clearWarning();
                    }}
                    />
                </form>
            </div>
        );
    }
}
