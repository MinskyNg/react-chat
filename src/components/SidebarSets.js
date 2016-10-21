/*
侧边栏设置区
*/


import React from 'react';


export default class SidebarSets extends React.PureComponent {
    render() {
        return (
            <ul>
                <li className="checkbox">
                    <h4>接收私聊</h4>
                    <div>
                        <input type="checkbox" id="toggleRecive" />
                        <label htmlFor="toggleRecive"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>声音提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleSound" />
                        <label htmlFor="toggleSound"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>桌面提醒</h4>
                    <div>
                        <input type="checkbox" id="toggleNotice" />
                        <label htmlFor="toggleNotice"></label>
                    </div>
                </li>
                <li className="checkbox">
                    <h4>切换全屏</h4>
                    <div>
                        <input type="checkbox" id="toggleScreen" />
                        <label htmlFor="toggleScreen"></label>
                    </div>
                </li>
            </ul>
        );
    }
}
