import React, { Component }  from 'react';
import MessageText from './MessageText';


class AttendeesList extends Component {
    
    constructor(props){
        super(props)
    }
    render() {
        console.log("AttendeesList", this)
        var self = this;
        var uid = window.GLOBAL.meeting.userId

        return (
            <div className="div-block-5" style={{borderBottom: '1px solid #9b9b9b', height:'15vh', overflowY: "scroll"}}>
                <div className="w-layout-grid green" style={{}}>
                    <div className={(this.props.selectedUser === uid ? "selected":'')+ " div-block-3"}
                        // onClick={()=>{self.props.setSelectedUser(uid)}}
                    >
                        <div className="div-block-4 green">
                            <div className="text-block">{uid} (You)</div>
                        </div>
                    </div>
                    <div className={(this.props.selectedUser === "Everyone" ? "selected":'')+ " div-block-3"}
                    onClick={()=>{self.props.setSelectedUser("Everyone")}}>
                        <div className="div-block-4 green">
                            <div className="text-block">Everyone</div>
                        </div>
                    </div>
                    {
                        this.props.attendees && this.props.attendees.reverse().map(user => (
                            <div
                                className={(this.props.selectedUser === user.userId ? "selected":'')+ " div-block-3"}
                                onClick={()=>{self.props.setSelectedUser(user.userId)}}
                                key={user.userId}>
                                <div className="div-block-4 green">
                                    <div className="text-block">{user.userId}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default AttendeesList;
