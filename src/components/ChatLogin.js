import React from 'react';


export default class ChatContent extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        const name = this._name.value.replace(/(^\s*)|(\s*$)/g, '')
            .replace(/[<>'&]/g, match => {
                switch (match) {
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '&':
                        return '&amp;';
                    case '\'':
                        return '&quot;';
                    default:
                        return match;
                }
            });
        if (name === '' || this.props.userList.indexOf(name) !== -1) {
            // 当前用户存在
            this.props.warningVisible();
        } else {
            this.props.login(this.props.socket, name);
        }
    }

    render() {
        return (
            <div className="login" style={ { display: this.props.user === 'NOT_LOGGED_IN' ? 'block' : 'none' } }>
            <form ref={ form => {this._form = form;} } action="#" onSubmit={ e => this.handleSubmit(e) }>
                <label htmlFor="name">请输入昵称：</label>
                <input ref={ input => {this._name = input;} } type="text" name="name" className="name" />
                <p className="warning" style={ { visibility: this.props.warning ? 'visible' : 'hidden' } } >用户名已存在或含非法字符</p>
                <button type="submit" className="button-login">登录</button>
            </form>
            </div>
        );
    }
}
