/*
注册登录
*/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


class Sign extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            height: this.props.fullScreen ? document.body.scrollHeight : document.body.scrollHeight - 60
        };
        this.updateHeight = this.updateHeight.bind(this);
    }

    render() {
        return (
            <div className="sign">
                <div className="sign-choic">
                    <a href="">SIGN IN</a>
                    <a href="">SIGN UP</a>
                </div>
                <div className="username">
                    <i></i>
                    <input type="text" placeholder="username" maxLength="8" />
                </div>
                <div className="password">
                    <i></i>
                    <input type="text" placeholder="password" />
                </div>
                <div className="keepSigned">
                    <p>Keep me Signed in</p>
                    <div>
                        <input type="checkbox" id="keepSigned" />
                        <label htmlFor="keepSigned"></label>
                    </div>
                </div>
                <button>SIGN IN</button>
            </div>
        );
    }
}


Sign.propTypes = {
};


function selector(state) {
    return {
    };
}

export default connect(selector)(Sign);
