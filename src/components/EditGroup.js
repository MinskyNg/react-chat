/**
 * 群组编辑
 * @function EditGroup
 * @prop {string} warning 提示
 * @prop {function} createGroup 创建群组
 * @prop {function} changeWarning 更新提示
 * @prop {function} closeModal 关闭模态框
 */


import React from 'react';


export default function EditGroup({ warning, createGroup, changeWarning, closeModal }) {
    let avatar;
    let file;
    let name;
    let signature;


    // 处理提交资料
    const handleSubmit = e => {
        e.preventDefault();
        createGroup({
            avatar: avatar.src,
            name: name.value.replace(/(^\s*)|(\s*$)/g, ''),
            signature: signature.value.replace(/(^\s*)|(\s*$)/g, '')
        });
    };


    // 处理图片上传
    const handleUpload = () => {
        if (file.files && file.files[0]) {
            const body = new FormData();
            body.append('smfile', file.files[0]);
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
                    avatar.src = data.data.url;
                } else {
                    changeWarning(data.msg);
                }
            })
            .catch(e => console.log('Oops, upload error', e));
        }
    };

    return (
        <div className="edit-group">
            <h2>创建群组</h2>
            <p className="warning">{warning}</p>
            <div>
                <img
                  ref={ img => avatar = img }
                  src="http://7xnpxz.com1.z0.glb.clouddn.com/groupdefault.png"
                  alt="头像"
                />
                <input type="file"
                  ref={ input => file = input }
                  onChange={handleUpload}
                />
            </div>
            <form action="#" onSubmit={handleSubmit}>
                <input
                  ref={ input => name = input }
                  type="text"
                  placeholder="请输入群组名"
                  maxLength="10"
                />
                <textarea
                  ref={ textarea => signature = textarea }
                  placeholder="请输入群组简介"
                  maxLength="30"
                ></textarea>
                <input type="submit" value="确认" />
                <input type="button" value="取消" onClick={closeModal} />
            </form>
        </div>
    );
}
