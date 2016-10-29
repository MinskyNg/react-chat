/**
* 群组列表
**/


import React from 'react';


export default class SidebarGroups extends React.PureComponent {
    render() {
        const { groups, joinGroup } = this.props;

        // 生成群组列表
        let groupItems = groups.map(group => (
            <li key={group.name} onClick={() => joinGroup(group.name)}>
                <div className="avatar">
                    <img
                      src={group.avatar}
                      alt="头像"
                    />
                </div>
                <div className="profile">
                    <h4>{group.name}</h4>
                    <p>{group.signature}</p>
                </div>
            </li>
        ));

        return (
            <ul>
                <button className="create-group" onClick={() => this.props.showEditGroup()}>
                创建群组</button>
                {groupItems}
            </ul>
        );
    }
}
