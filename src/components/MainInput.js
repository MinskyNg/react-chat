/**
 * 聊天室输入区
 * @function MainInput
 * @prop {function} sendMsg 发送信息
 */


import React from 'react';


export default function MainInput({ sendMsg }) {
    let file;
    let text;


    // 发送文本
    const sendText = () => {
        const newText = text.value.replace(/(^\s*)|(\s*$)/g, '');
        if (newText !== '') {
            let time = new Date();
            const hour = time.getHours();
            const min = time.getMinutes();
            time = `${hour < 10 ? (`0${hour}`) : hour}:${min < 10 ? (`0${min}`) : min}`;
            sendMsg({
                type: 'plain',
                text: newText,
                time,
            });
            text.value = '';
        }
    };


    // 处理图片上传
    const handleUpload = () => {
        if (file.files && file.files[0]) {
            const body = new FormData();
            body.append('smfile', file.files[0]);
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
                    sendMsg({
                        type: 'image',
                        text: data.data.url,
                        time,
                    });
                }
            })
            .catch(e => console.log('Oops, upload error', e));
        }
    };


    // 处理回车
    const handleEnter = e => {
        if (e.keyCode === 13) {
            sendText();
        }
        e.stopPropagation();
    };


    return (
        <div className="main-input">
            <a className="button-image icon-image">
                <input
                  type="file"
                  ref={ input => file = input }
                  onChange={handleUpload}
                />
            </a>
            <input
              type="text" placeholder="Type a message here"
              ref={input => text = input}
              onKeyDown={handleEnter}
            />
            <button
              className="button-send"
              onClick={sendText}
            >Send</button>
        </div>
    );
}
