import React, {Component} from 'react';

// Import Jitsi Stuff
// import Jitsi from 'react-jitsi'

// Import other App components etc
import './App.css';
import LandingPage from './components/LandingPage';
import ChatRoom from './components/ChatRoom';
import MainJitsi from './components/MainJitsi';
import './site-styles.css'

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      page : 'join'
    }
  }

  goToMeeting(meetingObj) {
    this.setState({meeting : meetingObj})
    this.setState({page : 'meeting'})
    console.log('App.goToMeeting', meetingObj, this)
    window.GLOBAL = window.GLOBAL||{}
    window.GLOBAL.meeting = meetingObj
  }
  
  render() {
    console.log('App.render', this)
    if (!this.state) return <></>
    if (this.state.page === 'join') {
      return <LandingPage goToMeeting={this.goToMeeting.bind(this)}/>
    } else {
      return (<>
        <ChatRoom meeting={this.state.meeting}/>
        <div className="div-block">
          <MainJitsi meeting={this.state.meeting}/>
        </div>
        
        </>
      );
    }

  }
}

export default App;



// Other Helpers 
