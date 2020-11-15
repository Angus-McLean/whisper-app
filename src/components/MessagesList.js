import React, {Component, useRef}  from 'react';
import MessageText from './MessageText';


class MessagesList extends Component {
    
    constructor(){
        super()
        this.dummy = React.createRef();
    }
    render() {
        console.log("MessagesList", this.props.messages)

        setTimeout(()=>{
            console.log(this.dummy)
            this.dummy.current.scrollIntoView({ behavior: 'smooth' })
        }, 100)

        return (
            <div style={{ overflow: 'scroll', height: '55vh' }}>
                {
                    this.props.messages && this.props.messages.reverse().map(msg => (
                        <MessageText key={msg.id} message={msg}/>
                    ))
                }
                <span ref={this.dummy}></span>
            </div>
        )
    }
}

export default MessagesList;
