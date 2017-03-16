/**
 * 聊天室消息列表
 * @class MainMessages
 * @prop {object} user 用户资料
 * @prop {array} msg 聊天消息
 */


import React from 'react';
import MessageSystem from './MessageSystem';
import MessageUser from './MessageUser';


export default class MainMessages extends React.PureComponent {
    componentDidUpdate() {
        this._messages.scrollTop = this._messages.scrollHeight;
    }


    render() {
        const { user, msg } = this.props;
        const { username, avatar } = user;

        // 生成消息列表
        const msgMap = (msgItem, index) => {
            if (msgItem.type === 'system') {
                return <MessageSystem key={index} text={msgItem.text} />;
            }
            if (msgItem.sender === username) {
                return (<MessageUser
                  key={index}
                  self
                  avatar={avatar}
                  username={username}
                  time={msgItem.time}
                  type={msgItem.type}
                  text={msgItem.text}
                />);
            }

            return (<MessageUser
              key={index}
              self={false}
              avatar={msgItem.avatar}
              username={msgItem.sender}
              time={msgItem.time}
              type={msgItem.type}
              text={msgItem.text}
            />);
        };


        return (
            <div className="main-messages" ref={ div => this._messages = div } >
                {msg.map(msgMap)}
            </div>
        );
    }
}
