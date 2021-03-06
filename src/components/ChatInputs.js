import React, { Component } from 'react';

import firebase from 'firebase/app';
import ReactMicComp from './ReactMicComp';

class ChatInputs extends Component {

    constructor(props){
        super(props)
        this.state = {
            inputType : 'text',
            inputValue : ''
        }
        this.audioRecRef = React.createRef();
    }

    sendMessage = async (e) => {

        if (this.state.inputValue === '') return

        e.preventDefault();

        const uid = this.props.meeting.userId;

        await this.props.messagesRef.add({
            type: 'text',
            text: this.state.inputValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            from : uid,
            uid,
            to : this.props.selectedUser
        })

        this.state.inputValue = '';
    }

    sendWhisper = async (e) => {
        // if (this.state.inputValue === '') return
        // e.preventDefault();

        const uid = this.props.meeting.userId;
        await this.props.whispersRef.add({
            from: uid,
            text: "whispercall-"+Date.now(),
            to: this.props.selectedUser,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            // ['status-'+uid] : 'active'
        })
        await this.props.messagesRef.add({
            type: 'update',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            from: uid, uid,
            text: uid + " started a Whisper with "+this.props.selectedUser,
            to: this.props.selectedUser
        })
    }

    render() {
        var self = this;
        if (this.state.inputType === 'text') {
            return (<>
                <form onSubmit={this.sendMessage} className="div-block-7">
                    <input className="text-block-2" type="text" value={this.state.inputValue} 
                        onChange={(e) => self.setState({inputValue : e.target.value})}  
                        placeholder="Type here..." aria-describedby="button-addon2" 
                        className="form-control rounded-0 border-0 py-4 bg-light"
                        style={{
                            background: 'transparent',
                            width: '100%',
                            border: 'none',
                            color: 'gray',
                            height: 'min-content'
                        }}
                    />
                    <div className="div-block-8">
                        <div className="div-block-9" onClick={this.sendMessage}><i className="fa fa-send"></i></div>
                        <div className="div-block-9" onClick={this.sendWhisper}><i style={{color:"green"}} className="fa fa-phone"></i></div>
                        <div className="div-block-9" onClick={()=>{
                            self.setState({inputType:'record'});
                        }}><i style={{color:"rgb(244, 101, 36)"}} className="fa fa-bullseye"></i></div>
                    </div>
                </form>
            </>)
        } else if (this.state.inputType === 'record') {
            return (<>
                <form onSubmit={this.sendMessage} className="div-block-7">
                    <ReactMicComp ref={this.audioRecRef} meeting={this.props.meeting} 
                        storageRef={this.props.storageRef} 
                        messagesRef={this.props.messagesRef}
                        selectedUser={this.props.selectedUser}
                    />
                    <div className="div-block-8">
                        <div className="div-block-9" onClick={()=>{
                            console.log(self.audioRecRef && self.audioRecRef.current)
                            self.audioRecRef.current.stopRecording()
                            setTimeout(()=>{self.setState({inputType:'text'})}, 100)
                        }}><i className="fa fa-stop"></i></div>
                    </div>
                </form>
            </>)
        }
    }
}

export default ChatInputs;
