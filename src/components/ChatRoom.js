import React, { Component, useRef, useState } from 'react';

import InputBox from './InputBox';
import MessagesList from './MessagesList';

// Import & init firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessageText from './MessageText';


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
// const analytics = firebase.analytics();

function ChatRoom() {
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query, { idField: 'id' });
    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = {uid:'asdf',photoURL:'#'};

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    // setTimeout(()=>dummy.current.scrollIntoView({ behavior: 'smooth' }), 1000)
    return (<>
        <div className="messages-box">
            <div className="px-4 py-5 chat-box bg-white">
                {messages && messages.map(msg => <MessageText key={msg.id} message={msg} />)}
                <span ref={dummy}></span>
            </div>
        </div>

        <form onSubmit={sendMessage}>
            <div className="input-group">
                    <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type a message" aria-describedby="button-addon2" className="form-control rounded-0 border-0 py-4 bg-light" />
                    <div className="input-group-append">
                        <button id="button-addon2" type="submit" disabled={!formValue} className="btn btn-link" >
                            <i className="fa fa-paper-plane"></i>
                        </button>
                    </div>
                </div>

        </form>
    </>)
}

export default ChatRoom;
