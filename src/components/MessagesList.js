import React, {Component }  from 'react';
import MessageText from './MessageText';


class MessagesList extends Component {
    
    constructor(){
        super()
        this.bottomRef = React.createRef();
    }
    render() {
        console.log("MessagesList", this.props.messages)

        setTimeout(()=>{
            console.log(this.bottomRef)
            this.bottomRef.current && this.bottomRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 100)

        return (
            <div style={{ overflow: 'scroll', height: '55vh' }}>
                {
                    this.props.messages && this.props.messages.reverse().map(msg => (
                        <MessageText key={msg.id} message={msg}/>
                    ))
                }
                <span ref={this.bottomRef}></span>
            </div>
        )
    }
}

export default MessagesList;
