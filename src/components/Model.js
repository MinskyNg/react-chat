/*
模态框
*/


import React from './react';


export default class Model extends React.PureComponent {
    render() {
        return (
            <div className="modal">
                <div className="edit-profile">
                    <h2>个人资料</h2>
                    <div><span>修改头像</span></div>
                    <p>昵称：Minsky</p>
                    <p>注册时间：2016-10-5 20:13</p>
                    <label htmlFor="signature">签名：</label>
                    <input type="text" id="signature" placeholder="请输入签名" maxLength="25"/>
                </div>
                <div className="edit-group">
                    <h2>创建群组</h2>
                    <div><span>上传头像</span></div>
                    <form action="#">
                        <input type="text" placeholder="请输入群组名" maxLength="10"/>
                        <textarea placeholder="请输入群组简介" maxLength="30"></textarea>
                        <input type="submit" value="确认" />
                        <input type="button" value="取消" />
                    </form>
                </div>
            </div>
        );
    }
}
