/**
 * 模态框
 * @class Model
 * @prop {object} user 用户资料
 * @prop {array} groups 群组列表
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


export default class Model extends React.PureComponent {
    render() {
        const modal = this.props.modal;
        return (
            <div className="modal" style={{ display: modal === 0 ? 'none' : 'block' }}>
                { modal === 1 ?
                    <EditProfile
                      user={this.props.user}
                      warning={this.props.warning}
                      updateProfile={newUser => this.props.updateProfile(newUser)}
                      changeWarning={newWarning => this.props.changeWarning(newWarning)}
                      closeModal={() => this.props.closeModal()}
                    />
                    :
                    <EditGroup
                      warning={this.props.warning}
                      createGroup={newGroup => this.props.createGroup(newGroup)}
                      changeWarning={newWarning => this.props.changeWarning(newWarning)}
                      closeModal={() => this.props.closeModal()}
                    />
                }
            </div>
        );
    }
}
