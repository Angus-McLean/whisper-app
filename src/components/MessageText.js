import React, {Component} from 'react';

class MessageText extends Component {
    render() {
        console.log(this.props.message)
        var msgObj = this.props.message
        
        if (msgObj.type === 'received') {
            return (
                <div className="media w-50 mb-3"><img src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg" alt="user" width="50" className="rounded-circle" />
                    <div className="media-body ml-3">
                        <div className="bg-light rounded py-2 px-3 mb-2">
                            <p className="text-small mb-0 text-muted">{msgObj.text}</p>
                        </div>
                        <p className="small text-muted">{msgObj.datetime}</p>
                    </div>
                </div>
            )
        }
        else if (msgObj.type === 'sent') {
            return (
                <div className="media w-50 ml-auto mb-3">
                    <div className="media-body">
                        <div className="bg-primary rounded py-2 px-3 mb-2">
                            <p className="text-small mb-0 text-white">{msgObj.text}</p>
                        </div>
                        <p className="small text-muted">{msgObj.datetime}</p>
                    </div>
                </div>
            )
        } else { return msgObj.toString() }
    }
}

export default MessageText;
