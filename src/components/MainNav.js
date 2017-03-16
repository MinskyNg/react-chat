/**
 * 聊天室导航栏
 * @function MainNav
 * @prop {object} targetProfile 聊天对象
 */


import React from 'react';


export default function MainNav({ targetProfile }) {
    return (
        <nav className="main-nav">
            <div>
                <img
                  src={targetProfile.avatar}
                  alt="头像"
                />
            </div>
            <h2>{targetProfile.name}</h2>
            <p>{targetProfile.signature}</p>
        </nav>
    );
}
