/*
侧边栏用户列表
*/


import React from 'react';


export default class SidebarUsers extends React.PureComponent {
    render() {
        const { users, privateChat } = this.props;
        return (
            <ul>
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
