/**
 * 主体组件
 * @function App
 * @prop {object} children 子组件
 */


import React from 'react';


export default function App({ children }) {
    return <div className="wrapper">{children}</div>;
}

