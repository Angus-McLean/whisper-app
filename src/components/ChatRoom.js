import React, { useState } from 'react';


// Import & init firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessagesList from './MessagesList';
import ChatInputs from './ChatInputs';
import AttendeesList from './AttendeesList';
import WhisperComp from './WhisperComp';


firebase.initializeApp({
  apiKey: "AIzaSyCgNBwvWRmiD-XKVVwPlXtfeFgDxrdS1Cc",
  authDomain: "ecse542-whisper.firebaseapp.com",
  databaseURL: "https://ecse542-whisper.firebaseio.com",
  projectId: "ecse542-whisper",
  storageBucket: "ecse542-whisper.appspot.com",
  messagingSenderId: "994712361483",
  appId: "1:994712361483:web:47d47d3f160de1a275450e",
  measurementId: "G-S42HK278KF"
})

// const auth = firebase.auth();
const firestore = firebase.firestore();
window.firebase = firebase
// const analytics = firebase.analytics();

window.addEventListener("beforeunload", function() {
    setTimeout(()=>{firestore.collection('meetings')
        .doc(window.GLOBAL.meeting.meetingId)
        .collection('attendees').doc(window.GLOBAL.meeting.userId)
        .delete()
    }, 1)
    // return "asdf"
})

function ChatRoom(props) {

    document.body.style.background = '#000813'

    var mid = (props ? props.meeting.meetingId : window.GLOBAL.meeting.meetingId)
    var uid = (props ? props.meeting.userId : window.GLOBAL.meeting.userId)
    // var [attendees, attendeesRef, messages, messagesRef, storageRef] = connectToSources(mid, uid);
    
    var meetingRef = firestore.collection('meetings').doc(mid)
    meetingRef.set({ meetingId: mid }, {merge: true});
    
    const messagesRef = meetingRef.collection('messages');
    const whispersRef = meetingRef.collection('whispers');
    const attendeesRef = meetingRef.collection('attendees');
    const storageRef = firebase.storage().ref();
    
    var [selectedUser, setSelectedUser] = useState('Everyone')

    console.log('ChatRoom', props, meetingRef)
    
    // update attendees
    attendeesRef.doc(uid).set({
        userId: uid
    }, { merge: true })
    var [attendees] = useCollectionData(attendeesRef, { idField: 'id' });
    var attendessFilt = attendees ? attendees.filter(a => a.userId !== uid) : []
    var [whispers] = useCollectionData(whispersRef
        .orderBy('createdAt', 'desc')
        .limit(10),{ idField: 'id' }
    );
    var whispersFilt = whispers ? whispers.filter(w => {
        var toMe = (w.to === uid) | (w.to === "Everyone")
        var fromMe = w.from === uid
        var isClosed = w['status-'+uid] === 'closed'
        var isSeen = !!w['status-'+uid]
        var isRecent =  w.createdAt ? (Date.now() - w.createdAt.toDate()) < 1e5 : false
        return !isClosed && (toMe || fromMe) && (isRecent || isSeen)
    }).reverse() : []

    // Fetch messages
    var [messages] = useCollectionData(
        messagesRef.orderBy('createdAt', 'desc').limit(25),
        { idField: 'id' }
    );
    var messagesFilt = messages ? messages.filter(m => {
        var fromMe = m.from===uid && m.to===selectedUser
        var toMe = m.to===uid && m.from===selectedUser
        var toEveryone = m.to==='Everyone' && selectedUser==='Everyone'
        return fromMe || toMe || toEveryone
    }) : []

    console.log('ChatRoom', props, meetingRef)

    return (
        <div className="div-block-2" style={{position:'fixed'}}>
            <div>
                <div className="div-block-6">
                    <div className="text-block">Whisper Meeting Attendees</div>
                    {/* <div className="text-block less">Main Chat</div> */}
                </div>
            </div>
            <AttendeesList attendees={attendessFilt} selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
            <MessagesList messages={messagesFilt} selectedUser={selectedUser} height={'15vh'}/>
            <WhisperComp whispersRef={whispersRef} 
                whisper={whispersFilt[0]} 
                messagesRef={messagesRef} 
                selectedUser={selectedUser}></WhisperComp>
            <ChatInputs meeting={props.meeting} 
                whispersRef={whispersRef} 
                messagesRef={messagesRef} 
                storageRef={storageRef}
                selectedUser={selectedUser}
            />
        </div>
    )
}

export default ChatRoom;
