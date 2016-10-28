/**
* 侧边栏导航
**/


import React from 'react';


export default class SidebarNav extends React.PureComponent {
    render() {
        const user = this.props.user;
        return (
            <div className="sidebar-nav">
                <div className="sidebar-profile">
                    <button
                      className="avatar"
                      title="个人资料"
                      onClick={() => this.props.showEditUser()}
                    >
                        <img
                          src={user.avatar}
                          alt="头像"
                        />
                    </button>
                    <div className="profile">
                        <button
                          className="signout"
                          title="退出登录"
                          onClick={() => this.props.signout()}
                        ></button>
                        <h3>{user.username}</h3>
                        <p>{user.signature}</p>
                    </div>
                </div>
                <div className="sidebar-search">
                    <i className="icon-search"></i>
                    <input type="text" placeholder="Seach here" />
                </div>
            </div>
        );
    }
}
