/**
* 侧边栏主体
**/


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
        const content = this.state.content;
        const activeStyle = { borderBottom: '2px solid #4385F5', color: '#4385F5' };
        let resStyle = {};
        if (document.body.clientWidth <= 886) {
            resStyle = { display: this.props.menu ? 'flex' : 'none' };
        }

        // 根据状态展示不同列表
        let SideBarList;
        if (content === 1) {
            SideBarList = (
                <SidebarUsers
                  users={this.props.users}
                  privateChat={name => this.props.privateChat(name)}
                />
            );
        } else if (content === 2) {
            SideBarList = (
                <SidebarGroups
                  groups={this.props.groups}
                  joinGroup={name => this.props.joinGroup(name)}
                  showEditGroup={() => this.props.showEditGroup()}
                />
            );
        } else {
            SideBarList = (
                <SidebarSets
                  sets={this.props.sets}
                  toggleReceive={() => this.props.toggleReceive()}
                  toggleSound={() => this.props.toggleSound()}
                  toggleNotice={() => this.props.toggleNotice()}
                  toggleScreen={() => this.props.toggleScreen()}
                />
            );
        }


        return (
            <div className="sidebar-main" style={resStyle}>
                <div className="sidebar-menu">
                    <button
                      onClick={() => this.setState({ content: 1 })}
                      style={ content === 1 ? activeStyle : {} }
                    >用户</button>
                    <button
                      onClick={() => this.setState({ content: 2 })}
                      style={ content === 2 ? activeStyle : {} }
                    >群组</button>
                    <button
                      onClick={() => this.setState({ content: 3 })}
                      style={ content === 3 ? activeStyle : {} }
                    >设置</button>
                </div>
                <div className="sidebar-content">
                    {SideBarList}
                </div>
            </div>
        );
    }
}
