import React, {Component} from 'react';

class MessageText extends Component {
    render() {
        // console.log(this.props.message)
        var msgObj = this.props.message
        
        var sent = msgObj.uid === 'asdf'

        if (msgObj.type === 'recording') {
            return (
                <div className={"div-block-11 "+ (sent ? "" : "received")}>
                    <div className={"div-block-10 "+ (sent ? "" : "received")}>
                        <figure style={{margin:'10px'}}>
                            <audio controls src="https://firebasestorage.googleapis.com/v0/b/ecse542-whisper.appspot.com/o/uploads%2Fphoto.mp3?alt=media&amp;token=fe732b54-3f4d-47d1-ac6e-d615bcf7962a"></audio>
                        </figure>
                    </div>
                </div>
            )
        }

        return (
            <div className={"div-block-11 "+ (sent ? "" : "received")}>
                <div className={"div-block-10 "+ (sent ? "" : "received")}>
                    <div className="text-block-3">{msgObj.text}</div>
                </div>
            </div>
        )
    }
}

export default MessageText;
