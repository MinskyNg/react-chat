/**
* 侧边栏导航
**/


import React from 'react';


export default class SidebarNav extends React.PureComponent {
    // 处理搜索框
    handleSearch(event) {
        if (event.keyCode === 13) {
            const keyword = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (keyword !== null && keyword !== '') {
                event.target.value = '';
                this.props.search(keyword);
            }
        }
    }


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
                          className="signout icon-signout"
                          title="退出登录"
                          onClick={() => this.props.signout()}
                        ></button>
                        <h3>{user.username}</h3>
                        <p>{user.signature}</p>
                    </div>
                </div>
                <div className="input-search">
                    <i className="icon-search"></i>
                    <input type="text" placeholder="Seach here" onKeyUp={e => this.handleSearch(e)} />
                </div>
            </div>
        );
    }
}
