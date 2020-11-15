import React, { Component, useRef, useState } from 'react';


// Import & init firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessageText from './MessageText';
import InputBox from './InputBox';
import MessagesList from './MessagesList';
import ChatInputs from './ChatInputs';


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

function ChatRoom() {
    const messagesRef = firestore.collection('messages');
    const storageRef = firebase.storage().ref();
    const query = messagesRef.orderBy('createdAt' ,'desc').limit(25);

    var [messages] = useCollectionData(query, { idField: 'id' });
    console.log('messages',messages)
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
    }
    

    return (
        <div className="div-block-2">
            <div>
                <div className="div-block-6">
                    <div className="text-block">Your Group</div>
                    <div className="text-block less">Main Chat</div>
                </div>
            </div>
            <div className="div-block-5">
                <div className="w-layout-grid green">
                    <div className="div-block-3">
                        <div className="div-block-4 green">
                            <div className="text-block">Joseff Padilla</div>
                        </div>
                    </div>
                    <div className="div-block-3 hover">
                        <div className="text-block"><strong>Private whisper to</strong>Kaiya Bowen</div>
                    </div>
                    <div className="div-block-3 you">
                        <div className="div-block-4 green">
                            <div className="text-block">Jodi Avery (You)</div>
                        </div>
                    </div>
                    <div className="div-block-3">
                        <div className="div-block-4 green">
                            <div className="text-block">Blake Kemp</div>
                        </div>
                    </div>
                </div>
            </div>
            <MessagesList messages={messages}/>
            
            <ChatInputs messagesRef={messagesRef} storageRef={storageRef}/>

            {/* <form onSubmit={sendMessage} className="div-block-7">
                <input className="text-block-2" type="text" value={formValue} 
                    onChange={(e) => setFormValue(e.target.value)} 
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
                    <div className="div-block-9" onClick={sendMessage}><i class="fa fa-send"></i></div>
                    <div className="div-block-9"><i class="fa fa-phone"></i></div>
                    <div className="div-block-9"><i class="fa fa-bullseye"></i></div>
                </div>
            </form> */}
        </div>
    )
}

export default ChatRoom;
