import React, { Component } from 'react';

import firebase from 'firebase/app';
import ReactMicComp from './ReactMicComp';


class ChatInputs extends Component {

    sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = {uid:'asdf',photoURL:'#'};

        await this.props.messagesRef.add({
            text: this.state.inputValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        // this.setFormValue('');
        this.state.inputValue = '';
    }

    constructor(props){
        super(props)
        this.state = {
            inputType : 'text',
            inputValue : ''
        }
        console.log(React)

        this.audioRecRef = React.createRef();

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
                        <div className="div-block-9"><i className="fa fa-phone"></i></div>
                        <div className="div-block-9" onClick={()=>{
                            self.setState({inputType:'record'});
                        }}><i className="fa fa-bullseye"></i></div>
                    </div>
                </form>
            </>)
        } else if (this.state.inputType === 'record') {
            return (<>
                <form onSubmit={this.sendMessage} className="div-block-7">
                    <ReactMicComp ref={this.audioRecRef} storageRef={this.props.storageRef} messagesRef={this.props.messagesRef}/>
                    <div className="div-block-8">
                        {/* <div className="div-block-9"><i className="fa fa-send"></i></div> */}
                        {/* <div className="div-block-9"><i className="fa fa-phone"></i></div> */}
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
