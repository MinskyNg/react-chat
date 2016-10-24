/*
侧边栏群组列表
*/


import React from 'react';


export default class SidebarGroups extends React.PureComponent {
    render() {
        const { groups, joinGroup } = this.props.joinGroup();

        return (
            <ul>
                <button className="create-group" onClick={() => this.props.showEditGroup()}>
                    创建群组
                </button>
                <li>
                    <div className="avatar">
                    </div>
                    <div className="profile">
                        <h4>HAHA</h4>
                        <p>我能吞下玻璃而不伤身体我能吞下玻璃而不伤身体我能吞</p>
                    </div>
                </li>
                <li>
                    <div className="avatar">
                    </div>
                    <div className="profile">
                        <h4>HAHA</h4>
                        <p>我能吞下玻璃而不伤身体我能吞下玻璃而不伤身体我能吞</p>
                    </div>
                </li>
                <li>
                    <div className="avatar">
                    </div>
                    <div className="profile">
                        <h4>HAHA</h4>
                        <p>我能吞下玻璃而不伤身体我能吞下玻璃而不伤身体我能吞</p>
                    </div>
                </li>
            </ul>
        );
    }
}
