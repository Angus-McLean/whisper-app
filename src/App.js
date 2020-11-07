import React from 'react';

// Import Jitsi Stuff
import Jitsi from 'react-jitsi'

// Import other App components etc
import './App.css';
import ChatRoom from './components/ChatRoom';


function App() {

  const roomName = 'my-super-secret-meeting-asfewkjalc'
  const userFullName = 'Joseph Strawberry'
  
  return (
    <div className="App">
      <div className="row rounded-lg overflow-hidden shadow">
        <div className="col-5 px-0">
          <div className="bg-white">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Team  &nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; Everyone</p>
            </div>
            <ChatRoom/>
          </div>
        </div>
        {/* <!-- Chat Box--> */}
        <div className="col-7 px-0 bg-white">
          <div className="px-4 py-5 text-center chat-box ">MAIN VIDEO WINDOW
            {/* <Jitsi/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



// Other Helpers 
