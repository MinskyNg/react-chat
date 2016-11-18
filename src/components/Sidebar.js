/**
 * 侧边栏
 * @class Sidebar
 * @prop {string} menu 菜单显示方式
 * @prop {function} toggleMenu 切换菜单
 * @prop {object} user 用户资料
 * @prop {array} users 用户列表
 * @prop {array} groups 群组列表
 * @prop {object} settings 设置列表
 * @prop {function} signout 登出
 * @prop {function} joinGroup 加入群组
 * @prop {function} privateChat 私聊
 * @prop {function} changeModal 显示模态框
 * @prop {function} toggleReceive 切换接收私聊
 * @prop {function} toggleSound 切换声音提示
 * @prop {function} toggleNotice 切换桌面提示
 * @prop {function} toggleScreen 切换全屏
 */


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
