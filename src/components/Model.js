/**
* 模态框
**/


import React from 'react';
import EditProfile from './EditProfile';
import EditGroup from './EditGroup';


export default class Model extends React.PureComponent {
    render() {
        const modal = this.props.modal;
        return (
            <div className="modal" style={{ display: modal === 0 ? 'none' : 'block' }}>
                { modal === 1 ?
                    <EditProfile
                      user={this.props.user}
                      warning={this.props.warning}
                      updateProfile={newUser => this.props.updateProfile(newUser)}
                      changeWarning={newWarning => this.props.changeWarning(newWarning)}
                      closeModal={() => this.props.closeModal()}
                    />
                    :
                    <EditGroup
                      warning={this.props.warning}
                      createGroup={newGroup => this.props.createGroup(newGroup)}
                      changeWarning={newWarning => this.props.changeWarning(newWarning)}
                      closeModal={() => this.props.closeModal()}
                    />
                }
            </div>
        );
    }
}
