/**
 * 侧边栏搜索内容
 * @class SidebarSearch
 * @prop {string} menu 菜单显示方式
 * @prop {array} users 用户列表
 * @prop {array} groups 群组列表
 * @prop {string} keyword 搜索关键词
 * @prop {function} joinGroup 加入群组
 * @prop {function} privateChat 私聊
 * @prop {function} back 返回
 */


import React from 'react';


export default class SidebarSearch extends React.PureComponent {
    render() {
        const { users, groups, keyword, privateChat, joinGroup } = this.props;
        let resStyle = {};
        if (document.body.clientWidth <= 886) {
            resStyle = { display: this.props.menu ? 'flex' : 'none' };
        }

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
            <div className="sidebar-main" style={resStyle}>
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
