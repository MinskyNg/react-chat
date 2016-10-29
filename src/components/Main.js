/**
* 聊天室主体
**/


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
