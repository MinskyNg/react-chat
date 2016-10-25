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
                        <input type="checkbox" id="toggleReceive" checked={sets.receive} />
                        <label htmlFor="toggleReceive"
                          onClick={() => this.props.toggleReceive()}
                        ></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>声音提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleSound" checked={sets.sound} />
                        <label htmlFor="toggleSound"
                          onClick={() => this.props.toggleSound()}
                        ></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>桌面提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleNotice" checked={sets.notice} />
                        <label htmlFor="toggleNotice"
                          onClick={() => this.props.toggleNotice()}
                        ></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>切换全屏</h4>
                    <div>
                        <input type="checkbox" id="toggleScreen" checked={sets.screen} />
                        <label htmlFor="toggleScreen"
                          onClick={() => this.props.toggleScreen()}
                        ></label>
                    </div>
                </li>
            </ul>
        );
    }
}
