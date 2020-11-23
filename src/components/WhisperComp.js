import React, {Component} from 'react';
import firebase from 'firebase/app';

var JitsiMeetExternalAPI = window.JitsiMeetExternalAPI || {}


class WhisperComp extends Component {

    constructor(props){
        super(props)
        console.log('WhisperComp', this, props);

        this.state = {
            // status : 'ringing',
            // status : this.props.whisper && this.props.whisper['status-'+window.GLOBAL.meeting.userId],
            mute : false
        }
        this.autoAnswered = false

    }

    answerCall() {
        // alert('Not Implemented Yet! woot')

        this.jitsiCallObj = new JitsiMeetExternalAPI('meet.jit.si', {
            roomName:this.props.whisper.text,
            parentNode:document.getElementById('whisper-jitsi-container'),
            width:'100%', height:'100%', userInfo: {
                displayName: window.GLOBAL.meeting.userId
            }, configOverwrite: {
                prejoinPageEnabled: false,
                startWithAudioMuted: false
        }})
        window.jitsiCallObj = this.jitsiCallObj
        
        // notify you've entered
        this.jitsiCallObj.executeCommand('sendTones', { tones: '99', pause: 0, duration:1 });

        var uid = window.GLOBAL.meeting.userId
        this.props.messagesRef.add({
            type: 'update',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            from: uid, uid,
            text: uid + " joined "+this.props.whisper.from+"'s Whisper",
            to: uid === this.props.whisper.to ? this.props.whisper.from : this.props.whisper.to
        })

        var _this = this
        setTimeout(() => {
            this.props.whispersRef
                .doc(this.props.whisper.id)
                .update({['status-'+window.GLOBAL.meeting.userId]:'active'});
        },100)
    }

    toggleMute() {
        // alert(this.state.mute)
    }

    closeCall() {
        var _this = this
        if(this.jitsiCallObj) {this.jitsiCallObj.executeCommand('hangup');}
        setTimeout(() => {
            (document.getElementById("whisper-jitsi-container")||{}).innerHTML = '';
        }, 100)

        var uid = window.GLOBAL.meeting.userId
        this.props.messagesRef.add({
            type: 'update',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            from: uid, uid,
            text: uid + " left "+this.props.whisper.from+"'s Whisper",
            to: this.props.selectedUser
        })

        this.props.whispersRef
            .doc(this.props.whisper.id)
            .update({['status-'+window.GLOBAL.meeting.userId]:'closed'});
    }

    render() {

        // console.log(this.props.message)
        // var msgObj = this.props.message
        // var sent = msgObj.uid === window.GLOBAL.meeting.userId
        console.log('WhisperComp.render', this)
        if (!this.props.whisper) { return <></> }
        
        var uid = window.GLOBAL.meeting.userId
        if (this.props.whisper.from === uid && !this.autoAnswered && (this.props.whisper['status-'+uid]=='ringing' || !this.props.whisper['status-'+uid])){
            var self = this
            this.autoAnswered = true
            setTimeout(()=>self.answerCall(), 0)
        }

        const whisperHeaderHtml = (
            <div className="div-block-4 green" style={{margin: "20px"}}>
                <div className="div-block-4 green" style={{width: "fit-content"}}>
                    <div className="text-block">
                        <div className="div-block-4 green">
                            <div className="text-block">Whispering with {
                                this.props.whisper.from === window.GLOBAL.meeting.userId ? 
                                this.props.whisper.to : this.props.whisper.from
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        )

        const incomingWhipserHtml = (<>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    background: "url(/whisper-app/images/ellipsis.gif)",
                    backgroundPosition: "center",
                    backgroundRepeat:'no-repeat',
                    height: '2vh', width: "80%"
                }}></div>
                <div className="div-block-9" onClick={this.answerCall.bind(this)}><i className="fa fa-phone"></i></div>
                <div className="div-block-9" onClick={this.closeCall.bind(this)}><i className="fa fa-times"></i></div>
            </div>
        </>)

        const activeWhisperHtml = (<>
            <div style={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <div style={{
                    background: "url(/whisper-app/images/audiosoundwave.gif) 50% 50% / cover",
                    backgroundRepeat:'no-repeat',
                    // height: "60px",
                    height: '2vh', width: "80%"
                }}></div>
                {/* <div className="div-block-9" onClick={this.toggleMute.bind(this)}><i className="fa fa-microphone"></i></div> */}
                <div className="div-block-9" onClick={this.closeCall.bind(this)}><i className="fa fa-times"></i></div>
            </div>
        </>)

        var snippets = {
            'ringing': incomingWhipserHtml,
            undefined : incomingWhipserHtml,
            'active': activeWhisperHtml
        }
        
        const snipContainerHtml = <>
            <div id="incomingCalls" style={{
                position: "fixed", top: "78%", height: "25vh", width: "inherit",
                borderTop: '1px solid #9b9b9b', background: 'inherit'
            }}>
                <div>
                    {whisperHeaderHtml}
                    {/* <div className="text-block-3">Live Whisper..</div> */}
                    {snippets[
                        this.props.whisper && this.props.whisper['status-'+window.GLOBAL.meeting.userId]
                    ]}
                    {/* {this.state.status === 'active' ? activeWhisperHtml : incomingWhipserHtml} */}
                </div>
                <div id='whisper-jitsi-container' style={{display:'none'}}></div>
            </div>
        </>

        return (<>
            {snipContainerHtml}
        </>)
    }
}

export default WhisperComp;
