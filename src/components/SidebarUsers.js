/**
 * 侧边栏用户列表
 * @class SidebarUsers
 * @prop {array} users 用户列表
 * @prop {function} privateChat 私聊
 */


import React from 'react';


export default class SidebarUsers extends React.PureComponent {
    render() {
        const { users, privateChat } = this.props;

        // 生成用户列表
        let userItems = users.map(user => (
            <li key={user.username} onClick={() => privateChat(user.username)}>
                <div className="avatar">
                    <img
                      src={user.avatar}
                      alt="头像"
                    />
                </div>
                <div className="profile">
                    <h4>{user.username}</h4>
                    <p>{user.signature}</p>
                </div>
            </li>
        ));

        return (
            <ul>
                {userItems}
            </ul>
        );
    }
}
