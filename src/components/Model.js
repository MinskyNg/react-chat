/**
* 模态框
**/


import React from 'react';
import EditUser from './EditUser';
import EditGroup from './EditGroup';


export default class Model extends React.PureComponent {
    render() {
        const modal = this.props.modal;

        return (
            <div className="modal" style={{ display: modal ? 'block' : 'none' }}>
                { modal === 1 ?
                    <EditUser
                      user={this.props.user}
                      warning={this.props.warning}
                      updateUser={newUser => this.props.updateUser(newUser)}
                      clearWarning={() => this.props.clearWarning()}
                      closeModal={() => this.props.closeModal()}
                    />
                    :
                    <EditGroup
                      warning={this.props.warning}
                      createGroup={newGroup => this.props.createGroup(newGroup)}
                      clearWarning={() => this.props.clearWarning()}
                      closeModal={() => this.props.closeModal()}
                    />
                }
            </div>
        );
    }
}
