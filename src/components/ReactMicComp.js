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
        if (!this.state.record) { setTimeout(()=>this.startRecording(), 1) }
    }

    startRecording = () => {
        this.setState({ record: true });
    }

    stopRecording = () => {
        var self = this
        self.setState({ record: false });
        setTimeout(()=>self.setState({ record: false }), 100);
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

        const uid = this.props.meeting.userId;

        return self.props.storageRef.child('uploads/'+uid+'-'+blobObj.stopTime+'.mp3').put(blobObj.blob, {
            contentType: 'audio/mp3'
        }).then((resp) => {
            resp.ref.getDownloadURL().then(downloadUrl => {
                console.log('audioUpload callback', resp)
                self.props.messagesRef.add({
                    text: downloadUrl,
                    type: 'recording',
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    uid
                })
            })

        })
    }

    render() {
        
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <ReactMic
                    record={this.state.record}
                    className="sound-wave"
                    mimeType="audio/webm"
                    onStop={this.onStop.bind(this)}
                    autoGainControl={true}
                    strokeColor="#9b9b9b"
                    width="300"
                    backgroundColor="#000813" />
            </div>
        );
    }
}