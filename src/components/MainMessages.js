/*
聊天室消息
*/


import React from 'react';


export default class MainMessages extends React.PureComponent {
    render() {
        return (
            <div className="main-messages">
                <div className="message-container">
                    <div className="message-sender">
                    </div>
                    <div className="message-content message-other">
                        <span>Minsky 20:13</span>
                        <div>我</div>
                    </div>
                </div>
                <div className="message-system"><span>用户 Minsky 已下线</span></div>
                <div className="message-container message-self">
                    <div className="message-sender">
                    </div>
                    <div className="message-content">
                        <span>Minsky 20:14</span>
                        <div>我能吞下玻璃而不伤身体我能吞下玻璃而不伤身体我能吞我能吞下玻</div>
                    </div>
                </div>
            </div>
        );
    }
}
