import React, {Component} from 'react';

class MessageText extends Component {
    render() {
        // console.log(this.props.message)
        var msgObj = this.props.message
        
        var sent = msgObj.uid === 'asdf'

        if (!sent) {
            return (
                <div className="div-block-11 received">
                    <div className="div-block-10 received">
                        <div className="text-block-3">{msgObj.text}</div>
                    </div>
                </div>
            )
        }
        else if (sent) {
            return (
                <div className="div-block-11">
                    <div className="div-block-10">
                        <div className="text-block-3">{msgObj.text}</div>
                    </div>
                </div>
            )
        } else { return msgObj.toString() }
    }
}

export default MessageText;
