import React, {Component} from 'react';

class MessageText extends Component {

    constructor(props){
        super(props)
    }

    render() {
        // console.log(this.props.message)
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
                            {msgObj.uid} -- {msgObj.createdAt && msgObj.createdAt.toDate().toLocaleString()}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className={"div-block-11 "+ (sent ? "" : "received")}>
                <div>
                <div className={"div-block-10 "+ (sent ? "" : "received")}>
                    <div className="text-block-3">{msgObj.text}</div>
                </div>
                <div style={{ marginTop: '-2px' }}>
                    {msgObj.uid} -- {msgObj.createdAt && msgObj.createdAt.toDate().toLocaleString()}
                </div>
                </div>
            </div>
        )
    }
}

export default MessageText;
