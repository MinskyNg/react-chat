/**
* 侧边栏设置列表
**/


import React from 'react';


export default class SidebarSettings extends React.PureComponent {
    render() {
        const settings = this.props.settings;
        return (
            <ul>
                <li className="checkbox">
                    <h4>接收私聊</h4>
                    <div>
                        <input type="checkbox" id="toggleReceive"
                          checked={settings.receive}
                          onChange={() => this.props.toggleReceive()}
                        />
                        <label htmlFor="toggleReceive"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>声音提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleSound"
                          checked={settings.sound}
                          onChange={() => this.props.toggleSound()}
                        />
                        <label htmlFor="toggleSound"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>桌面提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleNotice"
                          checked={settings.notice}
                          onChange={() => this.props.toggleNotice()}
                        />
                        <label htmlFor="toggleNotice"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>切换全屏</h4>
                    <div>
                        <input type="checkbox" id="toggleScreen"
                          checked={settings.screen}
                          onChange={() => this.props.toggleScreen()}
                        />
                        <label htmlFor="toggleScreen"></label>
                    </div>
                </li>
            </ul>
        );
    }
}
