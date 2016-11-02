/**
* 侧边栏
**/


import React from 'react';
import SidebarNav from './SidebarNav';
import SidebarMain from './SidebarMain';
import SidebarSearch from './SidebarSearch';


export default class Sidebar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { search: false, keyword: '' };
    }


    render() {
        const menu = this.props.menu;
        let resStyle = {};
        if (document.body.clientWidth <= 886) {
            resStyle = { flex: this.props.menu ? '1' : 'none' };
        }

        return (
            <aside className="sidebar" style={resStyle}>
                <SidebarNav
                  menu={menu}
                  toggleMenu={bool => this.props.toggleMenu(bool)}
                  user={this.props.user}
                  signout={() => this.props.signout()}
                  showEditUser={() => this.props.changeModal(1)}
                  search={keyword => this.setState({ search: true, keyword })}
                />
                {
                  this.state.search
                  ?
                  <SidebarSearch
                    menu={menu}
                    users={this.props.users}
                    groups={this.props.groups}
                    keyword={this.state.keyword}
                    privateChat={name => this.props.privateChat(name)}
                    joinGroup={name => this.props.joinGroup(name)}
                    back={() => this.setState({ search: false })}
                  />
                  :
                  <SidebarMain
                    menu={menu}
                    users={this.props.users}
                    groups={this.props.groups}
                    settings={this.props.settings}
                    privateChat={name => this.props.privateChat(name)}
                    joinGroup={name => this.props.joinGroup(name)}
                    showEditGroup={() => this.props.changeModal(2)}
                    toggleReceive={() => this.props.toggleReceive()}
                    toggleSound={() => this.props.toggleSound()}
                    toggleNotice={() => this.props.toggleNotice()}
                    toggleScreen={() => this.props.toggleScreen()}
                  />
                }
            </aside>

        );
    }
}
