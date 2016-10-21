/*
侧边栏导航
*/


import React from 'react';


export default class SidebarNav extends React.PureComponent {
    render() {
        return (
            <div className="sidebar-nav">
                <div className="sidebar-profile">
                    <button className="avatar" title="个人资料">
                        // <img src="" alt="头像" />
                    </button>
                    <div className="profile">
                        <button className="signout" title="退出登录"></button>
                        <h3>Minsky</h3>
                        <p>
                            我能吞下玻璃而不伤身体我能吞下玻璃而不伤身体我能吞
                        </p>
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
