/**
 * 资料编辑
 * @function EditProfile
 * @prop {object} user 用户资料
 * @prop {string} warning 提示
 * @prop {function} updateProfile 更新资料
 * @prop {function} changeWarning 更新提示
 * @prop {function} closeModal 关闭模态框
 */


import React from 'react';
import fetch from 'isomorphic-fetch';


export default function EditProfile({ user, warning, updateProfile, changeWarning, closeModal }) {
    let avatar;
    let file;
    let signature;


    // 处理用户资料变更
    const handleClick = () => {
        updateProfile({
            username: user.username,
            avatar: avatar.src,
            signature: signature.value.replace(/(^\s*)|(\s*$)/g, '')
        });
    };


    // 处理图片上传
    const handleUpload = () => {
        if (file.files && file.files[0]) {
            const body = new FormData();
            body.append('smfile', file.files[0]);
            fetch('https://sm.ms/api/upload', {
                method: 'post',
                headers: {
                    Accept: '*/*',
                },
                body
            })
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    avatar.src = data.data.url;
                } else {
                    changeWarning(data.msg);
                }
            })
            .catch(e => console.log('Oops, upload error', e));
        }
    };

    return (
        <div className="edit-user">
            <h2>个人资料</h2>
            <p className="warning">{warning}</p>
            <div>
                <img
                  ref={ img => avatar = img }
                  src={user.avatar}
                  alt="头像"
                />
                <input
                  type="file"
                  ref={ input => file = input }
                  onChange={handleUpload}
                />
            </div>
            <p>{`昵称：${user.username}`}</p>
            <p>{`注册时间：${user.date}`}</p>
            <label htmlFor="signature">签名：</label>
            <input
              ref={ input => signature = input }
              type="text"
              id="signature"
              placeholder="请输入签名"
              maxLength="25"
              defaultValue={user.signature}
            />
            <button onClick={handleClick}>确认</button>
            <button onClick={closeModal}>取消</button>
        </div>
    );
}
