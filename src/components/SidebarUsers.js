/**
 * 侧边栏用户列表
 * @function SidebarUsers
 * @prop {array} users 用户列表
 * @prop {function} privateChat 私聊
 */


import React from 'react';


export default function SidebarUsers({ users, privateChat }) {
    // 生成用户列表
    const userMap = user => (
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
    );

    return (
        <ul>
            {users.map(userMap)}
        </ul>
    );
}
