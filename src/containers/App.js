/*
主体组件
*/


import React from 'react';
import Model from '../components/Model';


export default class App extends React.PureComponent {
    render() {
        return (
            <div className="wrapper">
                {this.props.children}
                <Model />
            </div>
        );
    }
}
