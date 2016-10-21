/*
侧边栏
*/


import React from 'react';
import SidebarNav from './SidebarNav';
import SidebarMain from './SidebarMain';


export default class Sidebar extends React.PureComponent {
    render() {
        return (
            <aside className="sidebar">
                <SidebarNav />
                <SidebarMain />
            </aside>

        );
    }
}
