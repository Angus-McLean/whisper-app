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

function ChatRoom(props) {
    console.log('ChatRoom', props)
 
    var mid = (props ? props.meeting.meetingId : null)
    window.globalMid = mid ? mid : window.globalMid
    mid = window.globalMid
    

    var meetingRef = firestore.collection('meetings').doc(mid)
    meetingRef.set({ meetingId: mid }, {merge: true});
    
    console.log('ChatRoom2', meetingRef)

    const messagesRef = meetingRef.collection('messages');
    const attendeesRef = meetingRef.collection('attendees');
    const storageRef = firebase.storage().ref();
    
    
    // update attendees
    attendeesRef.doc(props.meeting.userId).set({
        userId: props.meeting.userId
    }, { merge: true })
    var [attendees] = useCollectionData(attendeesRef, { idField: 'id' });

    // Fetch messages
    var [messages] = useCollectionData(
        messagesRef.orderBy('createdAt', 'desc').limit(25),
        { idField: 'id' }
    );
    

    return (
        <div className="div-block-2">
            <div>
                <div className="div-block-6">
                    <div className="text-block">Your Group</div>
                    <div className="text-block less">Main Chat</div>
                </div>
            </div>
            <AttendeesList attendees={attendees}/>
            <MessagesList messages={messages}/>
            
            <ChatInputs meeting={props.meeting} messagesRef={messagesRef} storageRef={storageRef}/>
        </div>
    )
}

export default ChatRoom;
