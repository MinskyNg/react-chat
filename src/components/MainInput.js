/**
* 聊天室输入区
**/


import React from 'react';


export default class MainInput extends React.PureComponent {
    // sendImage() {

    // }

    // 发送文本
    sendText() {
        const text = this._text.value.replace(/(^\s*)|(\s*$)/g, '');
        if (text !== '') {
            let time = new Date();
            const hour = time.getHours();
            const min = time.getMinutes();
            time = `${hour < 10 ? (`0${hour}`) : hour}:${min < 10 ? (`0${min}`) : min}`;
            this.props.sendMsg({
                type: 'plain',
                text,
                time,
            });
            this._text.value = '';
        }
    }

    // 处理回车
    handleEnter(event) {
        if (event.keyCode === 13) {
            this.sendText();
        }
        event.stopPropagation();
    }

    render() {
        return (
            <div className="main-input">
                <button className="button-face"></button>
                <button className="button-image"></button>
                <input
                  ref={input => this._text = input}
                  type="text" placeholder="Type a message here"
                  onKeyDown={(e) => this.handleEnter(e)}
                />
                <button
                  className="button-send"
                  onClick={() => this.sendText()}
                >Send</button>
            </div>
        );
    }
}
