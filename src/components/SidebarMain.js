/*
侧边栏主体
*/


import React from 'react';
import SidebarUsers from './SidebarUsers';
import SidebarGroups from './SidebarGroups';
import SidebarSets from './SidebarSets';


export default class SidebarMain extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { content: 1 };
    }

    render() {
        return (
            <div className="sidebar-main">
                <div className="sidebar-menu">
                    <button onClick={() => this.setState({ content: 1 })}>用户</button>
                    <button onClick={() => this.setState({ content: 2 })}>群组</button>
                    <button onClick={() => this.setState({ content: 3 })}>设置</button>
                </div>
                <div className="sidebar-content">
                    {
                        if (this.state.content === 1) {
                            return <SidebarUsers
                                      users={this.props.users}
                                      privateChat={name => this.props.privateChat(name)}
                                    />
                        } else if (this.state.content === 2) {
                            return <SidebarGroups
                                      groups={this.props.groups}
                                      joinGroup={name => this.props.joinGroup(name)}
                                      showEditGroup={() => this.props.showEditGroup()}
                                    />
                        } else {
                            return <SidebarSets
                                      sets={this.props.sets}
                                      toggleReceive={() => this.props.toggleReceive()}
                                      toggleSound={() => this.props.toggleSound()}
                                      toggleNotice={() => this.props.toggleNotice()}
                                      toggleScreen={() => this.props.toggleScreen()}
                                    />
                        }
                    }
                </div>
            </div>
        );
    }
}
