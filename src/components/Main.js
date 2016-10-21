/*
聊天室主体
*/


import React from 'react';
import MainNav from './MainNav';
import MainMessages from './MainMessages';
import MainInput from './MainInput';


export default class Main extends React.PureComponent {
    render() {
        return (
            <div className="main">
                <MainNav />
                <MainMessages />
                <MainInput />
            </div>
        );
    }
}
