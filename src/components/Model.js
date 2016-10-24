/**
* 模态框
**/


import React from './react';
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
                      updateUser={() => this.props.updateUser()}
                      closeModal={() => this.props.closeModal()}
                    />
                    :
                    <EditGroup
                      warning={this.props.warning}
                      createGroup={this.props.createGroup}
                      closeModal={() => this.props.closeModal()}
                    />
                }
            </div>
        );
    }
}
