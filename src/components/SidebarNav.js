/**
 * 侧边栏导航
 * @funtion SidebarNav
 * @prop {string} menu 菜单显示方式
 * @prop {function} toggleMenu 切换菜单
 * @prop {object} user 用户资料
 * @prop {function} signout 登出
 * @prop {function} showEditUser 展现资料编辑框
 * @prop {function} search 搜索
 */


import React from 'react';


export default function SidebarNav({ menu, toggleMenu, user, signout, showEditUser, search }) {
    // 处理搜索框
    const handleSearch = (e) => {
        if (e.keyCode === 13) {
            const keyword = e.target.value.replace(/(^\s*)|(\s*$)/g, '');
            if (keyword !== null && keyword !== '') {
                e.target.value = '';
                search(keyword);
            }
        }
    };

    return (
        <div className="sidebar-nav">
            <div className="sidebar-profile">
                <button
                  className="avatar"
                  title="个人资料"
                  onClick={showEditUser}
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
                      onClick={signout}
                    ></button>
                    <button
                      className="icon-menu"
                      onClick={() => toggleMenu(!menu)}
                    ></button>
                </div>
            </div>
            <div className="input-search">
                <i className="icon-search"></i>
                <input type="text"
                  placeholder="Seach here"
                  onKeyUp={handleSearch}
                />
            </div>
        </div>
    );
}
