/**
 * 聊天室主体
 * @function Main
 * @prop {string} menu 菜单显示方式
 * @prop {object} user 用户资料
 * @prop {array} msg 聊天消息
 * @prop {object} targetProfile 聊天对象资料
 * @prop {function} sendMsg 发送信息
 */


import React from 'react';
import MainNav from './MainNav';
import MainMessages from './MainMessages';
import MainInput from './MainInput';


export default function Main({ menu, user, msg, targetProfile, sendMsg }) {
    let resStyle = {};
    if (document.body.clientWidth <= 886) {
        resStyle = { display: menu ? 'none' : 'flex' };
    }

    return (
        <div className="main" style={resStyle}>
            <MainNav
              targetProfile={targetProfile}
            />
            <MainMessages
              user={user}
              msg={msg}
            />
            <MainInput
              sendMsg={sendMsg}
            />
        </div>
    );
}
