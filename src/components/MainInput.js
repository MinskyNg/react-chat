/**
 * 聊天室输入区
 * @class MainInput
 * @prop {function} sendMsg 发送信息
 */


import React from 'react';


export default class MainInput extends React.PureComponent {
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


    // 处理图片上传
    handleUpload() {
        const fileInput = this._fileInput;
        if (fileInput.files && fileInput.files[0]) {
            const body = new FormData();
            body.append('smfile', fileInput.files[0]);
            fetch(' https://sm.ms/api/upload', {
                method: 'post',
                headers: {
                    Accept: '*/*',
                },
                body
            })
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                let time = new Date();
                const hour = time.getHours();
                const min = time.getMinutes();
                time = `${hour < 10 ? (`0${hour}`) : hour}:${min < 10 ? (`0${min}`) : min}`;
                this.props.sendMsg({
                    type: 'image',
                    text: data.data.url,
                    time,
                });
                }
            })
            .catch(e => console.log('Oops, upload error', e));
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
                <a className="button-image icon-image">
                    <input
                      type="file"
                      ref={ input => this._fileInput = input }
                      onChange={() => this.handleUpload()}
                    />
                </a>
                <input
                  type="text" placeholder="Type a message here"
                  ref={input => this._text = input}
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
