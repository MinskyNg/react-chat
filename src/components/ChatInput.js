import React from 'react';


export default class ChatInput extends React.Component {
    now() {
        const date = new Date();
        const time = (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes());
        return time;
    }

    handleClick() {
        let msg;
        const msgText = this._inputMsg.innerHTML.toString();
        if (msgText === '') return;
        const time = this.now();
        if (this.props.receiver === 'SEND_TO_ALL') {
            msg = '<div class="message message-sender">' + this.props.user +
            '<span class="message-time"><span class="icon icon-time"></span>' + time +
            '</span></div><div class="message message-public">' + msgText + '</div>';
        } else {
            msg = '<div class="message message-sender">你对 ' + this.props.receiver +
            ' 说:<span class="message-time"><span class="icon icon-time"></span>' + time +
            '</span></div><div class="message message-private">' + msgText + '</div>';
        }
        this.props.socket.emit('send', {
            sender: this.props.user,
            receiver: this.props.receiver,
            time,
            msgText
        });
        this._inputMsg.innerHTML = '';
        this._inputMsg.focus();
        this.props.addMsg(msg);
    }

    render() {
        return (
            <div className="content-send">
                <div contentEditable="true" placeholder="说些话吧......" className="input-message" ref={ div => {this._inputMsg = div;} }></div>
                <button className="button-send" onClick={ () => this.handleClick() } >发送</button>
                <span className="info-send">你好 <span className="sender">{ this.props.user === 'NOT_LOGGED_IN' ? '未登录用户' : this.props.user}
                </span> , 你正在和 <span className="receiver">{ this.props.receiver === 'SEND_TO_ALL' ? '所有人' : this.props.receiver }</span> 聊天</span>
                <button className="button-clear" onClick={ this.props.clearMsg } >清屏</button>
            </div>
        );
    }
}
