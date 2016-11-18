/**
 * 聊天室主体
 * @prop {string} menu 菜单显示方式
 * @prop {object} user 用户资料
 * @prop {array} msg 聊天对话
 * @prop {object} targetProfile 聊天对象资料
 * @prop {function} sendMsg 发送信息
 */


import React from 'react';
import MainNav from './MainNav';
import MainMessages from './MainMessages';
import MainInput from './MainInput';


export default class Main extends React.PureComponent {
    render() {
        let resStyle = {};
        if (document.body.clientWidth <= 886) {
            resStyle = { display: this.props.menu ? 'none' : 'flex' };
        }

        return (
            <div className="main" style={resStyle}>
                <MainNav
                  targetProfile={this.props.targetProfile}
                />
                <MainMessages
                  user={this.props.user}
                  msg={this.props.msg}
                />
                <MainInput
                  sendMsg={newMsg => this.props.sendMsg(newMsg)}
                />
            </div>
        );
    }
}
