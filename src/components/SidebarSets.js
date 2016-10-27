/**
* 侧边栏设置列表
**/


import React from 'react';


export default class SidebarSets extends React.PureComponent {
    render() {
        const sets = this.props.sets;
        return (
            <ul>
                <li className="checkbox">
                    <h4>接收私聊</h4>
                    <div>
                        <input type="checkbox" id="toggleReceive"
                          checked={sets.receive}
                          onChange={() => this.props.toggleReceive()}
                        />
                        <label htmlFor="toggleReceive"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>声音提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleSound"
                          checked={sets.sound}
                          onChange={() => this.props.toggleSound()}
                        />
                        <label htmlFor="toggleSound"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>桌面提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleNotice"
                          checked={sets.notice}
                          onChange={() => this.props.toggleNotice()}
                        />
                        <label htmlFor="toggleNotice"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>切换全屏</h4>
                    <div>
                        <input type="checkbox" id="toggleScreen"
                          checked={sets.screen}
                          onChange={() => this.props.toggleScreen()}
                        />
                        <label htmlFor="toggleScreen"></label>
                    </div>
                </li>
            </ul>
        );
    }
}
