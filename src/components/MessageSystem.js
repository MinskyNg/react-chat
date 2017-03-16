/**
 * 系统消息
 * @function MessageSystem
 * @prop {string} text 消息文本
 */


import React from 'react';


export default function MessageSystem({ text }) {
    return (
        <div className="message-system">
            <span>{text}</span>
        </div>
    );
}
