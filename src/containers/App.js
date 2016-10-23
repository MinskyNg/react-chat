/**
* 主体组件
**/


import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateUser, createGroup, changeModal } from '../actions';
import Model from '../components/Model';


export default class App extends React.PureComponent {
    render() {
        return (
            <div className="wrapper">
                {this.props.children}
                <Model
                  user={this.props.user}
                  groups={this.props.groups}
                  warning={this.props.warning}
                  modal={this.props.modal}
                  updateUser={newUser => this.props.dispatch(updateUser(newUser))}
                  createGroup={newGroup => this.props.dispatch(createGroup(newGroup))}
                  closeModal={() => changeModal(0)}
                />
            </div>
        );
    }
}


App.propTypes = {
    user: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        signature: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired
    })).isRequired,
    warning: PropTypes.string.isRequired,
    modal: PropTypes.number.isRequired
};


function selector(state) {
    return {
        user: state.get('user').toJS(),
        groups: state.get('groups').toJS(),
        warning: state.get('warning'),
        modal: state.get('modal')
    };
}

export default connect(selector)(App);
