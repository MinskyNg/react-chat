/**
* 侧边栏搜索内容
**/


import React from 'react';


export default class SidebarSearch extends React.PureComponent {
    render() {
        const { users, groups, keyword, privateChat, joinGroup } = this.props;

        // 生成用户列表
        let userItems = [];
        users.forEach(user => {
            if (user.username.indexOf(keyword) !== -1) {
                userItems.push(
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
            }
        });

        // 生成群组列表
        let groupItems = [];
        groups.forEach(group => {
            if (group.name.indexOf(keyword) !== -1) {
                groupItems.push(
                    <li key={group.name} onClick={() => joinGroup(group.name)}>
                        <div className="avatar">
                            <img
                              src={group.avatar}
                              alt="头像"
                            />
                        </div>
                        <div className="profile">
                            <h4>{group.name}</h4>
                            <p>{group.signature}</p>
                        </div>
                    </li>
                );
            }
        });


        return (
            <div className="sidebar-main">
                <div className="sidebar-content">
                    <button className="create-group" onClick={() => this.props.back()}>
                    返回</button>
                    {userItems}
                    {groupItems}
                </div>
            </div>
        );
    }
}
