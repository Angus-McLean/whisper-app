import React from 'react';

import './App.css';
import InputBox from './components/InputBox';
import MessagesList from './components/MessagesList';

function App() {

  var state = {
    messages: [
      {
        key:1,
        type:'received',
        text:'Pssst... Whisper is so amazing.. right?',
        datetime:'12:00 PM | Aug 13'
      },
      {
        key:2,
        type:'sent',
        text:'Zomg! It totally is! Wowowow',
        datetime:'12:00 PM | Aug 13'
      }
    ]
  }

  return (
    <div className="App">
      <div className="row rounded-lg overflow-hidden shadow">
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Team  &nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Everyone</p>
            </div>
            <MessagesList messages={state.messages}/>
            <InputBox messages={state.messages}/>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        <div className="col-7 px-0 bg-white">
          <div className="px-4 py-5 text-center chat-box ">MAIN VIDEO WINDOW</div>
        </div>
      </div>
    </div>
  );
}

export default App;
