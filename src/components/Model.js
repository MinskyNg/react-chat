/**
 * 模态框
 * @function Model
 * @prop {object} user 用户资料
 * @prop {string} warning 提示
 * @prop {number} modal 显示模态框类型
 * @prop {function} updateProfile 更新个人资料
 * @prop {function} createGroup 创建群组
 * @prop {function} changeWarning 更新提示
 * @prop {function} closeModel 关闭模态框
 */


import React from 'react';
import EditProfile from './EditProfile';
import EditGroup from './EditGroup';


export default function Model({ user, warning, modal, updateProfile,
  createGroup, changeWarning, closeModal }) {
    return (
        <div className="modal" style={{ display: modal === 0 ? 'none' : 'block' }}>
            { modal === 1 ?
                <EditProfile
                  user={user}
                  warning={warning}
                  updateProfile={updateProfile}
                  changeWarning={changeWarning}
                  closeModal={closeModal}
                />
                :
                <EditGroup
                  warning={warning}
                  createGroup={createGroup}
                  changeWarning={changeWarning}
                  closeModal={closeModal}
                />
            }
        </div>
    );
}
