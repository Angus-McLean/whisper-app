import React from 'react';

// Import Jitsi Stuff
// import Jitsi from 'react-jitsi'

// Import other App components etc
import './App.css';
import ChatRoom from './components/ChatRoom';
import MainJitsi from './components/MainJitsi';
import './site-styles.css'

function App() {
  
  return (<>
    <ChatRoom/>
    <div className="div-block">
      <MainJitsi/>
    </div>
    
    </>
  );
}

export default App;



// Other Helpers 
