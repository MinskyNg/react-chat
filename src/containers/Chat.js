/*
聊天室
*/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';


class Chat extends React.PureComponent {
    render() {
        return (
            <div className="container">
                <Sidebar />
                <Main />
            </div>
        );
    }
}


Chat.propTypes = {
};


function selector(state) {
    return {
    };
}

export default connect(selector)(Chat);
