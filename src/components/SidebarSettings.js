/**
 * 侧边栏设置列表
 * @function SidebarSettings
 * @prop {object} settings 设置列表
 * @prop {function} toggleReceive 切换接收私聊
 * @prop {function} toggleSound 切换声音提示
 * @prop {function} toggleNotice 切换桌面提示
 * @prop {function} toggleScreen 切换全屏
 */


import React from 'react';


function CheckBox({ id, text, checked, onChange }) {
    return (
        <li className="checkbox">
            <h4>{text}</h4>
            <div>
                <input type="checkbox" id={id}
                  checked={checked}
                  onChange={onChange}
                />
                <label htmlFor={id}></label>
            </div>
        </li>
    );
}

export default function SidebarSettings({ settings, toggleReceive, toggleSound, toggleNotice, toggleScreen }) {
    return (
        <ul>
            <CheckBox
              id={'toggleReceive'}
              text={'接收私聊'}
              checked={settings.receive}
              onChange={toggleReceive}
            />
            <CheckBox
              id={'toggleSound'}
              text={'声音提醒'}
              checked={settings.sound}
              onChange={toggleSound}
            />
            <CheckBox
              id={'toggleNotice'}
              text={'桌面提醒'}
              checked={settings.notice}
              onChange={toggleNotice}
            />
            <CheckBox
              id={'toggleScreen'}
              text={'切换全屏'}
              checked={settings.screen}
              onChange={toggleScreen}
            />
        </ul>
    );
}
