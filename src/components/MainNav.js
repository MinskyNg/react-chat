/**
* 聊天室导航栏
**/


import React from 'react';


export default class MainNav extends React.PureComponent {
    render() {
        const targetProfile = this.props.targetProfile;
        return (
            <nav className="main-nav">
                <div>
                    <img
                      src={`http://7xnpxz.com1.z0.glb.clouddn.com/${targetProfile.avatar}.png`}
                      alt="头像"
                    />
                </div>
                <h2>{targetProfile.name}</h2>
                <p>{targetProfile.signature}</p>
            </nav>
        );
    }
}
