import React, {Component }  from 'react';
import MessageText from './MessageText';


class MessagesList extends Component {
    
    constructor(props){
        super(props)
        this.bottomRef = React.createRef();
    }
    render() {
        // console.log("MessagesList", this.props.messages)

        setTimeout(()=>{
            // console.log(this.bottomRef)
            this.bottomRef.current && this.bottomRef.current.scrollIntoView({ behavior: 'smooth' })
        }, 100)

        return (<>
            {/* height: '58vh' */}
            <div style={{ overflow: 'scroll', height: '78vh' }}>
                {
                    this.props.messages && this.props.messages.reverse().map(msg => (
                        <MessageText key={msg.id} message={msg}/>
                    ))
                }
                <div style={{paddingTop:'25vh'}}>
                    <span ref={this.bottomRef}></span>
                </div>
            </div>
        </>)
    }
}

export default MessagesList;
