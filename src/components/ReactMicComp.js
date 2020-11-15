import React from 'react';
import { ReactMic } from 'react-mic';

import firebase from 'firebase/app';

export default class ReactMicComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            record: false
        }
        console.log(ReactMicComp, this)
    }

    startRecording = () => {
        this.setState({ record: true });
    }

    stopRecording = () => {
        this.setState({ record: false });
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob, this);
        this.saveToFirebase(recordedBlob)
    }

    saveToFirebase(blobObj) {
        var self = this

        const { uid, photoURL } = {uid:'asdf',photoURL:'#'};

        return self.props.storageRef.child('uploads/photo.mp3').put(blobObj.blob, {
            contentType: 'audio/mp3'
        }).then(() => {
            self.props.messagesRef.add({
                text: 'uploads/photo.mp3',
                type: 'recording',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            })
        })
    }

    render() {
        if (!this.state.record) { this.startRecording() }
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <ReactMic
                    record={this.state.record}
                    //   className="sound-wave"
                    mimeType="audio/mp3"
                    onStop={this.onStop.bind(this)}
                    strokeColor="#FFFFFF"
                    width='280px'
                    backgroundColor="#000813" />
                {/* <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button> */}
            </div>
        );
    }
}