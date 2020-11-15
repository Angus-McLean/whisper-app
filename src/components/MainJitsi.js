import React, { Component } from 'react';


var JitsiMeetExternalAPI = window.JitsiMeetExternalAPI || {}
var MAINVIDEOLOADED = true


class MainJitsi extends Component {

    constructor(){
        super()
    }

    render() {
        console.log("MainJitsi", this.props)
                
        setTimeout(() => {
            if (!MAINVIDEOLOADED) {
                MAINVIDEOLOADED = true
                window.api = new JitsiMeetExternalAPI('meet.jit.si', {
                    roomName:'testRoom-asdf1234qwer',
                    parentNode:document.getElementById('MainJitsi'),
                    width:'100%', height:'100%', userInfo: {
                        email: 'email@jitsiexamplemail.com',
                        displayName: 'John Doe'
                    }, configOverwrite: {
                        prejoinPageEnabled: false,
                    }})
            }
        }, 500)

        return (
            <div id="MainJitsi"></div>
        )
    }
}

export default MainJitsi;
