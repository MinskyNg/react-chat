/**
* 注册登录页
**/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { signin, signup, changeWarning } from '../actions';


class Sign extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { signinPage: true };
    }

    // 处理提交注册登录
    handleSubmit(event) {
        event.preventDefault();
        const username = this._username.value.replace(/(^\s*)|(\s*$)/g, '');
        const password = this._password.value.replace(/(^\s*)|(\s*$)/g, '');
        if (username === '' || password === '') {
            this.props.dispatch(changeWarning('用户名或密码不能为空'));
            return;
        }
        // 判断是登陆或注册
        if (this.state.signinPage) {
            this.props.dispatch(signin({ username, password }, this._keepSigned.checked));
        } else {
            const date = new Date();
            const hour = date.getHours();
            const min = date.getMinutes();
            const newUser = {
                username,
                password,
                date: `${date.getFullYear()}-${date.getMonth() + 1}-
                  ${date.getDate()} ${hour < 10 ? (`0${hour}`) : hour}:
                  ${min < 10 ? (`0${min}`) : min}`
            };
            this.props.dispatch(signup(newUser, this._keepSigned.checked));
        }
    }

    render() {
        const signinPage = this.state.signinPage;

        const inStyle = {
            cursor: signinPage ? 'default' : 'pointer',
            borderBottomWidth: signinPage ? '2px' : '0',
        };
        const upStyle = {
            cursor: signinPage ? 'pointer' : 'default',
            borderBottomWidth: signinPage ? '0' : '2px',
        };

        return (
            <div className="sign">
                <div className="sign-choic">
                    <a
                      style={inStyle}
                      onClick={ () => this.setState({ signinPage: true })}
                    >SIGN IN</a>
                    <a
                      style={upStyle}
                      onClick={ () => this.setState({ signinPage: false })}
                    >SIGN UP</a>
                </div>
                <form action="#" onSubmit={ e => this.handleSubmit(e) }>
                    <div className="username">
                        <i></i>
                        <input
                          type="text" placeholder="username" maxLength="8"
                          ref={ input => this._username = input }
                        />
                    </div>
                    <div className="password">
                        <i></i>
                        <input
                          type="password" placeholder="password" maxLength="30"
                          ref={ input => this._password = input }
                        />
                    </div>
                    <div className="keepSigned">
                        <p>保持登录</p>
                        <div>
                            <input
                              type="checkbox" id="keepSigned"
                              ref={ input => this._keepSigned = input }
                            />
                            <label htmlFor="keepSigned"></label>
                        </div>
                    </div>
                    <input
                      type="submit"
                      value={ this.state.signinPage ? 'SIGN IN' : 'SIGN UP' }
                    />
                </form>
                <p className="warning">{this.props.warning}</p>
            </div>
        );
    }
}


Sign.propTypes = {
    warning: PropTypes.string.isRequired
};


function selector(state) {
    return {
        warning: state.get('warning')
    };
}

export default connect(selector)(Sign);
