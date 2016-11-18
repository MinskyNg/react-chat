/**
 * 侧边栏设置列表
 * @class SidebarSettings
 * @prop {object} settings 设置列表
 * @prop {function} toggleReceive 切换接收私聊
 * @prop {function} toggleSound 切换声音提示
 * @prop {function} toggleNotice 切换桌面提示
 * @prop {function} toggleScreen 切换全屏
 */


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
