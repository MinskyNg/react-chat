/*
聊天室输入区
*/


import React from 'react';


export default class MainInput extends React.PureComponent {
    render() {
        return (
            <div className="main-input">
                <button className="button-face"></button>
                <button className="button-image"></button>
                <input type="text" placeholder="Type a message here" />
                <button className="button-send">Send</button>
            </div>
        );
    }
}
