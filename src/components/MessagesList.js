import React, {Component}  from 'react';
import MessageText from './MessageText';


class MessagesList extends Component {
    render() {
        console.log(this.props.messages)

        return (
            <div className="messages-box">
                <div className="px-4 py-5 chat-box bg-white">
                    {
                        this.props.messages.map(msg => (
                            <MessageText message={msg}/>
                        ))
                    }
                    </div>
                </div>

        )
    }
}

export default MessagesList;
