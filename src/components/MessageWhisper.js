import React, {Component} from 'react';

var JitsiMeetExternalAPI = window.JitsiMeetExternalAPI || {}


class MessageWhisper extends Component {

    constructor(props){
        super(props)
        this.state = {
            status : 'closed',
            mute : false
        }
    }

    answerCall() {
        // alert('Not Implemented Yet! woot')

        this.jitsiCallObj = new JitsiMeetExternalAPI('meet.jit.si', {
            roomName:this.props.message.text,
            parentNode:document.getElementById(this.props.message.text),
            width:'100%', height:'100%', userInfo: {
                displayName: 'asdfwev'
            }, configOverwrite: {
                prejoinPageEnabled: false,
                startWithAudioMuted: false
        }})
        window.jitsiCallObj = this.jitsiCallObj
        
        // notify you've entered
        this.jitsiCallObj.executeCommand('sendTones', { tones: '99', pause: 0, duration:1 });

        this.setState({status:'active'})
    }

    toggleMute() {
        alert(this.state.mute)
    }

    closeCall() {
        var _this = this
        this.jitsiCallObj.executeCommand('hangup');
        setTimeout(() => {
            document.getElementById(_this.props.message.text).innerHTML = ''
        }, 100)

        this.setState({status:'closed'})
    }

    render() {
        // console.log(this.props.message)
        var msgObj = this.props.message
        
        var sent = msgObj.uid === window.GLOBAL.meeting.userId

        if (this.state.status === 'closed') {
            return (
                <div className={"div-block-11 " + (sent ? "" : "received")}>
                    <div>
                        <div className={"div-block-10 " + (sent ? "" : "received")}>
                            {/* Call : {this.state.status} - {msgObj.text} -  */}
                            <div className="text-block-3">Live Whisper..</div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    background: "url(/whisper-app/images/ellipsis.gif)",
                                    backgroundPosition: "center",
                                    height: "60px",
                                    width: "80%"
                                }}></div>
                                <div className="div-block-9" onClick={this.answerCall.bind(this)}><i className="fa fa-phone"></i></div>
                            </div>
                        </div>
                        <div>
                            {msgObj.uid} -- {msgObj.createdAt && msgObj.createdAt.toDate().toLocaleString()}
                        </div>
                        <div id={msgObj.text} style={{display:'none'}}></div>
                    </div>
                </div>
            )
        }
        if (this.state.status === 'active') {
            return (
                <div className={"div-block-11 " + (sent ? "" : "received")}>
                    <div>
                        <div className={"div-block-10 " + (sent ? "" : "received")} style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                background: "url(/whisper-app/images/audiosoundwave.gif) 50% 50% / contain",
                                height: "60px",
                                width: "80%"
                            }}></div>
                            <div className="div-block-9" onClick={this.toggleMute.bind(this)}><i className="fa fa-microphone"></i></div>
                            <div className="div-block-9" onClick={this.closeCall.bind(this)}><i className="fa fa-times"></i></div>
                        </div>
                        <div>
                            {msgObj.uid} -- {msgObj.createdAt && msgObj.createdAt.toDate().toLocaleString()}
                        </div>
                        <div id={msgObj.text} style={{display:'none'}}></div>
                    </div>
                </div>
            )
        }
    }
}

export default MessageWhisper;
