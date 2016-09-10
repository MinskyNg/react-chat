import React from 'react';


export default class ChatContent extends React.Component {
    componentDidUpdate() {
        this._content.scrollTop = this._content.scrollHeight;
    }

    render() {
        return (
            <div className="content-show" ref={ div => {this._content = div;} } dangerouslySetInnerHTML={ { __html: this.props.chatMsg } } >
            </div>
        );
    }
}
