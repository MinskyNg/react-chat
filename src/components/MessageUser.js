/**
 * 用户消息
 * @function MessageUser
 * @prop {boolean} self 是否为本人发出
 * @prop {string} avatar 头像链接
 * @prop {string} username 用户名
 * @prop {string} time 消息时间
 * @prop {string} type 消息类型
 * @prop {string} text 图片链接或消息文本
 */


import React from 'react';


export default function MessageUser({ self, avatar, username, time, type, text }) {
    return (
        <div className={`message-container${self ? ' message-self' : ''}`}>
            <div className="message-sender">
                <img
                  src={avatar}
                  alt="头像"
                />
            </div>
            <div className={`message-content${self ? '' : ' message-other'}`}>
                <div>{username}<span className="message-time">{time}</span></div>
                <div className="message-text">
                    {type === 'image' ? <img src={text} /> : text}
                </div>
            </div>
        </div>
    );
}
