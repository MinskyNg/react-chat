import React from 'react';


export default class ChatSideBar extends React.PureComponent {
    render() {
        let userItems = this.props.userList.map((name, index) => {
            if (name !== this.props.user) {
                if (name !== this.props.receiver) {
                    return (
                        <li
                          key={ index }
                          title="双击聊天"
                          onClick={ () => this.props.changeReceiver(name) }
                        >{ name === 'SEND_TO_ALL' ? '所有人' : name }</li>
                    );
                }
                return (
                    <li
                      key={ index }
                      className="receiver"
                    >{ name === 'SEND_TO_ALL' ? '所有人' : name }</li>
                );
            }
            return <li key={ index } >{ name }</li>;
        });
        return (
            <div className="users-bar">
                <div className="user-label">在线用户 ({ this.props.userList.length - 1 })</div>
                <ul className="users-list">
                    { userItems }
                </ul>
            </div>
        );
    }
}
