/*
侧边栏主体
*/


import React from 'react';
import SidebarSets from './SidebarSets';
import SidebarUsers from './SidebarUsers';
import SidebarGroups from './SidebarGroups';


export default class SidebarMain extends React.PureComponent {
    render() {
        return (
            <div className="sidebar-main">
                <div className="sidebar-menu">
                    <a href="">用户</a>
                    <a href="">群组</a>
                    <a href="">设置</a>
                </div>
                <div className="sidebar-content">

                </div>
            </div>
        );
    }
}
