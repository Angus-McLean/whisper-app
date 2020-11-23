import React, {Component} from 'react';
import MessageWhisper from './MessageWhisper';

class MessageText extends Component {

    constructor(props){
        super(props)
        // console.log("MessageText", this)
    }

    render() {
        var msgObj = this.props.message
        
        var sent = msgObj.uid === window.GLOBAL.meeting.userId

        if (msgObj.type === 'recording') {
            return (
                <div className={"div-block-11 " + (sent ? "" : "received")}>
                    <div>
                        <div className={"div-block-10 " + (sent ? "" : "received")}>
                            <figure >
                                <audio style={{ margin: '10px 5px 5px 10px' }} controls src={msgObj.text}></audio>
                            </figure>
                        </div>
                        <div style={{ marginTop: '-10px' }}>
                            {msgObj.uid} -- {msgObj.createdAt && msgObj.createdAt.toDate().toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            )
        } else if (msgObj.type === 'call') {
            return (
                <MessageWhisper message={msgObj}/>
            )
        } else if (msgObj.type === 'update') {
            return (<>
                <div>
                    <div style={{textAlign:'center'}}>
                        <div>{msgObj.text}</div>
                    </div>
                </div>
            </>)
        } else {
            return (
                <div className={"div-block-11 "+ (sent ? "" : "received")}>
                    <div>
                    <div className={"div-block-10 "+ (sent ? "" : "received")}>
                        <div className="text-block-3">{msgObj.text}</div>
                    </div>
                    <div style={{ marginTop: '-2px' }}>
                        {msgObj.uid} -- {msgObj.createdAt && msgObj.createdAt.toDate().toLocaleTimeString()}
                    </div>
                    </div>
                </div>
            )
        }

    }
}

export default MessageText;
