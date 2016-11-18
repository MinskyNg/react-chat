/**
 * 侧边栏导航
 * @class SidebarNav
 * @prop {string} menu 菜单显示方式
 * @prop {function} toggleMenu 切换菜单
 * @prop {object} user 用户资料
 * @prop {function} signout 登出
 * @prop {function} showEditUser 展现资料编辑框
 * @prop {function} search 搜索
 */


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
                        <h3>{user.username}</h3>
                        <p>{user.signature}</p>
                    </div>
                    <div className="button-wrapper">
                        <button
                          className="icon-signout"
                          title="退出登录"
                          onClick={() => this.props.signout()}
                        ></button>
                        <button
                          className="icon-menu"
                          onClick={() => this.props.toggleMenu(!this.props.menu)}
                        ></button>
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
