/**
* 侧边栏
**/


import React from 'react';
import SidebarNav from './SidebarNav';
import SidebarMain from './SidebarMain';


export default class Sidebar extends React.PureComponent {
    render() {
        return (
            <aside className="sidebar">
                <SidebarNav
                  user={this.props.user}
                  signout={() => this.props.signout()}
                  showEditUser={() => this.props.changeModal(1)}
                />
                <SidebarMain
                  users={this.props.users}
                  groups={this.props.groups}
                  sets={this.props.sets}
                  joinGroup={name => this.props.joinGroup(name)}
                  privateChat={name => this.props.privateChat(name)}
                  showEditGroup={() => this.props.changeModal(2)}
                  toggleReceive={() => this.props.toggleReceive()}
                  toggleSound={() => this.props.toggleSound()}
                  toggleNotice={() => this.props.toggleNotice()}
                  toggleScreen={() => this.props.toggleScreen()}
                />
            </aside>

        );
    }
}
